import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";
import { attemptLoginUser } from "../../utils/f_users";
import { SubmitButton } from "../../pages__SharedComponents/Buttons";
import "./styles.css";

const LoginPage = ({ history, location }: RouteComponentProps) => {
  const dispatch = useDispatch();
  const [showFailed, setShowFailed] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const formClass = showFailed ? "login-form__failed-text" : "";
  const handleChange = async (e: {
    preventDefault: () => void;
    target: { id: any; value: any };
  }) => {
    e.preventDefault();
    setShowFailed(false);
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: value,
    });
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const loggedIn = await attemptLoginUser(form, history, dispatch);
    if (loggedIn) {
      history.push("/");
    } else {
      setShowFailed(true);
    }
  };
  useEffect(() => {
    console.log(location.pathname); // "/login"
  }, [location.pathname]);
  return (
    <Container fluid>
      <Row className='login-form px-5'>
        <Col sm={4} className='px-5 login-form__col'>
          <h1>Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId='username'>
              <Form.Label column sm='12'>
                Email or username
              </Form.Label>
              <Col sm='12'>
                <Form.Control
                  type='text'
                  value={form.username}
                  placeholder='Enter email or username'
                  onChange={handleChange}
                  className={formClass}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='password'>
              {/* 🔨 FIX NEEDED: implement password rules! */}
              <Form.Label column sm='12'>
                Password
              </Form.Label>
              <Col sm='12'>
                <Form.Control
                  type='password'
                  value={form.password}
                  placeholder='Enter password'
                  onChange={handleChange}
                  className={formClass}
                />
              </Col>
            </Form.Group>
            {showFailed ? (
              <div className='my-2 login-form__failed-text'>Login failed.</div>
            ) : (
              <div>
                <Link to='/register'>Register instead?</Link>
              </div>
            )}
            <SubmitButton />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
