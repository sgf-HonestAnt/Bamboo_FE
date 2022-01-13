import { History } from "history";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";
import { Form } from "react-bootstrap";
import { ICOACTIVITY, ICOCROWN, ICOUSERS } from "../../../utils/appIcons";
import { EditButton } from "../../__Components/Buttons";
import { getUserRole, updateUserBio } from "../../../utils/funcs/f_users";
import BambooPoints from "../../__Components/XP";
import ProfileBadge from "../../__Components/ProfileBadge";

type DashProfileCardProps = {
  history: History<unknown> | string[];
};
const DashProfileCard = (props: DashProfileCardProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { followedUsers, my_user } = state.currentUser;
  const { username, admin, bio, level, xp } = my_user;
  const { history } = props;
  const dispatch = useDispatch();
  const [newBio, setNewBio] = useState(bio);
  const [formClass, setFormClass] = useState(false); // WAIT, where do I use setFormClass???
  const [showTip, setShowTip] = useState(false);
  const handleChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setNewBio(value);
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (newBio.length >= 2 && newBio.length <= 20) {
      await updateUserBio(newBio, dispatch);
      setFormClass(!formClass);
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
    <div className='bamboo-card-mid dashboard__profile-card'>
      <ProfileBadge isMine={true} />
      <div className='dashboard__card-header'>
        {admin && (
          <div className='mr-1 bamboo-crown'>
            <ICOCROWN />
          </div>
        )}
        {username}
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
        <Link to='/stats'>View Stats</Link>
      </div>
      <div className='dashboard__profile-card__following'>
        <ICOUSERS className='mr-1' />
        Following: <Link to='/following'>{followedUsers.length}</Link>        
      </div>
      <div>
      {followedUsers.length > 3 ? (
        <>
          {followedUsers.slice(0, 3).map((user, i) => {
            const avatar = user.avatar;
            const username = user.username;
            return (
              <Link to={`/following?id=${user._id}`} key={i}>
                <img
                  src={avatar}
                  alt={username}
                  className='x-tiny-round mr-1'
                />
              </Link>
            );
          })}
          <Link to='/following'>+{followedUsers.length - 3}</Link>
        </>
      ) : followedUsers.length > 0 ? (
        followedUsers.map((user, i) => {
          const avatar = user.avatar;
          const username = user.username;
          return (
            <Link to={`/following?id=${user._id}`} key={i}>
              <img src={avatar} alt={username} className='x-tiny-round mr-1' />
            </Link>
          );
        })
      ) : (
        <></>
      )}
      </div>
    </div>
  );
};

export default DashProfileCard;
