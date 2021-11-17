import { History } from "history";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  currentTasksInt,
  currentSettingsInt,
  followedUserInt,
  userInt,
} from "../../typings/interfaces";
import { CAKE1 } from "../../utils/icons";
import { getTasks } from "../../utils/funcTasks";
import { attemptLogout } from "../../utils/funcSessions";
import "./styles.css";

type SidebarProps = {
  history: History<unknown> | string[];
  user: userInt;
  settings: currentSettingsInt;
  followedUsers: followedUserInt[];
};

const MainSideBar = (props: SidebarProps) => {
  const { history, user, settings, followedUsers } = props;
  const [taskNum, setTaskNum] = useState(0);
  const [loading, setLoading] = useState(true);
  const numOfUsers = followedUsers.length;
  const loadSidebar = async () => {
    const tasks = await getTasks();
    const { awaited, in_progress } = tasks;
    setTaskNum(awaited.length + in_progress.length);
  };
  const logout = async () => {
    await attemptLogout();
    history.push("/login");
  };
  useEffect(() => {
    loadSidebar();
    setLoading(false);
  }, [loading]);
  // console.log("SETTINGS=>", settings);
  return (
    <div className='main-side-bar'>
      <div className='main-side-bar__theme'>
        <Button>theme</Button>
      </div>
      <div className='main-side-bar__branding'>
        <div className='main-side-bar__branding__cake-icon'>
          <CAKE1 />
        </div>
      </div>
      <div className='main-side-bar__profile my-5'>
        <img src={user.avatar} className='main-side-bar__profile-img' alt='' />
        <div>{user.username}</div>
      </div>
      <div className='main-side-bar__links'>
        <Link to='/dash'>dashboard</Link>
        <Link to='/tasks'>tasks ({taskNum})</Link>
        <Link to='/following'>following ({numOfUsers})</Link>
        <Button variant='link' onClick={logout}>
          log out
        </Button>
      </div>
      <div className='main-side-bar__settings'>
        <Button>settings</Button>
      </div>
    </div>
  );
};

export default MainSideBar;
