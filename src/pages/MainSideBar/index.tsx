import { Link } from "react-router-dom";
import "./styles.css";

const MainSideBar = () => {
  return (
    <div className='main-side-bar'>
      <Link to='/login'>login</Link>
      <Link to='/dash'>dashboard</Link>
      <Link to='/following'>following</Link>
    </div>
  );
};

export default MainSideBar;
