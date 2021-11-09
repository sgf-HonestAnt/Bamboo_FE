import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { followedUserInt, setTaskInt } from "../../typings/interfaces";
import attemptPostTask from "../../utils/funcs/postTask";
import { MdOutlinePsychology } from "react-icons/md";
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
import { RouteComponentProps } from "react-router-dom";
import "./styles.css";

type AddTaskProps = {
  categories: string[];
  followedUsers: followedUserInt[];
  history: History<unknown> | string[];
};

const AddTask = (props: AddTaskProps) => {
  const { categories, followedUsers } = props;
  // categories
  const [showCategoryDrop, setShowCategoryDrop] = useState(true);
  const [showCategory, setShowCategory] = useState(false);
  // other options
  // does it repeat?
  const [showRepeat, setShowRepeat] = useState(true);
  // ➡️ changeRepeated
  // if yes, how often?
  const [showHowOften, setShowHowOften] = useState(false);
  // ➡️ changeHowOften
  // if other, how many days?
  const [showOther, setShowOther] = useState(false);
  // ➡️ changeOtherRep
  // OR
  // if no, is it shared?
  const [showShared, setShowShared] = useState(false);
  // ➡️ changeShared
  // if yes, who with?
  const [showSharedWith, setShowSharedWith] = useState(false);
  // ➡️ changeSharedWith

  const [otherRep, setOtherRep] = useState(false);
  const [validated, setValidated] = useState(false);
  const [newCateg, setNewCateg] = useState(false);
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
    const thisForm = e.currentTarget;
    if (thisForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log(form);
    // send task in a POST to tasks/me....
    const newTask = await attemptPostTask(form);
    console.log(newTask)
    setValidated(true);
    // history.push("/tasks");
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
        repeats: "never",
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
          {showHowOften && <RepeatsGroup changeHowOften={changeHowOften} />}
          {showOther && <RepeatsOtherGroup changeOtherRep={changeOtherRep} />}
          {showShared && <SharedWithChooseGroup changeShared={changeShared} />}
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
