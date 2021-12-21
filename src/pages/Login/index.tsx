import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import { attemptLoginUser } from "../../utils/f_users";
import { SubmitButton } from "../../pages__SharedComponents/Buttons";
import "./styles.css";

const LoginPage = ({ history }: RouteComponentProps) => {
  const dispatch = useDispatch();
  const [failed, setFailed] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const formClass = failed ? "login-form__failed-text" : "";
  const handleChange = async (e: {
    preventDefault: () => void;
    target: { id: any; value: any };
  }) => {
    e.preventDefault();
    setFailed(false);
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: value,
    });
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const loggedIn = await attemptLoginUser(form, history, dispatch);
    loggedIn ? history.push("/") : setFailed(true);
  };
  return (
    <Container fluid>
      <Row className='login-form px-5'>
        <Col sm={6} md={5} lg={4} className='px-5 login-form__col'>
          <h1>Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId='username'>
              <Form.Label column sm={12}>
                Email or username
              </Form.Label>
              <Col sm={12}>
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
            <div className='my-2 login-form__failed-text'>
              {failed ? "Login failed." : ""}
            </div>
            <SubmitButton />
            <div>
              <Link to='/register'>Register instead?</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
