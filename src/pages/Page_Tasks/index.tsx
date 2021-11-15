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
import { useState } from "react";
import PageTaskCards from "../../pages__components/Page_Tasks_c/PageTaskCards";
import { Link } from "react-router-dom";
import { getSelectedDateAsString, getTomorrowAsString } from "../../utils/funcs/dateTimeFuncs";
import { ANY, COMPLETED, NONE, WILD_NUM } from "../../utils/constants";

type TasksProps = {
  tasks: currentTasksInt;
}; 

const Tasks = (props: TasksProps) => {
  const { tasks } = props;
  const { categories, awaited, in_progress, completed } = tasks;
  const allTasks = awaited.concat(in_progress, completed);
  // today, tomorrow, and future
  const todayAsDate = new Date();
  const tomorrowAsDate = getTomorrowAsString(todayAsDate);
  const today = getSelectedDateAsString(todayAsDate); 
  const tomorrow = getSelectedDateAsString(tomorrowAsDate);
  const anyTimeTasks = allTasks.filter((t) => !t.deadline);
  const tasksToday = allTasks.filter(
    (t) => (t.deadline?.slice(0, 10) === today || t.deadline === NONE) && t.status !== COMPLETED
  );
  const tasksTomorrow = allTasks.filter(
    (t) => t.deadline?.slice(0, 10) === tomorrow && t.status !== COMPLETED
  );
  const tasksInFuture = allTasks.filter(
    (t) =>
      t.deadline?.slice(0, 10) !== today &&
      t.deadline !== NONE &&
      t.deadline?.slice(0, 10) !== tomorrow &&
      t.deadline && t.status !== COMPLETED
  );
  // filters
  const [tasksToShow, setTasksToShow] = useState(allTasks) // all, today, tomorrow or future
  const [categoryToShow, setCategoryToShow] = useState(ANY) // user's categories or any
  const [statusToShow, setStatusToShow] = useState(ANY) // awaited, in_progress, completed or any
  const [sharedToShow, setSharedToShow] = useState(true) // true or false
  const [valueToShow, setValueToShow] = useState(WILD_NUM) // 10,20,30,40,50 or WILD
  const [repeatToShow, setRepeatToShow] = useState(ANY) // daily, weekly, monthly, every x days or any 
  return (
    <Container fluid>
      <Row className='tasks-page'>
        <Col sm={12}>
          <Row>Tasks | Schedule</Row>
          <Row className='tasks-page__filter-row'>
            <Button className='tasks-page__filter-row__add-btn'>
              <Link to="tasks-add-new"><GrAddCircle /></Link>
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
              </div>
            </div>
          </Row>
          <PageTaskCards tasks={tasksToShow} categoryToShow={categoryToShow} statusToShow={statusToShow} sharedToShow={sharedToShow} valueToShow={valueToShow} repeatToShow={repeatToShow} />
        </Col>
      </Row>
    </Container>
  );
};

export default Tasks;
