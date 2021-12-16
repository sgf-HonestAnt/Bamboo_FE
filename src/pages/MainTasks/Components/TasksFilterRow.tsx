import { History, Location } from "history";
import {  useState } from "react";
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
  ANY_TYPE,
  ANY_VAL,
  OVERDUE,
  TASKS_TO_SHOW,
  TASK_CATEGORIES,
  TASK_TYPES,
  TASK_VALUE_NUMS,
  TODAY,
  TOMORROW,
} from "../../../utils/appConstants";
import AddEditTaskModal from "../../../pages__SharedComponents/AddEditTaskModal";
import { getSelectedDateAsString } from "../../../utils/f_dates";

type TasksFilterRowProps = {
  taskList: taskInt[];
  setTaskList: any;
  initialData: beautifulDnD;
  setInitialData: any;
  history: History<unknown> | string[];
  location: Location<unknown>;
  filter: any;
  setFilter: any;
};
const TasksFilterRow = (props: TasksFilterRowProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user, followedUsers } = state.currentUser;
  const tasks = state.currentTasks;
  const { categories, awaited, in_progress, completed } = tasks;
  const {
    setTaskList,
    initialData,
    setInitialData,
    history,
    location,
    filter,
    setFilter,
    // query,
    // setQuery,
  } = props;
  const allTasks = awaited.concat(in_progress, completed);
  const [selectDate, setSelectDate] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleReset = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setTaskList(allTasks);
    setFilter({
      due: ANY_DUE,
      cat: ANY_CAT,
      val: ANY_VAL,
      type: ANY_TYPE,
    });
    setSelectDate(false);    
    // 🔨 FIX NEEDED: DOES NOT RESET FORM
  };
  const handleChange = async (e: { target: { id: any; value: any } }) => {
    // add dropdown category for date (Any, Overdue, Due Today, Due Tomorrow, No Due Date) and value (Any, ...values)
    const id = e.target.id;
    const value = e.target.value;
    if (id !== "due") {
      await setFilter({ ...filter, [id]: value });
    } else {
      if (value === TODAY) {
        const today = getSelectedDateAsString(new Date());
        await setFilter({ ...filter, [id]: today });
      } else if (value === TOMORROW) {
        const today = new Date();
        const newToday = new Date(today);
        newToday.setDate(newToday.getDate() + 1);
        const tomorrow = getSelectedDateAsString(newToday);
        await setFilter({ ...filter, [id]: tomorrow });
      } else if (value === OVERDUE) {
        console.log("FIX NEEDED ON TASKSFILTERROW") // 🔨 FIX NEEDED
        // https://daily-dev-tips.com/posts/vanilla-javascript-check-if-date-is-in-the-past/
      } else if (value === "Select date") {
        setSelectDate(true);
      } else {
        await setFilter({ ...filter, [id]: value });
      }
    }
  };
  return (
    <Row className="pt-4">
      <Col sm={12}>
        <Row className='tasks-page__filter-row m-0 p-1'>
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
            taskSet={null}
          />{" "}
          <Button variant='light' className='mr-1' onClick={handleReset}>
            <FiRefreshCcw />
          </Button>
          <Form>
            <Form.Group controlId='cat' className='mr-1'>
              <Form.Control
                as='select'
                defaultValue={ANY_CAT}
                onChange={handleChange}>
                <option value={ANY_CAT}>Filter by Category</option>
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
            <Form.Group controlId='val' className='mr-1'>
              <Form.Control
                as='select'
                defaultValue={ANY_VAL}
                onChange={handleChange}>
                <option value={ANY_VAL}>Filter by Value</option>
                <option value='' disabled>
                  ---
                </option>
                {/* PRE-SET VALUES */}
                {TASK_VALUE_NUMS.map((value, i) => {
                  return (
                    <option key={i} value={value}>
                      {value}XP
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='type' className='mr-1'>
              <Form.Control
                as='select'
                defaultValue={ANY_TYPE}
                onChange={handleChange}>
                <option value={ANY_TYPE}>Filter by Type</option>
                <option value='' disabled>
                  ---
                </option>
                {/* PRE-SET VALUES */}
                {TASK_TYPES.map((type, i) => {
                  return (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            {!selectDate ? (
              <Form.Group controlId='due' className='mr-1'>
                <Form.Control
                  as='select'
                  defaultValue={ANY_DUE}
                  onChange={handleChange}>
                  <option value={ANY_DUE}>Filter by Deadline</option>
                  <option value='' disabled>
                    ---
                  </option>
                  {/* PRE-SET VALUES */}
                  {TASKS_TO_SHOW.map((type, i) => {
                    return (
                      <option key={i} value={type}>
                        {type} 
                      </option>
                    );
                  })}
                  <option value='Select date'>Select date</option>
                </Form.Control>
              </Form.Group>
            ) : (
              <Form.Group controlId='due' className='mr-1'>
                <Form.Control type='date' onChange={handleChange} />
              </Form.Group>
            )}
          </Form>
        </Row>
      </Col>
    </Row>
  );
};

export default TasksFilterRow;
