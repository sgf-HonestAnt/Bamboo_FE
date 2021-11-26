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
};
const NewTasksPage = (props: NewTasksPageProps) => {
  const { user, tasks, history, location } = props;
  const { categories, awaited, in_progress, completed } = tasks;
  const allTasks = awaited.concat(in_progress, completed);
  const [taskList, setTaskList] = useState(allTasks);
  useEffect(() => {
    console.log(taskList.length)
  }, [taskList]);
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
        Make this flawless filter, prettify styling, add param for if date
        given, dash calendar will link to this.
      </div>
      <DragDropContainer taskList={taskList} history={history} />
    </Container>
  );
};

export default NewTasksPage;
