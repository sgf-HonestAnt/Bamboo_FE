import { History, Location } from "history";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  currentTasksInt,
  currentSettingsInt,
  followedUserInt,
  userInt,
} from "../../typings/interfaces";
import { ICOSETTINGS } from "../../utils/appIcons";
// import { getTasks } from "../../utils/f_tasks";
import attemptLogout from "../../utils/f_attemptLogout";
import "./styles.css";
import PandaLogo from "../../pages__components/Logo";
import { THEMES } from "../../utils/appConstants";
import {
  changeThemeAction,
  // fillSettingsAction,
} from "../../redux/actions/settings";
import { useDispatch } from "react-redux";

type SidebarProps = {
  history: History<unknown> | string[];
  location: Location<unknown>;
  user: userInt;
  tasks: currentTasksInt;
  settings: currentSettingsInt;
  followedUsers: followedUserInt[];
  theme: string;
  setTheme: any;
  // numberOfTasks: number;
  sideBarLoading: boolean;
  setSideBarLoading: any;
};
const MainSideBar = (props: SidebarProps) => {
  const {
    history,
    location,
    user,
    tasks,
    followedUsers,
    // theme,
    setTheme,
    // numberOfTasks,
    sideBarLoading,
    setSideBarLoading,
  } = props;
  const dispatch = useDispatch();
  const [taskNum, setTaskNum] = useState(0);
  const numOfUsers = followedUsers.length;
  const loadSidebar = async () => {
    if (tasks) {
      const { awaited, in_progress } = tasks;
      setTaskNum(awaited.length + in_progress.length);
    }
  };
  const logout = async () => {
    await attemptLogout();
    history.push("/session-closed");
  };
  const handleChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setTheme(value);
    console.log("dispatch change Theme!", value)
    dispatch(changeThemeAction(value));
    // then do a fetch
  };
  useEffect(() => {
    loadSidebar();
    setSideBarLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sideBarLoading]);
  // console.log("SETTINGS=>", settings);
  return (
    <div className='main-side-bar'>
      {location.pathname !== "/admin-dash" && (
        <div className='main-side-bar__theme'>
          <Form>
            <Form.Group controlId='theme' className='pb-2'>
              <Form.Control
                as='select'
                onChange={handleChange}
                defaultValue={"DEFAULT"}>
                <option value='DEFAULT' disabled>
                  Select a theme
                </option>
                {THEMES.map((t, i) => (
                  <option key={i} value={t}>
                    {t}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
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
