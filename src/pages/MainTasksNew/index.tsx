import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { History, Location } from "history";
import { currentTasksInt, userInt } from "../../typings/interfaces";
import TasksFilterRow from "../../pages__components/MainTasksNew_c/TasksFilterRow";
import DragDropContainer from "../../pages__components/MainTasksNew_c/DragDropContainer";
import { ICOURGENT } from "../../utils/appIcons";
import "./styles.css";

type NewTasksPageProps = {
  user: userInt;
  tasks: currentTasksInt;
  history: History<unknown> | string[];
  location: Location<unknown>;
  setSideBarLoading: any;
};
const NewTasksPage = (props: NewTasksPageProps) => {
  const { user, tasks, history, location, setSideBarLoading } = props;
  const { categories, awaited, in_progress, completed } = tasks;
  const allTasks = awaited.concat(in_progress, completed);
  const [taskList, setTaskList] = useState(allTasks);
  useEffect(() => {
    console.log(location.pathname); // "/tasks"
  }, [location.pathname]);
  return (
    <Container fluid>
      <TasksFilterRow
        allTasks={allTasks}
        categories={categories}
        setTaskList={setTaskList}
        history={history}
      />
      <div className='red'>
        <ICOURGENT />
        Filter doesn't work. Styling is ugly. Need to add param for if date
        given. Dash calendar should link to specific day. Investigate the
        sidebar load which works well with add new task and push "/tasks" but
        not with move task to completed. When moving task to completed, the
        sidebar should change without whole page refresh (or else
        remove the sidebar task number)
      </div>
      <DragDropContainer
        taskList={taskList}
        history={history}
        setSideBarLoading={setSideBarLoading}
      />
    </Container>
  );
};

export default NewTasksPage;
