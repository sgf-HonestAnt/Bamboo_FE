import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { useEffect, useState } from "react";
import { History, Location } from "history";
import { Row, Col, Button, Form } from "react-bootstrap";
import { FiRefreshCcw } from "react-icons/fi";
import { beautifulDnD, taskInt, userInt } from "../../typings/interfaces";
import { AddNewTaskButton } from "../Buttons";
import {
  ANY_CAT,
  ANY_DUE,
  ANY_VAL,
  TASK_CATEGORIES,
} from "../../utils/appConstants";
import AddEditTaskModal from "../AddEditTaskModal";

type TasksFilterRowProps = {
  user: userInt; 
  allTasks: (taskInt | undefined)[];
  categories: string[];
  setTaskList: any;
  history: History<unknown> | string[];
};

const TasksFilterRow = (props: TasksFilterRowProps) => {
  const { user, allTasks, categories, setTaskList, history } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [filter, setFilter] = useState({
    dueDate: ANY_DUE,
    category: ANY_CAT,
    value: ANY_VAL,
  });
  const handleReset = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setFilter({
      dueDate: ANY_DUE,
      category: ANY_CAT,
      value: ANY_VAL,
    });
    setTaskList(allTasks);
  };
  const handleChange = async (e: { target: { id: any; value: any } }) => {
    // this filter needs fixing, as works only sporadically
    // add dropdown category for date (Any, Overdue, Due Today, Due Tomorrow, No Due Date) and value (Any, ...values)
    const id = e.target.id;
    const value = e.target.value;
    setFilter({ ...filter, [id]: value });
    filter.category === ANY_CAT
      ? setTaskList(allTasks)
      : setTaskList(
          allTasks.filter(
            (t) => t!.category.toLowerCase() === `${value.toLowerCase()}`
          )
        );
  };
  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    history.push("/tasks-add-new");
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
            user={user}
            categories={categories}
          />{" "}
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
                {categories
                  .filter((c) => !TASK_CATEGORIES.includes(c))
                  .map(
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
