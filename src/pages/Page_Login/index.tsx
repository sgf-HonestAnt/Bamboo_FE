import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";
import { attemptLoginUser } from "../../utils/f_users";
import { SubmitButton } from "../../pages__components/App/Buttons";
import "./styles.css";

const LoginPage = ({ history, location, match }: RouteComponentProps) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ username: "", password: "" });
  const handleChange = async (e: {
    preventDefault: () => void;
    target: { id: any; value: any };
  }) => {
    e.preventDefault();
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: value,
    });
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await attemptLoginUser(form, history, dispatch); 
  };
  useEffect(() => {
    console.log(location.pathname); // "/login"
  }, [location.pathname]);
  console.log(form);
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
                  placeholder='Enter email'
                  onChange={handleChange}
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
                  placeholder='Password'
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group>
              <Link to='/register'>Register instead</Link>{" "}
            </Form.Group>
            <SubmitButton />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
