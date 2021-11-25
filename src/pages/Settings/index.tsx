import { useState, useEffect } from "react";
import { History, Location } from "history";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { currentSettingsInt, userInt } from "../../typings/interfaces";
import { BackToDashButtonCol, SubmitButtonCol } from "../../pages__components/Buttons";
import { THEMES } from "../../utils/appConstants";
import { ICOEDIT } from "../../utils/appIcons";
import "./styles.css";
import ImageUploader from "../../pages__components/Settings_c/ImageUploader";

type SettingsPageProps = {
  history: string[] | History<unknown>;
  location: Location<unknown>;
  user: userInt; 
  settings: currentSettingsInt;
  // { history, location, match }: RouteComponentProps
};

const SettingsPage = (props: SettingsPageProps) => {
  const { user, settings, location } = props;
  const { selectedTheme } = settings;
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
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(form);
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
        </Card.Body>
      </Card>
    </div>
  );
};

export default SettingsPage;
