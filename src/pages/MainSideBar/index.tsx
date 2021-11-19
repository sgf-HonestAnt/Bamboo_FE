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
import { CAKE1, ICOSETTINGS } from "../../utils/icons";
import { getTasks } from "../../utils/f_getTasks";
import attemptLogout from "../../utils/f_attemptLogout";
import "./styles.css";
import PandaLogo from "../../pages__components/Logo";

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
    if (tasks) {
      const { awaited, in_progress } = tasks;
      setTaskNum(awaited.length + in_progress.length);
    }
  };
  const logout = async () => {
    await attemptLogout();
    history.push("/session-closed");
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
      <div className='main-side-bar__branding my-3'>
        <PandaLogo />
        <h3>Panda</h3>
      </div>
      <div className='main-side-bar__profile mb-2'>
        You are logged in as
        <br />
        <span className='text-bigger'>
          {user.username}
        </span>
      </div>
      <div className='main-side-bar__links'>
      {user.admin && <Link to=''>admin</Link>}
        <Link to='/dash'>dashboard</Link>
        <Link to='tasks-add-new'>add new</Link>
        <Link to='/tasks'>tasks ({taskNum})</Link>
        <Link to='/following'>following ({numOfUsers})</Link>
        <Button variant='link' onClick={logout}>
          log out
        </Button>
      </div>
      <div className='main-side-bar__settings'>
        <Button href='/user-settings'>
          <ICOSETTINGS /> 
        </Button>
      </div>
      <div className='main-side-bar__credits mt-5'>
        Icons made by{" "}
        <a href='https://www.freepik.com' title='Freepik'>
          Freepik
        </a>{" "}
        from{" "}
        <a href='https://www.flaticon.com/' title='Flaticon'>
          www.flaticon.com
        </a>
      </div>
    </div>
  );
};

export default MainSideBar;
