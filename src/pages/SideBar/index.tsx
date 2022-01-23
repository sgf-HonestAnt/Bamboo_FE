import { History, Location } from "history";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { reduxStateInt } from "../../typings/interfaces";
import { Button } from "react-bootstrap";
import { attemptLogout } from "../../utils/funcs/f_users";
import { RiSettings5Line } from "react-icons/ri";
import { FiMoon, FiChevronRight } from "react-icons/fi";
import BambooLogo from "../__Components/Logo";
import "./styles.css";

type SidebarProps = {
  history: History<unknown> | string[];
  location: Location<unknown>;
  setTheme: any;
};
export default function SideBar(props: SidebarProps) {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user, followedUsers } = state.currentUser;
  const { total_xp } = my_user;
  const { awaited, in_progress, completed } = state.currentTasks;
  const allTasks = awaited.concat(in_progress);
  const numOfUsers = followedUsers.length;
  const { history, location } = props;
  const pathIsAdmin = location.pathname === "/admin-dash";
  // const dispatch = useDispatch();
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
        <BambooLogo />
        {/* <div className='main-side-bar__blurb'>Task app</div> */}
        {/* {!pathIsAdmin && <div className='main-side-bar__updates'>&nbsp;</div>} */}
      </div>
      {!pathIsAdmin ? (
        <>
          <div className='main-side-bar__profile mb-2'>
            You are logged in as
            <div className='text-bigger'>
              <Link to='/dash'>
                {my_user.username} {my_user.admin && "(admin)"}
              </Link>{" "}
              <div>{completed.length} tasks completed</div>
              <div>{total_xp}xp earned</div>
              <div>
                <Link to='/user-settings'>
                  <RiSettings5Line />
                </Link>
              </div>
            </div>
            {/* <div>
              {xp}
              <BambooPoints />
            </div> */}
          </div>
          <div>
            <div
              className={`main-side-bar__links${
                pathIsAdmin ? "-admin" : ""
              } pb-3`}>
              {/* {my_user.admin && (
                <Link to='/admin-dash'>
                  <FiChevronRight />
                  &nbsp;admin
                </Link>
              )} */}
              {/* <Link to='/stats'>
                <FiChevronRight />
                &nbsp;view stats
              </Link> */}
              <Button variant='link' className='d-inline-block p-0'>
                <Link to='/tasks'>tasks ({allTasks.length})</Link>
              </Button>
              <br />
              {numOfUsers > 0 ? (
                <Button variant='link' className='d-inline-block p-0'>
                  <Link to='/following'>team ({numOfUsers})</Link>
                </Button>
              ) : (
                <></>
              )}
            </div>
            <Button variant='link' className='bamboo-logo' onClick={logout}>
              <FiMoon />
              &nbsp;log out
            </Button>
          </div>
        </>
      ) : (
        <div className={`main-side-bar__links${pathIsAdmin ? "-admin" : ""}`}>
          <Link to='/dash'>
            <FiChevronRight />
            &nbsp;dash
          </Link>
        </div>
      )}
    </div>
  );
}
