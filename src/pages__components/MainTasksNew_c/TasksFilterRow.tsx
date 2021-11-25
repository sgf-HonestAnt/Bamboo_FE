import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { useState } from "react";
import { History, Location } from "history";
import { Row, Col, Button, Form } from "react-bootstrap";
import { FiRefreshCcw } from "react-icons/fi";
import { beautifulDnD, taskInt } from "../../typings/interfaces";
import { AddNewTaskButton } from "../Buttons";
import {
  ANY_CAT,
  ANY_DUE,
  ANY_VAL,
  TASK_CATEGORIES,
} from "../../utils/appConstants";

type TasksFilterRowProps = {
  allTasks: (taskInt | undefined)[];
  categories: string[];
  setTaskList: any;
  history: History<unknown> | string[];
};

const TasksFilterRow = (props: TasksFilterRowProps) => {
  const { allTasks, categories, setTaskList, history } = props;
  const [filter, setFilter] = useState({
    dueDate: ANY_DUE,
    category: ANY_CAT,
    value: ANY_VAL,
  });
  const [tasks, setTasks] = useState(allTasks);
  const handleReset = () => {
    history.push("/tasks")
  };
  const handleChange = (e: { target: { id: any; value: any } }) => {
    // this filter needs fixing, as works only sporadically
    // add dropdown category for date (Any, Overdue, Due Today, Due Tomorrow, No Due Date) and value (Any, ...values)
    const id = e.target.id;
    const value = e.target.value;
    console.log(id, value);
    setFilter({ ...filter, [id]: value });
    const filteredTasks =
      filter.category !== ANY_CAT
        ? allTasks.filter(
            (t) => t!.category.toLowerCase() === `${value.toLowerCase()}`
          )
        : allTasks;
    setTaskList(filteredTasks);
    console.log(tasks.length);
  };
  return (
    <Row>
      <Col sm={12}>
        <Row>Filter tasks</Row>
        <Row className='tasks-page__filter-row'>
          <AddNewTaskButton />
          <Button variant='light' className='mb-3 mr-1' onClick={handleReset}>
            <FiRefreshCcw />
          </Button>
          <Form>
            <Form.Group controlId='category' className='mb-3 mr-1'>
              <Form.Control required as='select' onChange={handleChange}>
                <option value={ANY_CAT} selected={filter.category === ANY_CAT}>
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
                    selected={filter.category === cat}>
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
                        selected={filter.category === cat}>
                        {cat!.charAt(0).toUpperCase() + cat!.slice(1)}
                      </option>
                    )
                )}
              </Form.Control>
            </Form.Group>
          </Form>
        </Row>
      </Col>
    </Row>
  );
};

export default TasksFilterRow;
