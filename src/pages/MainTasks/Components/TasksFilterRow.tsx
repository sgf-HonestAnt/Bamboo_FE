import { History, Location } from "history";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import {
  beautifulDnD,
  reduxStateInt,
  taskInt,
} from "../../../typings/interfaces";
import { Row, Col, Button, Form } from "react-bootstrap";
import { FiRefreshCcw } from "react-icons/fi";
import { AddNewTaskButton } from "../../../pages__SharedComponents/Buttons";
import {
  ANY_CAT,
  ANY_DUE,
  ANY_VAL,
  TASK_CATEGORIES,
} from "../../../utils/appConstants";
import AddEditTaskModal from "../../../pages__SharedComponents/AddEditTaskModal";
import { ICOURGENT } from "../../../utils/appIcons";

type TasksFilterRowProps = {
  taskList: taskInt[];
  setTaskList: any;
  initialData: beautifulDnD;
  setInitialData: any;
  history: History<unknown> | string[];
  location: Location<unknown>;
};
const TasksFilterRow = (props: TasksFilterRowProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user, followedUsers } = state.currentUser;
  const tasks = state.currentTasks;
  const { categories, awaited, in_progress, completed } = tasks;
  const {
    taskList,
    setTaskList,
    initialData,
    setInitialData,
    history,
    location,
  } = props;
  const allTasks = awaited.concat(in_progress, completed);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [filter, setFilter] = useState({
    dueDate: ANY_DUE,
    category: ANY_CAT,
    value: ANY_VAL,
  });
  // console.log(filter);
  const handleReset = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setTaskList(allTasks);
    setFilter({
      dueDate: ANY_DUE,
      category: ANY_CAT,
      value: ANY_VAL,
    });
  };
  const handleChange = async (e: { target: { id: any; value: any } }) => {
    // add dropdown category for date (Any, Overdue, Due Today, Due Tomorrow, No Due Date) and value (Any, ...values)
    const id = e.target.id;
    const value = e.target.value;
    setFilter({ ...filter, [id]: value });
    console.log("ATTEMPTING HANDLECHANGE", id, value);
    const filteredTasks = allTasks.filter(
      (t) => t!.category.toLowerCase() === `${value.toLowerCase()}`
    );
    filter.category === ANY_CAT
      ? setTaskList(allTasks)
      : setTaskList(filteredTasks);
  };
  return (
    <Row>
      <Col sm={12}>
        <Row>Filter tasks</Row>
        <Row className='tasks-page__filter-row'>
          <AddNewTaskButton label='Add task' handleClick={handleShow} />
          <AddEditTaskModal
            show={show}
            handleClose={handleClose}
            user={my_user}
            followedUsers={followedUsers}
            categories={categories}
            history={history}
            location={location}
            initialData={initialData}
            setInitialData={setInitialData}
          />{" "}
          <Button variant='light' className='mb-3 mr-1' onClick={handleReset}>
            <FiRefreshCcw />
          </Button>
          <Form>
            <Form.Group controlId='category' className='mb-3 mr-1'>
              <Form.Control
                required
                as='select'
                defaultValue={ANY_CAT}
                onChange={handleChange}>
                <option value={ANY_CAT}>{ANY_CAT}</option>
                <option value='' disabled>
                  ---
                </option>
                {/* PRE-SET CATEGORIES */}
                {categories
                  .filter((c) => !TASK_CATEGORIES.includes(c))
                  .map(
                    (cat, i) =>
                      !TASK_CATEGORIES.includes(
                        cat!.charAt(0).toUpperCase() + cat!.slice(1)
                      ) && (
                        <option key={i} value={cat}>
                          {cat!.charAt(0).toUpperCase() + cat!.slice(1)}
                        </option>
                      )
                  )}
                {TASK_CATEGORIES.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
          <div className='red'>
            Fix filter. Fix xp feature: not logging up automatically
          </div>
        </Row>
      </Col>
    </Row>
  );
};

export default TasksFilterRow;
