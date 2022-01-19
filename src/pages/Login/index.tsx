import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { attemptLoginUser } from "../../utils/funcs/f_users";
import { LoginBtn, SubmitBtn } from "../__Components/Buttons";
import "./styles.css";

export default function LoginPage({ history }: RouteComponentProps) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const formClass = failed ? "login-form__failed-text" : "";
  function handleClick() {
    history.push("/register");
  }
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
    setLoading(true);
    const loggedIn = await attemptLoginUser(form, setLoading, dispatch);
    setTimeout(() => loggedIn && history.push("/"), 1000);
    !loggedIn && setFailed(true);
  };
  useEffect(() => {}, [loading]);
  return (
    <Container fluid>
      <Row className='login-form px-5'>
        <Col sm={6} md={5} lg={4} className='px-5 login-form__col'>
          <h1>Login to Bamboo</h1>
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
            {loading ? (
              <Spinner animation='grow' className='my-4' />
            ) : (
              <>
                <SubmitBtn variant='secondary' className='my-3 mr-3' />
                <LoginBtn
                  variant='secondary'
                  label='Register instead?'
                  handleClick={handleClick}
                  className='my-3'
                />
              </>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
