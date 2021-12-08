import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { followedUserInt, setTaskInt, userInt } from "../../typings/interfaces";
import { useDispatch } from "react-redux";
import { fillTasksAction } from "../../redux/actions/tasks";
import { History, Location } from "history";
import TitleGroup from "./Components/TitleGroup";
import ValueGroup from "./Components/ValueGroup";
import CategoryChooseGroup from "./Components/CategoryChooseGroup";
import CategoryGroup from "./Components/CategoryGroup";
import DescripGroup from "./Components/DescriptionGroup";
import RepeatedGroup from "./Components/RepeatedGroup";
import RepeatsGroup from "./Components/RepeatsGroup";
import RepeatsOtherGroup from "./Components/RepeatsOtherGroup";
import SharedWithGroup from "./Components/SharedWithGroup";
import SharedWithChooseGroup from "./Components/SharedWithChooseGroup";
import {attemptPostTask} from "../../utils/f_tasks";
import { getMinMaxDateAsString } from "../../utils/f_dates";
import { NEVER } from "../../utils/appConstants";
import { ICOURGENT } from "../../utils/appIcons";
import "./styles.css";

type AddTaskPageProps = { 
  user: userInt;
  categories: string[];
  followedUsers: followedUserInt[];
  history: History<unknown> | string[];
  location: Location<unknown>;
  setErrorMessage: any;
  setSideBarLoading: any;
};

const AddTaskPage = (props: AddTaskPageProps) => {
  const {
    user,
    categories,
    followedUsers,
    history,
    location,
    setErrorMessage,
    setSideBarLoading,
  } = props;
  const { refreshToken } = user;
  const dispatch = useDispatch();
  const { min, max } = getMinMaxDateAsString(new Date());
  console.log(min, max)
  // categories
  const [showCategoryDrop, setShowCategoryDrop] = useState(true);
  const [showCategory, setShowCategory] = useState(false);
  // deadline
  // 👋 MAKE SO CAN CHOOSE NONE. HOW?
  // repeats
  const [showRepeat, setShowRepeat] = useState(true);
  const [showHowOften, setShowHowOften] = useState(false);
  const [showOther, setShowOther] = useState(false);
  // shared
  const [showShared, setShowShared] = useState(false);
  const [showSharedWith, setShowSharedWith] = useState(false);
  // const [validated, setValidated] = useState(false);
  const [form, setForm] = useState<setTaskInt>({
    category: "",
    title: "",
    desc: "",
    value: 0,
    repeats: "",
    sharedWith: [],
    deadline: "",
  });
  const handleSubmit = async (e: {
    currentTarget: any;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    e.preventDefault();
    console.log(form);
    try {
      // const thisForm = e.currentTarget;
      // console.log(thisForm.checkValidity());
      // if (thisForm.checkValidity() === false) {
      //   e.preventDefault();
      //   e.stopPropagation();
      // } else {
      const { _id } = await attemptPostTask(
        form,
        refreshToken,
        history,
        location,
      );
      console.log("CREATED NEW TASK", _id);
      // setValidated(true);
      await dispatch(fillTasksAction());
      setSideBarLoading(true)
      setTimeout(() => {
        history.push("/tasks");
      }, 500);
    } catch (e) {
      console.log("ERROR CREATING NEW TASK", e);
      setErrorMessage("ERROR CREATING NEW TASK");
      history.push("/error");
    }
  };
  const changeSettings = (e: { target: { id: any; value: any } }) => {
    const id = e.target.id;
    const value = e.target.value;
    setForm({
      ...form,
      [id]: value,
    });
  };
  const changeCategory = (e: { target: { value: string } }) => {
    const value = e.target.value;
    if (value === "new") {
      setShowCategory(true);
      setShowCategoryDrop(false);
    } else {
      setForm({
        ...form,
        category: value,
      });
    }
  };
  const changeRepeated = (e: { target: { value: string } }) => {
    const value = e.target.value;
    if (value === "yes") {
      setShowHowOften(true);
      setShowRepeat(false);
    } else {
      setShowShared(true);
      setShowRepeat(false);
      setForm({
        ...form,
        repeats: NEVER,
      });
    }
  };
  const changeHowOften = (e: { target: { value: any } }) => {
    const value = e.target.value;
    console.log(value);
    if (value === "other") {
      setShowOther(true);
      setShowHowOften(false);
    } else {
      setForm({
        ...form,
        deadline: min,
        repeats: value,
      });
    }
  };
  const changeOtherRep = (e: { target: { value: any } }) => {
    const value = e.target.value;
    console.log(value);
    setForm({
      ...form,
      repeats: value,
    });
  };
  const changeShared = (e: { target: { value: any } }) => {
    const value = e.target.value;
    if (value === "yes") {
      setShowSharedWith(true);
      setShowShared(false);
    }
  };
  const changeSharedWith = (e: { target: { value: any } }) => {
    const value = e.target.value;
    console.log(value);
    const array = form.sharedWith;
    !form.sharedWith.includes(value)
      ? array.push(value)
      : array.filter((v) => v !== value);
    console.log(array);
    setForm({
      ...form,
      sharedWith: array,
    });
  };
  return (
    <Row className='add-task-page p-2'>
      <Col sm={6}>
      <div className='red'><ICOURGENT/>Make this a modal that fills in automatically the date (if clicked in from "/dash") or the task details (if clicked in from "/admin-dash" or from a task card)</div>
        <img src="http://www.keystonetrust.org.uk/wp-content/uploads/2020/06/placeholder-image-1.png" alt="" style={{height: "200px"}} />   
        <Form 
          // noValidate
          // validated={validated}
          onSubmit={handleSubmit}>
          <TitleGroup form={form} changeSettings={changeSettings} />
          <ValueGroup form={form} changeSettings={changeSettings} />
          {showCategoryDrop && (
            <CategoryChooseGroup
              form={form}
              changeCategory={changeCategory}
              categories={categories}
            />
          )}
          {/* Does it repeat? Y && showCategory */}
          {showCategory && (
            <CategoryGroup form={form} changeSettings={changeSettings} />
          )}
          <DescripGroup changeSettings={changeSettings} />
          {showRepeat && <RepeatedGroup changeRepeated={changeRepeated} />}
          {/* Does it repeat? Y ? showHowOften : showShared */}
          {showHowOften && <RepeatsGroup changeHowOften={changeHowOften} />}
          {/* If shows "other", how many days? */}
          {showOther && <RepeatsOtherGroup changeOtherRep={changeOtherRep} />}
          {showShared && <SharedWithChooseGroup changeShared={changeShared} />}
          {/* DEADLINE! */}
          {/* Is it shared? Y && showSharedWith */}
          {showSharedWith && (
            <SharedWithGroup
              followedUsers={followedUsers}
              form={form}
              changeSharedWith={changeSharedWith}
            />
          )}
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default AddTaskPage;
