import { Link } from "react-router-dom";
import { followedUserInt } from "../../typings/interfaces";
import { History } from "history";
import { useDispatch } from "react-redux";
import { attemptUpdateUser, getUserRole, updateBio } from "../../utils/f_users";
import BambooPoints from "../XP";
import { ICOACTIVITY, ICORELATE } from "../../utils/appIcons";
import { Form } from "react-bootstrap";
import { useState } from "react";
import {
  fillUserAction,
  setUserBio,
  setUserLoading,
} from "../../redux/actions/user";
import { EditButton } from "../Buttons";

type DashProfileCardProps = {
  history: History<unknown> | string[];
  followedUsers: followedUserInt[];
  avatar: string;
  username: string;
  admin: boolean | undefined;
  bio: string;
  level: number | null;
  xp: number | null;
};

const DashProfileCard = (props: DashProfileCardProps) => {
  const { history, followedUsers, avatar, username, admin, bio, level, xp } =
    props;
  const dispatch = useDispatch();
  const [newBio, setNewBio] = useState(bio);
  const handleChange = (e: { target: { value: any } }) => {
    setNewBio(e.target.value);
  };
  const handleSubmit = async () => {
    await updateBio(newBio, dispatch);
    history.push("/dash");
  };
  const pushToSettings = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    history.push("/user-settings");
  };
  const role = getUserRole(level);
  return (
    <div className='dashboard__profile-card m-2'>
      <div>BADGES!</div>
      <div className='dashboard__profile-card__holder'>
        <img
          className='dashboard__profile-card__holder-img'
          alt=''
          src={avatar}
        />
        <div className='dashboard__profile-card__level'>
          <span>{level}</span>
        </div>
      </div>
      <div className='dashboard__card-header'>
        {username} {admin && "(admin)"}{" "}
        <EditButton handleClick={pushToSettings} />
      </div>
      <div>{role}</div>
      <div className='dashboard__profile-card__holder-xp'>
        {xp} <BambooPoints />
      </div>
      <Form
        className='dashboard__profile-card__form mx-3 p-0'
        onSubmit={handleSubmit}>
        <Form.Control
          required
          type='text'
          value={newBio}
          placeholder={newBio}
          className='dashboard__profile-card__bio mt-2'
          onChange={handleChange}></Form.Control>
      </Form>
      <div className='dashboard__profile-card__stats'>
        <div>
          <ICOACTIVITY />
        </div>
        <div className='red'>React Stats package</div>
        <Link to='/stats'>Stats</Link>
      </div>
      <div className='dashboard__profile-card__following'>
        <ICORELATE className='mr-1' />
        Following: <Link to='/following'>{followedUsers.length}</Link>
      </div>
    </div>
  );
};

export default DashProfileCard;
