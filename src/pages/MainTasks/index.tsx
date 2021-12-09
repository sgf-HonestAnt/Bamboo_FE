import { History, Location } from "history";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { beautifulDnD, reduxStateInt, taskInt } from "../../typings/interfaces";
import { Container } from "react-bootstrap";
import { ICOURGENT } from "../../utils/appIcons";
import TasksFilterRow from "./Components/TasksFilterRow";
import DragDropContainer from "./Components/DragDropContainer";
import "./styles.css";

type TasksPageProps = {
  history: History<unknown> | string[];
  location: Location<unknown>;
};
const TasksPage = (props: TasksPageProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const tasks = state.currentTasks;
  const { awaited, in_progress, completed } = tasks;
  const allTasks = awaited.concat(in_progress, completed);
  const { history, location } = props;
  const [taskList, setTaskList] = useState<taskInt[]>(allTasks);
  const [initialData, setInitialData] = useState<beautifulDnD>({
    tasks: [],
    lists: [],
    listOrder: [],
  });
  useEffect(() => {
    console.log(location.pathname); // "/tasks"
  }, [location.pathname]);
  // console.log(initialData);
  return (
    <Container fluid>
      <TasksFilterRow
        setTaskList={setTaskList}
        initialData={initialData}
        setInitialData={setInitialData}
        history={history}
        location={location}
      />
      <div className='red'>
        <ICOURGENT />
        Styling is ugly. Must be able to filter by category, date, and shared
        with(?) perhaps also search by title. Oddly the add xp feature and level
        up feature isn't functioning, check in the morning
      </div>
      <DragDropContainer
        initialData={initialData}
        setInitialData={setInitialData}
        taskList={taskList}
        setTaskList={setTaskList}
      />
    </Container>
  );
};

export default TasksPage;
