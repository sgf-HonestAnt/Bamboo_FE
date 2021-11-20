import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import { SubmitButton } from "../../utils/buttons";
import { BE_URL, USERS, SESSION, POST, GET } from "../../utils/constants";
import { setRefreshToken } from "../../redux/actions/user";
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
  const findUsernameByEmail = async (email: string) => {
    try {
      const url = `${BE_URL}/${USERS}?email=${email}`;
      const method = GET;
      const response = await fetch(url, { method });
      if (response.ok) {
        const {publicUsers} = await response.json()
        return publicUsers[0].username
      }
    } catch {}
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      console.log("🗝️attempt login!");
      const username = !form.username.includes("@")
        ? form.username
        : await findUsernameByEmail(form.username);
      const password = form.password;
      const url = `${BE_URL}/${USERS}/${SESSION}`;
      const method = POST;
      const headers = { "Content-Type": "application/json" };
      const body = JSON.stringify({ username, password });
      const response = await fetch(url, { method, headers, body });
      if (response.ok) {
        const { accessToken, refreshToken } = await response.json();
        setTimeout(() => {
          localStorage.setItem("token", accessToken);
        }, 1000);
        setTimeout(() => {
          dispatch(setRefreshToken(refreshToken));
        }, 1000);
        setTimeout(() => {
          history.push("/");
        }, 1000);
      } else {
        console.log("😥TROUBLE LOGGING IN");
        history.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);
  console.log(form);
  return (
    <Container fluid>
      <Row className='login-form px-5'>
        <Col sm={6} className="px-5 login-form__col">
          <h1>Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId='username'>
              <Form.Label column sm='12'>
                Email or username
              </Form.Label>
              <Col sm='6'>
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
              <Col sm='6'>
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
