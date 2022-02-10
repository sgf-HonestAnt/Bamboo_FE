import { History, Location } from "history";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import {
  beautifulDnD,
  reduxStateInt,
  taskInt,
} from "../../../typings/interfaces";
import { Row, Button, Form } from "react-bootstrap";
import { FiRefreshCcw } from "react-icons/fi";
import { AddNewTaskButton } from "../Buttons";
import { TASK_VALUE_NUMS } from "../../../utils/const/arr";
import {
  ANY_CAT,
  ANY_DUE,
  ANY_STATUS,
  ANY_TYPE,
  ANY_VAL,
  TASKS_TO_SHOW,
  TASK_CATEGORIES,
  TASK_STATUS_TYPES,
  TASK_TYPES,
  TODAY,
  TOMORROW,
} from "../../../utils/const/str";
import AddEditTaskModal from "../AddEditTaskModal";
import { getSelectedDateAsString } from "../../../utils/funcs/f_dates";

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
  const [loadingForm, setLoadingForm] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleReset = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setFilter({
      due: ANY_DUE,
      cat: ANY_CAT,
      val: ANY_VAL,
      type: ANY_TYPE,
      status: ANY_STATUS,
    });
    setTaskList(allTasks);
    setSelectDate(false);
    setLoadingForm(true);
  };
  const handleChange = async (e: { target: { id: any; value: any } }) => {
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
      } else if (value === "Select date") {
        setSelectDate(true);
      } else {
        await setFilter({ ...filter, [id]: value });
      }
    }
  };
  useEffect(() => {
    setLoadingForm(false);
  }, [loadingForm]);
  return (
    <Row className='tasks-page__filter-row m-0 p-0 pt-4'>
      <AddNewTaskButton
        variant='secondary'
        label='Add task'
        handleClick={handleShow}
        className='m-1 ml-0'
      />
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
      <Button
        variant='secondary'
        className='m-1'
        id='changeAll'
        onClick={handleReset}>
        <FiRefreshCcw />
      </Button>
      {!loadingForm && (
        <Form>
          <Form.Group controlId='cat' className='m-1'>
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
          <Form.Group controlId='status' className='m-1'>
            <Form.Control
              as='select'
              defaultValue={ANY_STATUS}
              onChange={handleChange}>
              <option value={ANY_STATUS}>Filter by Status</option>
              <option value='' disabled>
                ---
              </option>
              {TASK_STATUS_TYPES.map((status, i) => (
                <option key={i} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='val' className='m-1'>
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
          <Form.Group controlId='type' className='m-1'>
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
            <Form.Group controlId='due' className='m-1'>
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
            <Form.Group controlId='due' className='mr-1 my-1'>
              <Form.Control type='date' onChange={handleChange} />
            </Form.Group>
          )}
        </Form>
      )}
    </Row>
  );
};

export default TasksFilterRow;
