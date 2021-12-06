import { useState, useEffect } from "react";
import { History, Location } from "history";
import { Row, Col, Card, Form, Button, Modal } from "react-bootstrap";
import { currentSettingsInt, userInt } from "../../typings/interfaces";
import {
  BackToDashButtonCol,
  DeleteButton,
  SubmitButtonCol,
} from "../../pages__components/Buttons";
import { THEMES } from "../../utils/appConstants";
import { ICOEDIT } from "../../utils/appIcons";
import "./styles.css";
import ImageUploader from "../../pages__components/Settings_c/ImageUploader";
import { attemptDeleteUser, attemptUpdateUser } from "../../utils/f_users";
import { fillUserAction } from "../../redux/actions/user";
import { useDispatch } from "react-redux";
type SettingsPageProps = {
  history: string[] | History<unknown>;
  location: Location<unknown>;
  user: userInt;
  settings: currentSettingsInt;
  // { history, location, match }: RouteComponentProps
};
const SettingsPage = (props: SettingsPageProps) => {
  const { history, location, user, settings } = props;
  const { selectedTheme } = settings;
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    avatar: user.avatar,
    username: user.username,
    bio: user.bio,
    email: user.email,
    theme: selectedTheme,
  });
  const editButton = (
    <Button variant='link' className='settings-page__profile-card__edit-button'>
      <ICOEDIT />
    </Button>
  );
  const handleChange = (e: { target: { value: any; id: any } }) => {
    const value = e.target.value;
    const id = e.target.id;
    console.log(value);
    setForm({ ...form, [id]: value });
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(form);
    const updated = await attemptUpdateUser(form);
    if (updated?.status === 200) {
      await dispatch(fillUserAction());
      history.push("/dash");
    }
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("DELETE!");
    const deleted = await attemptDeleteUser()
    if (deleted?.status === 204) {
      history.push("/")
    }
  };
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);
  return (
    <div className='settings-page'>
      <Card className='col-4 my-3'>
        <Card.Body className='settings-page__profile-card'>
          <img
            src={user.avatar}
            alt=''
            className='settings-page__profile-card__profile-img'
          />
          <div className='red'>Make it possible to change avatar!</div>
          <Form
            className='pt-1 pb-3 settings-page__profile-card__form'
            onSubmit={handleSubmit}>
            <ImageUploader />
            <Form.Group as={Row} controlId='avatar'>
              <Form.Label column sm='4'>
                avatar
              </Form.Label>
              <Col sm='8'>
                <Form.Control type='file' size='sm' />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='username'>
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
              {/* <Col sm='2'>{editButton}</Col> */}
            </Form.Group>
            <Form.Group as={Row} controlId='bio'>
              <Form.Label column sm='4'>
                bio
              </Form.Label>
              <Col sm='8'>
                <Form.Control
                  as='textarea'
                  rows={3}
                  value={form.bio}
                  onChange={handleChange}
                  className='settings-page__profile-card__form-control'
                />
                {editButton}
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='email'>
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
            <Form.Group as={Row} controlId='theme' className='pb-2'>
              <Form.Label column sm='4'>
                theme
              </Form.Label>
              <Col sm='8'>
                <Form.Control as='select' onChange={handleChange}>
                  {THEMES.map((t, i) => (
                    <option key={i}>{t}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <BackToDashButtonCol />
            <SubmitButtonCol />
          </Form>
          <DeleteButton label="Delete Account" handleClick={handleShow} />
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              This cannot be undone.
            </Modal.Body>
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
};

export default SettingsPage;
