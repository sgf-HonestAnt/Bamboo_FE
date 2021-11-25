import { FiRefreshCcw } from "react-icons/fi";
import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { userInt } from "../../typings/interfaces";
import {
  ALL_TASKS,
  ANY_CAT,
  ANY_STATUS,
  IN_PROGRESS,
  NO_DEADLINE,
  TASKS_TO_SHOW,
  TASK_CATEGORIES,
  TASK_STATUS_TYPES,
  TASK_VALUE_NUMS,
  WILD_NUM,
} from "../../utils/appConstants";
import { AddNewTaskButton } from "../../pages__components/App/Buttons";
import PageTaskCards from "../../pages__components/Page_Tasks_c/PageTaskCards";
import "./styles.css";

type TasksPageProps = {
  user: userInt;
  categories: string[];
};
const TasksPage = (props: TasksPageProps) => {
  const { user, categories } = props;
  // filters
  const [form, setForm] = useState({
    tasksToShow: ALL_TASKS, // all, today, tomorrow or future
    categoryToShow: ANY_CAT, // user's categories or any
    statusToShow: ANY_STATUS, // awaited, in_progress, completed or any
    valueToShow: WILD_NUM, // 10,20,30,40,50 or WILD
  });
  const handleChange = (e: { target: { id: any; value: any } }) => {
    const id = e.target.id;
    const value = e.target.value;
    if (value === "True") {
      setForm({
        ...form,
        [id]: true,
      });
    } else if (value === "False") {
      setForm({
        ...form,
        [id]: false,
      });
    } else if (value === NO_DEADLINE) {
      setForm({
        ...form,
        [id]: null,
      });
    } else {
      setForm({
        ...form,
        [id]: value,
      });
    }
  };
  const handleReset = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setForm({
      ...form,
      tasksToShow: ALL_TASKS,
      categoryToShow: ANY_CAT,
      statusToShow: ANY_STATUS,
      valueToShow: WILD_NUM,
    });
  };
  // console.log(form);
  return (
    <Container fluid>
      <Row className='tasks-page'>
        <Col sm={12}>
          <Row>Filter tasks</Row>
          <Row className='tasks-page__filter-row'>
            <AddNewTaskButton />
            <Button variant='light' className='mb-3 mr-1' onClick={handleReset}>
              <FiRefreshCcw />
            </Button>
            <Form>
              <Form.Group controlId='tasksToShow' className='mb-3 mr-1'>
                <Form.Control required as='select' onChange={handleChange}>
                  {TASKS_TO_SHOW.filter((t) => t !== ALL_TASKS).map(
                    (taskByDate) => (
                      <option
                        key={taskByDate}
                        value={taskByDate}
                        selected={form.tasksToShow === taskByDate}>
                        {taskByDate}
                      </option>
                    )
                  )}
                  <option value='' disabled>
                    ---
                  </option>
                  <option
                    value={ALL_TASKS}
                    selected={form.tasksToShow === ALL_TASKS}>
                    All Tasks
                  </option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='categoryToShow' className='mb-3 mr-1'>
                <Form.Control required as='select' onChange={handleChange}>
                  <option
                    value={ANY_CAT}
                    selected={form.tasksToShow === ANY_CAT}>
                    {ANY_CAT}
                  </option>
                  <option value='' disabled>
                    ---
                  </option>
                  {/* PRE-SET CATEGORIES */}
                  {TASK_CATEGORIES.map((cat, i) => (
                    <option
                      key={i}
                      value={cat}
                      selected={form.categoryToShow === cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                  <option value='' disabled>
                    ---
                  </option>
                  {/* CUSTOM CATEGORIES */}
                  {categories.map(
                    (cat, i) =>
                      !TASK_CATEGORIES.includes(
                        cat!.charAt(0).toUpperCase() + cat!.slice(1)
                      ) && (
                        <option
                          key={i}
                          value={cat}
                          selected={form.categoryToShow === cat}>
                          {cat!.charAt(0).toUpperCase() + cat!.slice(1)}
                        </option> // what is going on....?
                      )
                  )}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='statusToShow' className='mb-3 mr-1'>
                <Form.Control required as='select' onChange={handleChange}>
                  <option
                    value={ANY_STATUS}
                    selected={form.statusToShow === ANY_STATUS}>
                    {ANY_STATUS}
                  </option>
                  <option value='' disabled>
                    ---
                  </option>
                  {TASK_STATUS_TYPES.map((status) => (
                    <option
                      key={status}
                      value={status}
                      selected={form.statusToShow === status}>
                      {status !== IN_PROGRESS
                        ? status.charAt(0).toUpperCase() + status.slice(1)
                        : "In Progress"}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='valueToShow' className='mb-3 mr-1'>
                <Form.Control required as='select' onChange={handleChange}>
                  <option
                    value={WILD_NUM}
                    selected={form.valueToShow === WILD_NUM}>
                    Any Value
                  </option>
                  <option value='' disabled>
                    ---
                  </option>
                  {TASK_VALUE_NUMS.map((value) => (
                    <option
                      key={value}
                      value={value}
                      selected={form.valueToShow === value}>
                      {value}XP
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Row>
          <PageTaskCards form={form} user={user} />
        </Col>
      </Row>
    </Container>
  );
};

export default TasksPage;
