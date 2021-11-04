import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userInt } from "../../typings/interfaces";
import "./styles.css";

type SidebarProps = {
  user: userInt;
};

const MainSideBar = (props: SidebarProps) => {
  const { user } = props;
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
        <Link to='/tasks'>tasks</Link>
        <Link to='/following'>following</Link>
      </div>
      <div className='main-side-bar__settings'>
        <Button>settings</Button>
      </div>
    </div>
  );
};

export default MainSideBar;
