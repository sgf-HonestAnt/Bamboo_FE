import { History, Location } from "history";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { reduxStateInt } from "../../typings/interfaces";
import { Badge, Button, Container, Navbar, NavDropdown } from "react-bootstrap";
import { attemptLogout } from "../../utils/funcs/f_users";
import { RiDashboard3Line, RiSettings5Line } from "react-icons/ri";
import { FiActivity, FiMoon, FiServer, FiUsers } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import BambooLogo from "../__Components/Logo";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Bamboo1 from "../../media/Bamboo1.svg";
import "./styles.css";

type SidebarProps = {
  history: History<unknown> | string[];
  location: Location<unknown>;
  setTheme: any;
};
export default function SideBar(props: SidebarProps) {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user, followedUsers } = state.currentUser;
  const { xp, total_xp, notification } = my_user;
  const { awaited, in_progress, completed } = state.currentTasks;
  const allTasks = awaited.concat(in_progress);
  const numOfUsers = followedUsers.length;
  const numOfSharedTasks = allTasks
    .concat(completed)
    .filter((task) => task?.sharedWith!.length > 1).length;
  const { history, location } = props;
  const pathIsAdmin = location.pathname === "/admin-dash";
  const [toggle, setToggle] = useState(false);
  const [toggleMore, setToggleMore] = useState(false);
  const logout = async () => {
    await attemptLogout();
    history.push("/login");
  };
  const isGt755 = useMediaQuery({
    query: "(min-width: 755px)",
  });
  return pathIsAdmin || !isGt755 ? (
    <Navbar sticky='top' bg='dark' variant='dark'>
      <Container fluid>
        <Navbar.Brand href='/dash'>
          <img
            alt=''
            src={Bamboo1}
            width='50'
            height='50'
            className='d-inline-block align-top'
          />{" "}
        </Navbar.Brand>
        <NavDropdown title='Navigation' id='collasible-nav-dropdown'>
          <NavDropdown.Item href='/dash'>
            <RiDashboard3Line /> Dash
          </NavDropdown.Item>
          <NavDropdown.Item href='/tasks'>
            <FiServer /> Tasks
          </NavDropdown.Item>
          {numOfUsers > 0 && (
            <NavDropdown.Item href='/following'>
              <FiUsers /> Team
            </NavDropdown.Item>
          )}
          <NavDropdown.Item href='/stats'>
            <FiActivity /> Stats
          </NavDropdown.Item>
          <NavDropdown.Item href='/user-settings'>
            <RiSettings5Line /> Settings
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>
            <span onClick={logout}>
              <FiMoon /> Log out
            </span>
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  ) : (
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
      </div>
      {!pathIsAdmin && (
        <>
          <div className='mb-2'>
            <div className='main-side-bar__links pb-2'>
              <Button variant='primary' className='m-1'>
                <CgProfile /> You are logged in as {my_user.username}{" "}
                <Badge
                  bg={toggle ? "secondary" : "dark"}
                  onClick={(e) => {
                    setToggle(!toggle);
                    setToggleMore(false);
                  }}>
                  toggle
                </Badge>{" "}
                {toggle && (
                  <>
                    <Badge bg='dark'>
                      {allTasks.concat(completed).length} task
                      {allTasks.concat(completed).length === 1 ? "" : "s"} total
                    </Badge>{" "}
                    {toggleMore && (
                      <>
                        <Badge bg='dark'>{completed.length} completed</Badge>{" "}
                        <Badge bg='dark'>{awaited.length} awaited</Badge>{" "}
                        <Badge bg='dark'>
                          {in_progress.length} in progress
                        </Badge>{" "}
                      </>
                    )}
                    <Badge bg='danger'>{total_xp}xp total</Badge>{" "}
                    {toggleMore && (
                      <>
                        <Badge bg='danger'>{xp}xp available</Badge>{" "}
                        <Badge bg='danger'>{total_xp - xp}xp spent</Badge>{" "}
                      </>
                    )}
                    <Badge bg='success'>{followedUsers.length} teammates</Badge>{" "}
                    {toggleMore && (
                      <>
                        <Badge bg='success'>
                          {
                            notification.filter((note) =>
                              note.includes("has sent you a request")
                            ).length
                          }{" "}
                          request
                          {notification.filter((note) =>
                            note.includes("has sent you a request")
                          ).length === 1
                            ? ""
                            : "s"}{" "}
                        </Badge>{" "}
                        <Badge bg='success'>
                          {numOfSharedTasks} task
                          {numOfSharedTasks === 1 ? "" : "s"} shared
                        </Badge>{" "}
                      </>
                    )}
                    {my_user.admin && <Badge bg='primary'>admin</Badge>}{" "}
                    <Badge
                      bg='warning'
                      onClick={(e) => setToggleMore(!toggleMore)}>
                      toggle {toggleMore ? "less" : "more"}
                    </Badge>{" "}
                  </>
                )}
              </Button>
              {/* </Link> */}
            </div>{" "}
            <div className='pt-2'>
              <Link to='/dash'>
                <Button variant='primary' className='m-1'>
                  <RiDashboard3Line /> Dash
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
              <Link to='/user-settings'>
                <Button variant='primary' className='m-1'>
                  <RiSettings5Line /> Settings
                </Button>
              </Link>
              <Button variant='primary' onClick={logout} className='m-1'>
                <FiMoon /> Log out
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
