import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { followedUserInt, setTaskInt, userInt } from "../../typings/interfaces";
import { History } from "history";
import TitleGroup from "../../pages__components/Page_AddTask_c/AddTaskTitleGroup";
import ValueGroup from "../../pages__components/Page_AddTask_c/AddTaskValueGroup";
import CategoryChooseGroup from "../../pages__components/Page_AddTask_c/AddTaskCategoryChooseGroup";
import CategoryGroup from "../../pages__components/Page_AddTask_c/AddTaskCategoryGroup";
import DescripGroup from "../../pages__components/Page_AddTask_c/AddTaskDescripGroup";
import RepeatedGroup from "../../pages__components/Page_AddTask_c/AddTaskRepeatedGroup";
import RepeatsGroup from "../../pages__components/Page_AddTask_c/AddTaskRepeatsGroup";
import RepeatsOtherGroup from "../../pages__components/Page_AddTask_c/AddTaskRepeatsOtherGroup";
import SharedWithGroup from "../../pages__components/Page_AddTask_c/AddTaskSharedWithGroup";
import SharedWithChooseGroup from "../../pages__components/Page_AddTask_c/AddTaskSharedWithChooseGroup";
import attemptPostTask from "../../utils/funcs/postTask";
import attemptRefresh from "../../utils/funcs/refresh";
import { NEVER } from "../../utils/constants";
import "./styles.css";

type AddTaskProps = {
  user: userInt;
  categories: string[];
  followedUsers: followedUserInt[];
  history: History<unknown>;
};

const AddTask = (props: AddTaskProps) => {
  const { user, categories, followedUsers, history } = props;
  const { refreshToken } = user;
  // categories
  const [showCategoryDrop, setShowCategoryDrop] = useState(true);
  const [showCategory, setShowCategory] = useState(false);
  const [showRepeat, setShowRepeat] = useState(true);
  const [showHowOften, setShowHowOften] = useState(false);
  const [showOther, setShowOther] = useState(false);
  const [showShared, setShowShared] = useState(false);
  const [showSharedWith, setShowSharedWith] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState<setTaskInt>({
    category: "",
    title: "",
    descrip: "",
    value: 0,
    repeats: "",
    sharedWith: [],
  });
  const addTask = async (e: {
    currentTarget: any;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    e.preventDefault();
    try {
      const thisForm = e.currentTarget;
      if (thisForm.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        console.log(form);
        // send task in a POST to tasks/me....
        const newTask = await attemptPostTask(form);
        if (newTask.status === 401) {
          await attemptRefresh(history, refreshToken);
        }
        console.log(newTask);
        setValidated(true);
        // history.push("/tasks");
      }
    } catch (e) {
      console.log(e);
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
    console.log(value);
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
    console.log(value);
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
        <Form noValidate validated={validated} onSubmit={addTask}>
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
          <Form.Group controlId='image' className='mb-3'>
            <Form.Label>
              Does the task have an image?(NOT YET WORKING)
            </Form.Label>
            <Form.Control type='file' />
          </Form.Group>
          <Form.Group controlId='deadline' className='mb-3'>
            <label htmlFor='deadline'>Deadline(NOT YET WORKING)</label>
            <input
              type='date'
              name='deadline'
              value='2018-07-22'
              min='2018-01-01'
              max='2018-12-31'
            />
          </Form.Group>
          {showRepeat && <RepeatedGroup changeRepeated={changeRepeated} />}
          {/* Does it repeat? Y ? showHowOften : showShared */}
          {showHowOften && <RepeatsGroup changeHowOften={changeHowOften} />}
          {/* If shows "other", how many days? */}
          {showOther && <RepeatsOtherGroup changeOtherRep={changeOtherRep} />}
          {showShared && <SharedWithChooseGroup changeShared={changeShared} />}
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

export default AddTask;
