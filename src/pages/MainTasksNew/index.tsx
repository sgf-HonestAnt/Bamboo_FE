import { History, Location } from "history";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { reduxStateInt } from "../../typings/interfaces";
import { Container } from "react-bootstrap";
import { ICOURGENT } from "../../utils/appIcons";
import TasksFilterRow from "./Components/TasksFilterRow";
import DragDropContainer from "./Components/DragDropContainer";
import "./styles.css";

type NewTasksPageProps = {
  history: History<unknown> | string[];
  location: Location<unknown>;
  setSideBarLoading: any;
};
const NewTasksPage = (props: NewTasksPageProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user, followedUsers } = state.currentUser;
  const tasks = state.currentTasks;
  const { categories, awaited, in_progress, completed } = tasks;
  const achievements = state.currentAchievements;
  // const settings = state.currentSettings;
  // const { notification } = my_user;
  // const features = state.currentFeatures;
  // const { list, superlist } = achievements;
  // const { avatar, username, admin, bio, level, xp } = my_user;
  // const { selectedTheme } = settings;
  const { history, location, setSideBarLoading } = props;
  const allTasks = awaited.concat(in_progress, completed);
  const [taskList, setTaskList] = useState(allTasks);
  useEffect(() => {
    console.log(location.pathname); // "/tasks"
  }, [location.pathname]);
  return (
    <Container fluid>
      <TasksFilterRow
        setTaskList={setTaskList}
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
      <DragDropContainer
        taskList={taskList}
        history={history}
        setSideBarLoading={setSideBarLoading}
      />
    </Container>
  );
};

export default NewTasksPage;
