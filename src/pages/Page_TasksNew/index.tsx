import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { History, Location } from "history";
import {
  beautifulDnD,
  currentTasksInt,
  userInt,
} from "../../typings/interfaces";
import "./styles.css";
import { AWAITED, COMPLETED, IN_PROGRESS } from "../../utils/appConstants";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableList from "../../pages__components/Page_TasksNew_c/DroppableList";
import TasksFilterRow from "../../pages__components/Page_TasksNew_c/TasksFilterRow";
import NewTasksContainer from "../../pages__components/Page_TasksNew_c/NewTasksContainer";

type NewTasksPageProps = {
  user: userInt;
  tasks: currentTasksInt;
  history: History<unknown> | string[];
};
const NewTasksPage = (props: NewTasksPageProps) => {
  const { user, tasks, history } = props;
  const { categories, awaited, in_progress, completed } = tasks;
  const allTasks = awaited.concat(in_progress, completed);
  const [taskList, setTaskList] = useState(allTasks);
  console.log(taskList.length);
  return (
    <Container fluid>
      <TasksFilterRow
        allTasks={allTasks}
        categories={categories}
        setTaskList={setTaskList}
      />
      <NewTasksContainer taskList={taskList} history={history} />
    </Container>
  );
};

export default NewTasksPage;
