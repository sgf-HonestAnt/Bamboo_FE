import { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";
import { setRefreshToken } from "../../redux/actions/user";
import { SubmitButton } from "../../pages__SharedComponents/Buttons";
import { BE_URL, USERS, REGISTER, POST } from "../../utils/appConstants";
import "./styles.css";

const RegisterPage = ({ history, location, match }: RouteComponentProps) => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });
  const [firstName, setFirstName] = useState({
    text: "Enter first name",
    class: "form-control",
  });
  const [lastName, setLastName] = useState({
    text: "Enter last name",
    class: "form-control",
  });
  const [username, setUsername] = useState({
    text: "Enter username",
    class: "form-control",
  });
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState({
    text: "Enter email",
    class: "form-control",
  });
  const [password, setPassword] = useState({
    text: "Enter password",
    class: "form-control",
  });
  const [loginClass, setLoginClass] = useState("hidden");
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
    try {
      console.log("✔️attempt registration!", form);
      if (form.password.length < 7) {
        setPassword({
          text: "Password must be longer than 6 characters",
          class: "form-control error-bg",
        });
      } else {
        const url = `${BE_URL}/${USERS}/${REGISTER}`;
        const method = POST;
        const headers = { "Content-Type": "application/json" };
        const body = JSON.stringify(form);
        const response = await fetch(url, {
          method,
          headers,
          body,
        });
        const { message, available, accessToken, refreshToken } =
          await response.json();
        if (response.status === 500) {
          if (form.first_name.length < 1) {
            setFirstName({
              text: "First name must exist",
              class: "form-control error-bg",
            });
          }
          if (form.last_name.length < 1) {
            setLastName({
              text: "Last name must exist",
              class: "form-control error-bg",
            });
          }
          if (form.username.length < 1) {
            setUsername({
              text: "Username must exist",
              class: "form-control error-bg",
            });
          }
          if (form.email.length < 1) {
            setEmail({
              text: "Email must exist",
              class: "form-control error-bg",
            });
          }
        } else if (response.status === 409) {
          if (message === "USERNAME NOT AVAILABLE") {
            setUsernameError(
              `Selected username unavailable. Try the following: ${available
                .slice(0, 3)
                .map((a: string) => a)}`
            );
            setUsername({ ...username, class: "form-control error-bg" });
          }
          if (message === "EMAIL NOT AVAILABLE") {
            setEmailError("This email is already registered. Do you want to ");
            setLoginClass("visible");
            setEmail({ ...email, class: "form-control error-bg" });
          }
        } else {
          localStorage.setItem("token", accessToken);
          setRefreshToken(refreshToken);
          history.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    setFirstName({
      text: "Enter first name",
      class: "form-control",
    });
    setLastName({
      text: "Enter last name",
      class: "form-control",
    });
    setUsername({
      text: "Enter username",
      class: "form-control",
    });
    setEmail({
      text: "Enter email",
      class: "form-control",
    });
    setPassword({
      text: "Enter password",
      class: "form-control",
    });
    setLoginClass("hidden");
  }, [form]);
  return (
    <Container fluid>
      <Row className='registration-form'>
        <Col sm={4}>
          <h1>Register</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='first_name'>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type='text'
                value={form.first_name}
                placeholder={firstName.text}
                onChange={handleChange}
                className={firstName.class}
              />
            </Form.Group>
            <Form.Group controlId='last_name'>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type='text'
                value={form.last_name}
                placeholder={lastName.text}
                onChange={handleChange}
                className={lastName.class}
              />
            </Form.Group>
            <Form.Group controlId='username'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                value={form.username}
                placeholder={username.text}
                onChange={handleChange}
                className={username.class}
              />
              <Form.Text>{usernameError}</Form.Text>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                value={form.email}
                placeholder={email.text}
                onChange={handleChange}
                className={email.class}
              />
              <Form.Text>
                {/* className='text-muted' */}
                <div className={loginClass}>
                  {emailError}
                  <Link to='/login'>login</Link>?
                </div>
              </Form.Text>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={form.password}
                placeholder={password.text}
                onChange={handleChange}
                className={password.class}
              />
              <Form.Text>
                {password.text !== "Enter password" && password.text}
              </Form.Text>
            </Form.Group>
            <div className='mt-2'>
              <Link to='/login'>Login instead?</Link>
            </div>
            <SubmitButton />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
