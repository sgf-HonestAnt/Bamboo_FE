import { History, Location } from "history";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { reduxStateInt } from "../../typings/interfaces";
import { Row, Col, Card, Form, Button, Modal } from "react-bootstrap";
import {
  BackToDashButtonCol,
  DeleteButton,
  SubmitBtnCol,
} from "../__Components/Buttons";
import { ICOEDIT } from "../../utils/appIcons";
import {
  setUserEmail,
  setUserAvatar,
  setUserBio,
  setUserFirstName,
  setUserLastName,
  setUsername,
} from "../../redux/actions/user";
import { userUpdateType } from "../../typings/types";
import {
  attemptDeleteUser,
  attemptUpdateUser,
} from "../../utils/funcs/f_users";
import ImageUploader from "../__Components/ImageUploader";
import "./styles.css";

type SettingsPageProps = {
  history: string[] | History<unknown>;
  location: Location<unknown>;
};
export default function SettingsPage(props: SettingsPageProps) {
  //console.log("FIX NEEDED ON SETTINGSPAGE") // 🔨 FIX NEEDED: WELCOME AND GOODBYE EMAILS
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user } = state.currentUser;
  const { history } = props;
  // const { notification } = my_user;
  // const achievements = state.currentAchievements;
  // const tasks = state.currentTasks;
  // const categories = tasks.categories;
  // const features = state.currentFeatures;
  // const settings = state.currentSettings;
  // const { list, superlist } = achievements;
  // const { avatar, username, admin, bio, level, xp } = my_user;
  // const { awaited, in_progress } = tasks;
  // const { selectedTheme } = settings;
  const dispatch = useDispatch();
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
      <ICOEDIT />
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
  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location.pathname]);
  return (
    <div className='settings-page'>
      <Card className='bamboo-card-mid'>
        <Card.Body className='settings-page__profile-card'>
          <Form
            className='pt-1 pb-3 settings-page__profile-card__form'
            onSubmit={handleSubmit}>
            <ImageUploader
              avatar={my_user.avatar}
              handleChangeAvatar={handleChangeAvatar}
            />
            <Form.Group as={Row} controlId='first_name' className='py-2'>
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
            <Form.Group as={Row} controlId='email' className='pb-2'>
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
            <div className='user-settings-buttons mt-3'>
              <BackToDashButtonCol
                label='Back to dashboard'
                handleClick={handleReturn}
              />
              <SubmitBtnCol label='Submit changes' />
            </div>
          </Form>
          {/* the delete account modal */}
          <DeleteButton variant="primary" label='Delete My Account' handleClick={handleShow} />
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
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
        </Card.Body>
      </Card>
    </div>
  );
}
