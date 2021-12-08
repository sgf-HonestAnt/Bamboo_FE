import { useState } from "react";
import { Form } from "react-bootstrap";
import { History, Location } from "history";
import { useDispatch } from "react-redux";
import {
  followedUserInt,
  // setTaskInt,
  taskInt,
  userInt,
} from "../../../typings/interfaces";
import { attemptCompleteTasks } from "../../../utils/f_tasks";
import {
  getDayMonthYearAsString,
  // getMinMaxDateAsString,
} from "../../../utils/f_dates";
// import { attemptPostTask } from "../../utils/f_tasks";
// import { fillTasksAction } from "../../redux/actions/tasks";
// import { NONE, TASK_CATEGORIES, TASK_VALUES } from "../../utils/appConstants";
import {
  // BULB,
  ICOCIRCLE,
  ICOCLOCK,
  // ICOSAVE,
  ICOURGENT,
} from "../../../utils/appIcons";
import { AddNewTaskButton, CompleteButton } from "../../../pages__SharedComponents/Buttons";
import AddEditTaskModal from "../../../pages__SharedComponents/AddEditTaskModal";

type DashTasksCardProps = {
  tasks: taskInt[];
  today: string;
  user: userInt;
  followedUsers: followedUserInt[];
  history: History<unknown> | string[];
  location: Location<unknown>;
  categories: string[];
  setErrorMessage: any;
};
const DashTasksCard = (props: DashTasksCardProps) => {
  const { tasks, today, user, followedUsers, history, location, categories } =
    props;
  const { refreshToken } = user;
  const dispatch = useDispatch();
  // add today tasks
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const { min } = getMinMaxDateAsString(new Date());
  // const [form, setForm] = useState<setTaskInt>({
  //   category: "",
  //   title: "",
  //   desc: "",
  //   value: 0,
  //   repeats: "never",
  //   sharedWith: [],
  //   deadline: min,
  // });
  // const handleChange = (e: { target: { id: any; value: any } }) => {
  //   const id = e.target.id;
  //   const value = e.target.value;
  //   setForm({
  //     ...form,
  //     [id]: value,
  //   });
  // };
  // const handleSubmit = async (e: {
  //   currentTarget: any;
  //   preventDefault: () => void;
  //   stopPropagation: () => void;
  // }) => {
  //   e.preventDefault();
  //   console.log(form);
  //   try {
  //     const { _id } = await attemptPostTask(
  //       form,
  //       refreshToken,
  //       history,
  //       location
  //     );
  //     console.log("CREATED NEW TASK", _id);
  //     dispatch(fillTasksAction());
  //     setTimeout(() => {
  //       history.push("/");
  //     }, 1000);
  //   } catch (e) {
  //     console.log("ERROR CREATING NEW TASK", e);
  //     setErrorMessage("ERROR CREATING NEW TASK");
  //     history.push("/error");
  //   }
  // };
  // complete today task(s)
  const completedTasks: string[] = [];
  const dayMonthYearAsString = getDayMonthYearAsString(new Date());
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
  return (
    <div className='dashboard__tasks-card m-2'>
      <div className='dashboard__card-header'>{dayMonthYearAsString}</div>
      {tasks.length < 1 ? (
        <>
          <div>No tasks awaited today!</div>
          <AddNewTaskButton />
        </>
      ) : (
        <Form onSubmit={handleSubmitComplete}>
          <div>Tick to complete</div>
          <div className='red'>
            <ICOURGENT />
            Make draggable into Complete droppable
          </div>
          {tasks.slice(0, 3).map((t, i) => {
            const clock = t.deadline?.includes(today) ? (
              <ICOCLOCK className='icon-urgent' />
            ) : t.deadline ? (
              <ICOCLOCK className='icon-semi-urgent' />
            ) : (
              <ICOCIRCLE />
            );
            return (
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
                  {clock}
                </div>
              </Form.Group>
            );
          })}
          <div>{tasks.length > 3 ? `+ ${tasks.length - 3} more` : ""}</div>
          <CompleteButton />
        </Form>
      )}
      <AddNewTaskButton label='Add task' handleClick={handleShow} />
      <AddEditTaskModal
        show={show}
        handleClose={handleClose}
        user={user}
        followedUsers={followedUsers}
        categories={categories}
        history={history}
        location={location}
      />
      {/* <AddNewTaskButton handleClick={handleShow} />
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
            <Form.Group controlId='desc' className='mb-2'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as='textarea'
                rows={3}
                placeholder='Provide more details'
                onChange={handleChange}></Form.Control>
            </Form.Group>
            <SubmitButton />
            <Button variant='light' className='mb-3 mr-1' onClick={handleClose}>
              <ICOSAVE />
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default DashTasksCard;
