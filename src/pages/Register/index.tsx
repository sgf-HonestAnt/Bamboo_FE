import { useState, useEffect } from "react";
import { setRefreshToken } from "../../redux/actions/user";
import { Link, RouteComponentProps } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import { SubmitButton } from "../../pages__SharedComponents/Buttons";
import {
  BE_URL,
  USERS,
  REGISTER,
  POST,
  SPECIAL_CHARS,
} from "../../utils/appConstants";
import "./styles.css";

const RegisterPage = ({ history }: RouteComponentProps) => {
  const defaultClass = "form-control"
  const errorClass = "form-control error-bg"
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });
  const [validation, setValidation] = useState({
    loginClass: "hidden",
    firstName: {
      text: "Enter first name",
      class: defaultClass,
    },
    lastName: {
      text: "Enter last name",
      class: defaultClass,
    },
    username: {
      text: "Enter username",
      class: defaultClass,
      error: "",
    },
    email: {
      text: "Enter email",
      class: defaultClass,
      error: "",
    },
    password: {
      text: "Enter password",
      class: defaultClass,
    },
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
    try {
      console.log("✔️attempt registration!", form);
      const isNotValid =
        form.first_name.length < 2 ||
        form.first_name.length > 20 ||
        form.last_name.length < 2 ||
        form.last_name.length > 20 ||
        form.username.length < 5 ||
        form.username.length > 20 ||
        SPECIAL_CHARS.some((string) => form.username?.includes(string)) ||
        form.username.includes(" ") ||
        form.password.length < 8 ||
        form.password.length > 15 ||
        !SPECIAL_CHARS.some((string) => form.password?.includes(string));
      if (isNotValid) {
        setValidation({
          ...validation,
          firstName: {
            text:
              form.first_name.length === 0
                ? "First name must exist"
                : form.first_name.length < 2
                ? "First name is too short"
                : form.first_name.length > 20
                ? "First name is too long"
                : "Enter first name",
            class:
              form.first_name.length < 2 || form.first_name.length > 20
                ? errorClass
                : defaultClass,
          },
          lastName: {
            text:
              form.last_name.length === 0
                ? "Last name must exist"
                : form.last_name.length < 2
                ? "Last name is too short"
                : form.last_name.length > 20
                ? "Last name is too long"
                : "Enter last name",
            class:
              form.last_name.length < 2 || form.last_name.length > 20
                ? errorClass
                : defaultClass,
          },
          username: {
            ...validation.username,
            text: form.username.length < 1 ? "Username must exist" : "Enter",
            class:
              form.username.length < 1
                ? errorClass
                : defaultClass,
          },
          email: {
            ...validation.email,
            text: form.email.length < 1 ? "Email must exist" : "Enter email",
            class:
              form.email.length < 1 ? errorClass : defaultClass,
          },
          password: {
            text:
              form.password.length < 7
                ? "Password must be longer than 6 characters"
                : "Enter password",
            class:
              form.password.length < 7
                ? errorClass
                : defaultClass,
          },
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
        if (response.status === 409) {
          if (message === "USERNAME NOT AVAILABLE") {
            setValidation({
              ...validation,
              username: {
                ...validation.username,
                class: errorClass,
                error: "Selected username unavailable.",
                // error: `Selected username unavailable. Try the following: ${available
                //   .slice(0, 3)
                //   .map((a: string) => a)}`,
              },
            });
          }
          if (message === "EMAIL NOT AVAILABLE") {
            setValidation({
              ...validation,
              loginClass: "visible",
              email: {
                ...validation.email,
                class: errorClass,
                error: "This email is already registered. Do you want to ",
              },
            });
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
    setValidation({
      loginClass: "hidden",
      firstName: {
        text: "Enter first name",
        class: defaultClass,
      },
      lastName: {
        text: "Enter last name",
        class: defaultClass,
      },
      username: {
        text: "Enter username",
        class: defaultClass,
        error: "",
      },
      email: {
        text: "Enter email",
        class: defaultClass,
        error: "",
      },
      password: {
        text: "Enter password",
        class: defaultClass,
      },
    });
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
                placeholder={validation.firstName.text}
                onChange={handleChange}
                className={validation.firstName.class}
              />
            </Form.Group>
            <Form.Group controlId='last_name'>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type='text'
                value={form.last_name}
                placeholder={validation.lastName.text}
                onChange={handleChange}
                className={validation.lastName.class}
              />
            </Form.Group>
            <Form.Group controlId='username'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                value={form.username}
                placeholder={validation.username.text}
                onChange={handleChange}
                className={validation.username.class}
              />
              <Form.Text>{validation.username.error}</Form.Text>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                value={form.email}
                placeholder={validation.email.text}
                onChange={handleChange}
                className={validation.email.class}
              />
              <Form.Text>
                {/* className='text-muted' */}
                <div className={validation.loginClass}>
                  {validation.email.error}
                  <Link to='/login'>login</Link>?
                </div>
              </Form.Text>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={form.password}
                placeholder={validation.password.text}
                onChange={handleChange}
                className={validation.password.class}
              />
              <Form.Text>
                {validation.password.text !== "Enter password" &&
                  validation.password.text}
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
