import { History } from "history";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { currentTasksInt, followedUserInt, userInt } from "../../typings/interfaces";
import attemptLogout from "../../utils/funcs/logout";
import "./styles.css";

type SidebarProps = {
  history: History<unknown> | string[],
  user: userInt; 
  tasks: currentTasksInt; 
  followedUsers: followedUserInt[];
};

const MainSideBar = (props: SidebarProps) => {
  const { history, user, tasks, followedUsers } = props;
  const {awaited, in_progress} = tasks
  const numOfTasks = awaited.length+in_progress.length
  const numOfUsers = followedUsers.length
  const logout = async () => {
    await attemptLogout()
    history.push("/login")
  }
  return (
    <div className='main-side-bar'>
      <div className='main-side-bar__theme'>
        <Button>theme</Button>
      </div>
      <div className='main-side-bar__profile my-5'>
        <img src={user.avatar} className='main-side-bar__profile-img' alt='' />
        <div>{user.username}</div>
        <Link to='/dash'>dashboard</Link>
      </div>
      <div className='main-side-bar__links'>
        <Link to='/login'>login</Link>
        <Link to='/tasks'>tasks ({numOfTasks})</Link>
        <Link to='/following'>following ({numOfUsers})</Link>
        <Button variant='link' onClick={logout}>log out</Button>
      </div>
      <div className='main-side-bar__settings'>
        <Button>settings</Button>
      </div>
    </div>
  );
};

export default MainSideBar;
