import { History, Location } from "history";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { reduxStateInt } from "../../typings/interfaces";
import { Button, Form } from "react-bootstrap";
import { ICOSETTINGS } from "../../utils/appIcons";
import { THEMES } from "../../utils/appConstants";
import {
  changeThemeAction,
  // fillSettingsAction,
} from "../../redux/actions/settings";
import attemptLogout from "../../utils/f_attemptLogout";
import PandaLogo from "../../pages__SharedComponents/Logo";
import "./styles.css";

type SidebarProps = {
  history: History<unknown> | string[];
  location: Location<unknown>;
  setTheme: any;
};
const MainSideBar = (props: SidebarProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user, followedUsers } = state.currentUser;
  const { awaited, in_progress } = state.currentTasks;
  const awaitedAndProgressTasks = awaited.concat(in_progress);
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
    console.log("dispatch change Theme!", value);
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
            <br />
            <span className='text-bigger'>{my_user.username}</span>
          </div>
          <div className='main-side-bar__links'>
            {my_user.admin && <Link to='/admin-dash'>admin</Link>}
            <Link to='/dash'>dashboard</Link>
            <Link to='/tasks'>tasks ({awaitedAndProgressTasks.length})</Link>
            {numOfUsers > 0 ? (
              <Link to='/following'>following ({numOfUsers})</Link>
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
