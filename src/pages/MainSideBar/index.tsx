import { History, Location } from "history";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  currentTasksInt,
  currentSettingsInt,
  followedUserInt,
  userInt,
} from "../../typings/interfaces";
import { CAKE1, ICOSETTINGS } from "../../utils/appIcons";
import { getTasks } from "../../utils/f_tasks";
import attemptLogout from "../../utils/f_attemptLogout";
import "./styles.css";
import PandaLogo from "../../pages__components/Logo";

type SidebarProps = {
  history: History<unknown> | string[];
  location: Location<unknown>;
  user: userInt;
  settings: currentSettingsInt;
  followedUsers: followedUserInt[];
  theme: string;
  setTheme: any;
};

const MainSideBar = (props: SidebarProps) => {
  const { history, location, user, settings, followedUsers, theme, setTheme } =
    props;
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
  const handleClick = () => {
    setTheme(theme === "theme-light" ? "theme-dark" : "theme-light");
  };
  useEffect(() => {
    loadSidebar();
    setLoading(false);
  }, [loading]);
  // console.log("SETTINGS=>", settings);
  return (
    <div className='main-side-bar'>
      {location.pathname !== "/admin-dash" && (
        <div className='main-side-bar__theme'>
          <Button onClick={handleClick}>theme</Button> 
        </div>
      )}
      <div className='main-side-bar__branding my-3'>
        <PandaLogo />
        <h3>Panda</h3>
      </div>
      {location.pathname !== "/admin-dash" ? (
        <>
          <div className='main-side-bar__profile mb-2'>
            You are logged in as
            <br />
            <span className='text-bigger'>{user.username}</span>
          </div>
          <div className='main-side-bar__links'>
            {user.admin && <Link to='/admin-dash'>admin</Link>}
            <Link to='/dash'>dashboard</Link>
            <Link to='tasks-add-new'>add new</Link>
            <Link to='/tasks'>tasks ({taskNum})</Link>
            {numOfUsers > 0 ? (
              <Link to='/following'>following ({numOfUsers})</Link>
            ) : (
              <div>following 0</div>
            )}
            <Button variant='link' onClick={logout}>
              log out
            </Button>
          </div>
          <div className='main-side-bar__settings'>
            <Button href='/user-settings'>
              <ICOSETTINGS />
            </Button>
          </div>
          {/* <div className='main-side-bar__credits mt-5'>
            Icons made by{" "}
            <a href='https://www.freepik.com' title='Freepik'>
              Freepik
            </a>{" "}
            from{" "}
            <a href='https://www.flaticon.com/' title='Flaticon'>
              www.flaticon.com
            </a>
          </div> */}
        </>
      ) : (
        <div className='main-side-bar__links'>
          <Link to='/dash'>back to dash</Link>
        </div>
      )}
    </div>
  );
};

export default MainSideBar;
