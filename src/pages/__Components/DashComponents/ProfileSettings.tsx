import { History } from "history";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import {
  attemptDeleteUser,
  attemptUpdateUser,
  getUserRole,
} from "../../../utils/funcs/f_users";
import BambooPoints from "../XP";
import ProfileBadge from "../ProfileBadge";
import returnIco from "../../../utils/funcs/f_ico";
import { FiActivity, FiEdit, FiUsers } from "react-icons/fi";
import { BackToDashButtonCol, DeleteButton, SubmitBtnCol } from "../Buttons";
import ImageUploader from "../ImageUploader";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  setUserAvatar,
  setUserBio,
  setUserEmail,
  setUserFirstName,
  setUserLastName,
  setUsername,
} from "../../../redux/actions/user";
import { userUpdateType } from "../../../typings/types";

type ProfileSettingsProps = {
  isBigScreen?: boolean;
  history: History<unknown> | string[];
};
export default function ProfileSettings(props: ProfileSettingsProps) {
  const dispatch = useDispatch();
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { followedUsers, my_user } = state.currentUser;
  const { username, bio, level, xp, rewards } = my_user;
  const { isBigScreen, history } = props;
  const pushToSettings = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    history.push("/user-settings");
  };
  const role = getUserRole(level);
  const [newAvatar, setNewAvatar] = useState<any>();
  const [form, setForm] = useState({
    avatar: my_user.avatar,
    first_name: my_user.first_name,
    last_name: my_user.last_name,
    username: my_user.username,
    bio: my_user.bio,
    email: my_user.email,
  });
  const editButton = (
    <Button variant='link' className='settings-page__profile-card__edit-button'>
      <FiEdit />
    </Button>
  );
  const handleChange = (e: { target: { value: any; id: any } }) => {
    const value = e.target.value;
    const id = e.target.id;
    setForm({ ...form, [id]: value });
  };
  const handleChangeAvatar = (avatar: any) => {
    setNewAvatar(avatar.file);
  };
  const handleDispatch = async (updated: userUpdateType) => {
    my_user.avatar !== updated.avatar! &&
      dispatch(setUserAvatar(updated.avatar));
    my_user.first_name !== updated.first_name! &&
      dispatch(setUserFirstName(updated.first_name));
    my_user.last_name !== updated.last_name! &&
      dispatch(setUserLastName(updated.last_name));
    my_user.username !== updated.username! &&
      dispatch(setUsername(updated.username));
    my_user.bio !== updated.bio! && dispatch(setUserBio(updated.bio));
    my_user.email !== updated.email! && dispatch(setUserEmail(updated.email));
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const updated = await attemptUpdateUser(form, newAvatar);
    if (updated) {
      await handleDispatch(updated);
      history.push("/dash");
    }
  };
  const handleReturn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    history.push("/dash");
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const deleted = await attemptDeleteUser();
    if (deleted?.status === 204) {
      history.push("/");
    }
  };
  return (
    <div className={`bamboo-card-mid ${isBigScreen ? "px-5" : ""}`}>
      <ProfileBadge isMine={true} />
      <div className='dashboard__card-header'>
        {username}
        <Button
          className='p-1 dashboard__profile-card__edit-btn'
          variant='link'
          onClick={pushToSettings}>
          <FiEdit />
        </Button>{" "}
      </div>
      <div>{role}</div>
      <div className='dashboard__profile-card__holder-xp'>
        {xp} <BambooPoints />
      </div>
      <div className='rewards'>
        {rewards
          .filter((item) => !item.available || item.available < 1)
          .map((item, i) => (
            <Image
              key={i}
              roundedCircle
              src={returnIco(item.reward)}
              alt={item.reward}
              className='tiny-square p-1 mr-1 mb-1'
              style={{ backgroundColor: "white" }}
              height='40px'
            />
          ))}
      </div>
      <div className='d-flex align-items-center justify-content-center dashboard__profile-card__bio'>
        <span>{bio}</span>
        <Button
          className='p-1 dashboard__profile-card__edit-btn'
          variant='link'
          onClick={pushToSettings}>
          <FiEdit />
        </Button>
      </div>
      <div className='dashboard__profile-card__stats'>
        <div>
          <FiActivity />
        </div>
        <Link to='/stats'>View Stats</Link>
      </div>
      <div className='dashboard__profile-card__following'>
        My Team: <Link to='/following'>{followedUsers.length}</Link>{" "}
        <FiUsers className='mr-1' />
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
                    className='dotted-border x-tiny-round mr-1'
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
                <img
                  src={avatar}
                  alt={username}
                  className='dotted-border x-tiny-round mr-1'
                />
              </Link>
            );
          })
        ) : (
          <></>
        )}
        <Form
          className='pt-1 pb-0 settings-page__profile-card__form'
          onSubmit={handleSubmit}>
          <ImageUploader
            avatar={my_user.avatar}
            handleChangeAvatar={handleChangeAvatar}
          />
          <Form.Group as={Row} controlId='first_name' className='pt-3 pb-2'>
            <Form.Label column sm='4'>
              first name
            </Form.Label>
            <Col sm='8'>
              <Form.Control
                type='text'
                value={form.first_name}
                onChange={handleChange}
                className='settings-page__profile-card__form-control'
              />
              {editButton}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='last_name' className='pb-2'>
            <Form.Label column sm='4'>
              last name
            </Form.Label>
            <Col sm='8'>
              <Form.Control
                type='text'
                value={form.last_name}
                onChange={handleChange}
                className='settings-page__profile-card__form-control'
              />
              {editButton}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='username' className='pb-2'>
            <Form.Label column sm='4'>
              username
            </Form.Label>
            <Col sm='8'>
              <Form.Control
                type='text'
                value={form.username}
                onChange={handleChange}
                className='settings-page__profile-card__form-control'
              />
              {editButton}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='bio' className='pb-2'>
            <Form.Label column sm='4'>
              bio
            </Form.Label>
            <Col sm='8'>
              <Form.Control
                type='text'
                value={form.bio}
                maxLength={20}
                minLength={2}
                onChange={handleChange}
                className='settings-page__profile-card__form-control'
              />
              {editButton}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='email' className='pb-1'>
            <Form.Label column sm='4'>
              email
            </Form.Label>
            <Col sm='8'>
              <Form.Control
                type='email'
                value={form.email}
                onChange={handleChange}
                className='settings-page__profile-card__form-control'
              />
              {editButton}
            </Col>
          </Form.Group>
          <div className='user-settings-buttons mt-2'>
            <BackToDashButtonCol
              label='Back to dashboard'
              handleClick={handleReturn}
            />
            <SubmitBtnCol label='Submit changes' />
          </div>
        </Form>
        {/* the delete account modal */}
        <DeleteButton label='Delete My Account' handleClick={handleShow} />
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>This cannot be undone.</Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={handleDelete}>
              Yes, delete my account
            </Button>
            <Button variant='secondary' onClick={handleClose}>
              No, go back
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
