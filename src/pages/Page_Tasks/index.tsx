import { Container, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import PageTaskCards from "../../pages__components/Page_Tasks_c/PageTaskCards";
import { currentTasksInt, userInt } from "../../typings/interfaces";
import {
  ALL_TASKS,
  ANY_CAT,
  ANY_REPEAT,
  ANY_STATUS,
  COMPLETED,
  IN_PROGRESS,
  NONE,
  NO_DEADLINE,
  TASKS_TO_SHOW,
  TASK_REPEAT_TYPES,
  TASK_STATUS_TYPES,
  TASK_VALUE_NUMS,
  WILD_NUM,
} from "../../utils/constants";
import "./styles.css";

type TasksProps = {
  tasks: currentTasksInt;
  user: userInt;
};

const Tasks = (props: TasksProps) => {
  const { tasks, user } = props;
  const { categories } = tasks;
  // filters
  const [form, setForm] = useState({
    tasksToShow: ALL_TASKS, // all, today, tomorrow or future
    categoryToShow: ANY_CAT, // user's categories or any
    statusToShow: ANY_STATUS, // awaited, in_progress, completed or any
    sharedToShow: true, // true or false
    valueToShow: WILD_NUM, // 10,20,30,40,50 or WILD
    repeatToShow: ANY_REPEAT, // never, daily, weekly, monthly, every x days or any
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
    } else {
      setForm({
        ...form,
        [id]: value,
      });
    }
  };
  console.log(form);
  return (
    <Container fluid>
      <Row className='tasks-page'>
        <Col sm={12}>
          <Row>Filter tasks</Row>
          <Row className='tasks-page__filter-row'>
            <Form>
              <Form.Group controlId='tasksToShow' className='mb-3 mr-1'>
                <Form.Control required as='select' onChange={handleChange}>
                  {TASKS_TO_SHOW.filter((t) => t !== NO_DEADLINE).map(
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
                    value={NO_DEADLINE}
                    selected={form.tasksToShow === NO_DEADLINE}>
                    No Deadline
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
                  {categories.map((cat) => (
                    <option
                      key={cat}
                      value={cat}
                      selected={form.categoryToShow === cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
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
              <Form.Group controlId='sharedToShow' className='mb-3 mr-1'>
                <Form.Control required as='select' onChange={handleChange}>
                  {[true, false].map((boo, i) => (
                    <option
                      key={i}
                      value={boo ? "True" : "False"}
                      selected={form.sharedToShow === boo}>
                      {boo ? "Show Shared Tasks" : "Hide Shared Tasks"}
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
              <Form.Group controlId='repeatToShow' className='mb-3 mr-1'>
                <Form.Control required as='select' onChange={handleChange}>
                  <option
                    value={ANY_REPEAT}
                    selected={form.repeatToShow === ANY_REPEAT}>
                    Any Repeat
                  </option>
                  <option value='' disabled>
                    ---
                  </option>
                  {TASK_REPEAT_TYPES.map((reps) => (
                    <option
                      key={reps}
                      value={reps}
                      selected={form.repeatToShow === reps}>
                      {reps.charAt(0).toUpperCase() + reps.slice(1)}
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

export default Tasks;
