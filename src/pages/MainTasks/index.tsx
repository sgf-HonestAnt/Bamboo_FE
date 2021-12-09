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
  console.log(initialData)
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
        Filter doesn't work. Styling is ugly. Need to add param for if date
        given. Dash calendar should link to specific day. Investigate the
        sidebar load which works well with add new task and push "/tasks" but
        not with move task to completed. When moving task to completed, the
        sidebar should change without whole page refresh (or else remove the
        sidebar task number)
      </div>
      <DragDropContainer initialData={initialData} setInitialData={setInitialData} taskList={taskList} setTaskList={setTaskList} />
    </Container>
  );
};

export default TasksPage;
