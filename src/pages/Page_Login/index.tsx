import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import { SubmitButton } from "../../utils/buttons";
import { attemptLogin } from "../../utils/funcSessions";
import "./styles.css";

const LoginPage = ({ history, location, match }: RouteComponentProps) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
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
    await attemptLogin(history, dispatch);
  };
  console.log(form);
  return (
    <Container fluid>
      <Row className='login-form'>
        <Col sm={6}>
          <h1>Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                id='email'
                value={form.email}
                placeholder='Enter email'
                onChange={handleChange}
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                id='password'
                value={form.password}
                placeholder='Password'
                onChange={handleChange}
              />
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
