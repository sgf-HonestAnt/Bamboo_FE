import { History, Location } from "history";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { reduxStateInt } from "../../typings/interfaces";
import { Badge, Button } from "react-bootstrap";
import { attemptLogout } from "../../utils/funcs/f_users";
import { RiSettings5Line } from "react-icons/ri";
import { FiActivity, FiMoon, FiServer, FiUsers } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import BambooLogo from "../__Components/Logo";
import "./styles.css";
import { useState } from "react";

type SidebarProps = {
  history: History<unknown> | string[];
  location: Location<unknown>;
  setTheme: any;
};
export default function SideBar(props: SidebarProps) {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user, followedUsers } = state.currentUser;
  const { xp, total_xp } = my_user;
  const { awaited, in_progress, completed } = state.currentTasks;
  const allTasks = awaited.concat(in_progress);
  const numOfUsers = followedUsers.length;
  const numOfSharedTasks = allTasks
    .concat(completed)
    .filter((task) => task?.sharedWith!.length > 1).length;
  const { history, location } = props;
  const pathIsAdmin = location.pathname === "/admin-dash";
  // const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [toggleMore, setToggleMore] = useState(false);
  const logout = async () => {
    await attemptLogout();
    history.push("/login");
  };
  return (
    <div className='main-side-bar'>
      {!pathIsAdmin && (
        <div>{/* <ThemePicker handleChange={handleChange} /> */}</div>
      )}
      <div
        className={`main-side-bar__branding${
          pathIsAdmin ? "-admin" : ""
        } my-3`}>
        <Link to='/'>
          <BambooLogo isAdmin={pathIsAdmin} />
        </Link>
        {/* <div className='main-side-bar__blurb'>Task app</div> */}
        {/* {!pathIsAdmin && <div className='main-side-bar__updates'>&nbsp;</div>} */}
      </div>
      {!pathIsAdmin && (
        <>
          <div className='mb-2'>
            <div className='main-side-bar__links pb-2'>
              <Link to='/user-settings' className='m-1'>
                <Button variant='primary'>
                  <RiSettings5Line />
                </Button>
              </Link>
            </div>{" "}
            <div className='main-side-bar__links py-2'>
              <div className='text-tinycaps'>You are logged in as</div>
              <Link to='/dash'>
                <Button variant='primary' className='m-1'>
                  <CgProfile /> {my_user.username}{" "}
                  <Badge
                    bg={toggle ? "secondary" : "dark"}
                    onClick={(e) => {
                      setToggle(!toggle);
                      setToggleMore(false);
                    }}>
                    toggle
                  </Badge>
                  {toggle && (
                    <>
                      {my_user.admin && <Badge bg='primary'>admin</Badge>}{" "}
                      <Badge bg='dark'>
                        {completed.length} task
                        {completed.length === 1 ? "" : "s"} completed
                      </Badge>
                      <Badge bg='danger'>{total_xp}xp earned</Badge>
                      {toggleMore && (
                        <>
                          <Badge bg='dark'>
                            {awaited.length} task
                            {awaited.length === 1 ? "" : "s"} awaited
                          </Badge>
                          <Badge bg='dark'>
                            {in_progress.length} task
                            {in_progress.length === 1 ? "" : "s"} in progress
                          </Badge>
                          <Badge bg='dark'>
                            {numOfSharedTasks} task
                            {numOfSharedTasks === 1 ? "" : "s"} shared
                          </Badge>
                          <Badge bg='danger'>{xp}xp available</Badge>
                        </>
                      )}
                      <Badge
                        bg='warning'
                        onClick={(e) => setToggleMore(!toggleMore)}>
                        toggle {toggleMore ? "less" : "more"}
                      </Badge>{" "}
                    </>
                  )}
                </Button>
              </Link>
              <Link to='/tasks'>
                <Button variant='primary' className='m-1'>
                  <FiServer /> Tasks <Badge bg='dark'>{allTasks.length}</Badge>
                </Button>
              </Link>
              {numOfUsers > 0 && (
                <Link to='/following'>
                  <Button variant='primary' className='m-1'>
                    <FiUsers /> Team <Badge bg='dark'>{numOfUsers}</Badge>
                  </Button>
                </Link>
              )}
              <Link to='/stats'>
                <Button variant='primary' className='m-1'>
                  <FiActivity /> Stats
                </Button>
              </Link>
            </div>
            <div className='main-side-bar__logout pt-2'>
              <Button variant='primary' onClick={logout}>
                <FiMoon /> Log out
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
