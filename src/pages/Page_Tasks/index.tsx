import { Container, Row, Col, Button } from "react-bootstrap";
import { currentTasksInt } from "../../typings/interfaces";
import { GrAddCircle } from "react-icons/gr";
import { FiClock } from "react-icons/fi";
import {
  MdOutlineStarBorder,
  MdOutlineStarHalf,
  MdOutlineStar,
} from "react-icons/md";
import "./styles.css";
// import getCategories from "../../utils/funcs/categories";
import { useEffect, useState } from "react";
import PageTaskCards from "../../pages__components/Page_Tasks_c/PageTaskCards";
import filterTasks from "../../utils/funcs/filterTask";

type TasksProps = {
  tasks: currentTasksInt;
};

const Tasks = (props: TasksProps) => {
  const { tasks } = props;
  const { categories, awaited, in_progress, completed } = tasks;
  const allTasks = awaited.concat(in_progress, completed);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [statusToShow, setStatusToShow] = useState({
    category: "",
    awaited: true,
    in_progress: true,
    completed: false,
  });
  const changeCategory = (e: { target: { value: any; }; }) => {
    const value = e.target.value
    setStatusToShow({
      ...statusToShow,
      category: value,
    });
  };
  const changeAwaited = () => {
    setStatusToShow({
      ...statusToShow,
      awaited: !statusToShow.awaited,
    });
  };
  const changeProgress = () => {
    setStatusToShow({
      ...statusToShow,
      in_progress: !statusToShow.in_progress,
    });
  };
  const changeCompleted = () => {
    setStatusToShow({
      ...statusToShow,
      completed: !statusToShow.completed,
    });
  };
  const filterByStatus = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(statusToShow);
    // add funcionality to filter by category, status, time and value(?)
  };
  const attemptLoad = async () => {
    // const categories = await getCategories(allTasks);
    setAllCategories(categories);
  };
  useEffect(() => {
    attemptLoad();
  }, []);
  console.log(allCategories);
  return (
    <Container fluid>
      <Row className='tasks-page'>
        <Col sm={12}>
          <Row>Tasks | Schedule</Row>
          <Row className='tasks-page__filter-row'>
            <Button className='tasks-page__filter-row__add-btn'>
              <GrAddCircle />
            </Button>
            <div className='tasks-page__filter-row-inner'>
              Filters
              <div className='tasks-page__filter-row-inner-display'>
                <div>
                  <FiClock />
                </div>
                <div>
                  <MdOutlineStarBorder />
                  <MdOutlineStarHalf />
                  <MdOutlineStar />
                </div>
                <form
                  onSubmit={filterByStatus}
                  className='tasks-page__filter-row-inner-display__status-form'>
                  <select name='category' onChange={changeCategory}>
                    {categories.map(function (c,i) {
                      return (
                        <option key={i} value={c} selected={statusToShow.category === c}>
                          {c}
                        </option> 
                      );
                    })}
                  </select>
                  <div className='form-check'>
                    <label className='form-check-label'>
                      <input
                        type='checkbox'
                        checked={statusToShow.awaited}
                        onChange={changeAwaited}
                        className='form-check-input'
                      />
                      Awaited
                    </label>
                  </div>
                  <div className='form-check'>
                    <label className='form-check-label'>
                      <input
                        type='checkbox'
                        checked={statusToShow.in_progress}
                        onChange={changeProgress}
                        className='form-check-input'
                      />
                      In progress
                    </label>
                  </div>
                  <div className='form-check'>
                    <label className='form-check-label'>
                      <input
                        type='checkbox'
                        checked={statusToShow.completed}
                        onChange={changeCompleted}
                        className='form-check-input'
                      />
                      Completed
                    </label>
                  </div>
                  <div className='form-group'>
                    <button className='btn btn-success'>Save</button>
                  </div>
                </form>
                {/* TEST */}
                {/* <Form>
                  <Form.Group controlId='formBasicCheckbox'>
                    <Form.Check
                      type='checkbox'
                      label='Awaited'
                      id='awaited'
                      onChange={(e) => selectStatus(e, "awaited")}
                    />
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Group controlId='formBasicCheckbox'>
                    <Form.Check
                      type='checkbox'
                      label='In progress'
                      id='in_progress'
                      onChange={(e) => selectStatus(e, "in_progress")}
                    />
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Group controlId='formBasicCheckbox'>
                    <Form.Check
                      type='checkbox'
                      label='Completed'
                      id='completed'
                      onChange={(e) => selectStatus(e, "completed")}
                    />
                  </Form.Group>
                </Form> */}
              </div>
            </div>
          </Row>
          <PageTaskCards tasks={allTasks} />
        </Col>
      </Row>
    </Container>
  );
};

export default Tasks;
