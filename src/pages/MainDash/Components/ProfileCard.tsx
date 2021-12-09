import { Link } from "react-router-dom";
import { followedUserInt } from "../../../typings/interfaces";
import { History } from "history";
import { useDispatch } from "react-redux";
import { getUserRole, updateUserBio } from "../../../utils/f_users";
import BambooPoints from "../../../pages__SharedComponents/XP";
import { ICOACTIVITY, ICORELATE } from "../../../utils/appIcons";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
// import {
//   fillUserAction,
//   setUserBio,
//   setUserLoading,
// } from "../../redux/actions/user";
import { EditButton } from "../../../pages__SharedComponents/Buttons";
import ProfileBadge from "../../../pages__SharedComponents/ProfileBadge";

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
  const [formClass, setFormClass] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const handleChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setNewBio(value);
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (newBio.length >= 2 && newBio.length <= 20) {
      await updateUserBio(newBio, dispatch);
      setShowTip(false);
    } else {
      setShowTip(true);
    }
  };
  const pushToSettings = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    history.push("/user-settings");
  };
  const role = getUserRole(level);
  return (
    <div className='dashboard__profile-card m-2'>
      <ProfileBadge avatar={avatar} level={level} />
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
          aria-describedby='bioHelpBlock'
          className={
            formClass
              ? "dashboard__profile-card__bio mt-2"
              : "dashboard__profile-card__bio mt-2 clicked"
          }
          onChange={handleChange}></Form.Control>
        {showTip && (
          <Form.Text id='bioHelpBlock' muted>
            {newBio.length < 2
              ? "Bio too short!"
              : newBio.length > 20
              ? "Bio too long!"
              : ""}
          </Form.Text>
        )}
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
