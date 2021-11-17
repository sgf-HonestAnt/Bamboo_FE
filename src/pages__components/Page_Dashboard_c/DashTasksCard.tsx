import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { History, Location } from "history";
import { useDispatch } from "react-redux";
import { setTaskInt, taskInt, userInt } from "../../typings/interfaces";
import attemptCompleteTasks from "../../utils/funcs/complete";
import {
  getDayMonthYearAsString,
  getMinMaxDateAsString,
} from "../../utils/funcs/dateTimeFuncs";
import attemptPostTask from "../../utils/funcs/postTask";
import { fillTasksAction } from "../../redux/actions/tasks";
import { NONE, TASK_CATEGORIES, TASK_VALUES } from "../../utils/constants";
import { BULB } from "../../utils/icons";
import {
  AddNewTaskButton,
  SubmitButton,
} from "../../utils/buttons";

type DashTasksCardProps = {
  today: taskInt[];
  user: userInt;
  history: History<unknown> | string[];
  location: Location<unknown>;
  categories: string[];
  setErrorMessage: any;
};
const DashTasksCard = (props: DashTasksCardProps) => {
  const { today, user, history, location, categories, setErrorMessage } = props;
  const { refreshToken } = user;
  const dispatch = useDispatch();
  // add today tasks
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { min } = getMinMaxDateAsString();
  const [form, setForm] = useState<setTaskInt>({
    category: "",
    title: "",
    desc: "",
    value: 0,
    repeats: "never",
    sharedWith: [],
    deadline: min,
  });
  const handleChange = (e: { target: { id: any; value: any } }) => {
    const id = e.target.id;
    const value = e.target.value;
    setForm({
      ...form,
      [id]: value,
    });
  };
  const handleSubmit = async (e: {
    currentTarget: any;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    e.preventDefault();
    console.log(form);
    try {
      const { _id } = await attemptPostTask(
        form,
        refreshToken,
        history,
        location,
        setErrorMessage
      );
      console.log("CREATED NEW TASK", _id);
      dispatch(fillTasksAction());
      setTimeout(() => {
        history.push("/");
      }, 1000);
    } catch (e) {
      console.log("ERROR CREATING NEW TASK", e);
      setErrorMessage("ERROR CREATING NEW TASK");
      history.push("/error");
    }
  };
  // complete today task(s)
  const completedTasks: string[] = [];
  const dayMonthYearAsString = getDayMonthYearAsString();
  const handleSubmitComplete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(completedTasks);
    try {
      attemptCompleteTasks(
        completedTasks,
        refreshToken,
        history,
        location,
        dispatch
      );
      setTimeout(() => {
        history.push("/reloading");
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };
  const handleChangeCompleted = (e: { target: { value: any } }) => {
    const value = e.target.value;
    if (completedTasks.includes(value)) {
      const index = completedTasks.indexOf(value);
      completedTasks.splice(index, 1);
    } else {
      completedTasks.push(value);
    }
  };
  console.log(form);
  return (
    <div className='dashboard__tasks-card m-2'>
      <div>{dayMonthYearAsString}</div>
      {today?.length < 1 ? (
        <>
          <div>No tasks awaited today!</div>
          <AddNewTaskButton />
        </>
      ) : (
        <Form onSubmit={handleSubmitComplete}>
          {today
            ?.sort()
            .slice(Math.max(today.length - 3, 0))
            .map((t, i) => (
              <Form.Group key={i} controlId={t._id}>
                <div className='mb-0'>
                  <Form.Check
                    inline
                    label={t.title}
                    name='today'
                    type='checkbox'
                    value={t._id}
                    onChange={handleChangeCompleted}
                  />
                </div>
              </Form.Group>
            ))}
          <Button variant='light' className='mb-3 mr-1' onClick={handleShow}>
            Add new
          </Button>
          <SubmitButton />
        </Form>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>
                <ul>
                  <li>Deadline: {min}</li>
                  <li>Not shared</li>
                </ul>
                <div className='dashboard__tasks-card__text-muted'>
                  <BULB />
                  If you wish to change these, go to the Add Task page.
                </div>
              </Form.Label>
            </Form.Group>
            <Form.Group controlId='title'>
              <Form.Label>What's the name of this task?</Form.Label>
              <Form.Control
                required
                type='text'
                value={form.title}
                placeholder='Name the task'
                onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group controlId='value'>
              <Form.Label>How hard is it?</Form.Label>
              <Form.Control required as='select' onChange={handleChange}>
                <option value='' disabled selected>
                  Select a value
                </option>
                {TASK_VALUES.map((script, i) => {
                  let value = 10 * (i + 1);
                  return (
                    <option
                      key={i}
                      value={value}
                      selected={form.value === value}>
                      {value}XP: {script}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>What's the category?</Form.Label>
              <Form.Control required as='select' onChange={handleChange}>
                <option value='' disabled selected>
                  Select a category
                </option>
                {TASK_CATEGORIES.map((c, i) => (
                  <option key={i} selected={form.category === c}>
                    {c}
                  </option>
                ))}
                {categories
                  .filter((c) => c !== NONE)
                  .map((c, i) => (
                    <option key={i} selected={form.category === c}>
                      {c}
                    </option>
                  ))}
                <option selected={form.category === NONE}>{NONE}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='desc'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as='textarea'
                rows={3}
                placeholder='Provide more details'
                onChange={handleChange}></Form.Control>
            </Form.Group>
            <SubmitButton />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='light' className='mb-3 mr-1' onClick={handleClose}>
            Close
          </Button>
          <Button variant='light' className='mb-3 mr-1' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashTasksCard;
