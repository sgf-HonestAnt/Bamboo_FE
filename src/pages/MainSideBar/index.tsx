import { History, Location } from "history";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { reduxStateInt } from "../../typings/interfaces";
import { Button, Form } from "react-bootstrap";
import { ICOCROWN, ICOSETTINGS } from "../../utils/appIcons";
import { THEMES } from "../../utils/appConstants";
import {
  changeThemeAction,
  // fillSettingsAction,
} from "../../redux/actions/settings";
import attemptLogout from "../../utils/f_attemptLogout";
import PandaLogo from "../../pages__SharedComponents/Logo";
import "./styles.css";
import BambooPoints from "../../pages__SharedComponents/XP";

type SidebarProps = {
  history: History<unknown> | string[];
  location: Location<unknown>;
  setTheme: any;
};
const MainSideBar = (props: SidebarProps) => {
  console.log("FIX NEEDED ON MAINSIDEBAR"); // 🔨 FIX NEEDED: STYLE AND IMPLEMENT THEMES!
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user, followedUsers } = state.currentUser;
  const { level, xp } = my_user;
  const { awaited, in_progress } = state.currentTasks;
  const allTasks = awaited.concat(in_progress);
  const numOfUsers = followedUsers.length;
  const { history, location, setTheme } = props;
  const dispatch = useDispatch();
  const logout = async () => {
    await attemptLogout();
    history.push("/session-closed");
  };
  const handleChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setTheme(value);
    console.log(value);
    dispatch(changeThemeAction(value));
    // then do a fetch
  };
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
        <h3>Bamboo</h3>
      </div>
      {location.pathname !== "/admin-dash" ? (
        <>
          <div className='main-side-bar__profile mb-2'>
            You are logged in as
            <div className='text-bigger'>
              <Link to='/dash'>{my_user.username}</Link>{" "}
              {my_user.admin && (
                <span style={{ color: "gold" }}>
                  <ICOCROWN />
                </span>
              )}
            </div>
            <div>level {level}</div>
            <div>
              {xp}
              <BambooPoints />
            </div>
          </div>
          <div className='main-side-bar__links'>
            {my_user.admin && <Link to='/admin-dash'>admin</Link>}
            <Link to='/tasks'>tasks ({allTasks.length})</Link>
            {numOfUsers > 0 ? (
              <Link to='/following'>teammates ({numOfUsers})</Link>
            ) : (
              <div>following (0)</div>
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
