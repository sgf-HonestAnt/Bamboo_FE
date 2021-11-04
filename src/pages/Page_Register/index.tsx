import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";
import attemptRegister from "../../utils/funcs/register";
import "./styles.css";

const Register = ({ history, location, match }: RouteComponentProps) => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });
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
    attemptRegister(history, form);
  };
  console.log(form);
  return (
    <Container fluid>
      <Row className='registration-form'>
        <Col sm={6}>
          <h1>Register</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type='text'
                id='first_name'
                value={form.first_name}
                placeholder='Enter first name'
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type='text'
                id='last_name'
                value={form.last_name}
                placeholder='Enter last name'
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                id='username'
                value={form.username}
                placeholder='Enter username'
                onChange={handleChange}
              />
            </Form.Group>
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
              <Link to='/login'>Login</Link>{" "}
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
