import { useState, useEffect } from "react";
import { setRefreshToken } from "../../redux/actions/user";
import { RouteComponentProps } from "react-router-dom";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { LoginBtn, SubmitBtn } from "../__Components/Buttons";
import { SPECIAL_CHARS } from "../../utils/const/arr";
import { BE_URL, USERS, REGISTER, POST } from "../../utils/const/str";
import "./styles.css";

type validateProps = {
  username: string | null;
  email: string | null;
  password: string | null;
};
export default function RegisterPage({ history }: RouteComponentProps) {
  const [loading, setLoading] = useState(false);
  const [validate, setValidate] = useState<validateProps>({
    username: null,
    email: null,
    password: null,
  });
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
    setValidate({ username: null, email: null, password: null });
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: value,
    });
  };
  const handleClick = () => {
    history.push("/login");
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
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
        form.password.length > 15;
      // 🌟 to insist upon special chars in password for future pushes:
      // || !SPECIAL_CHARS.some((string) => form.password?.includes(string));
      if (isNotValid) {
        console.log("isValid=>", !isNotValid);
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
        const {
          message,
          //available,
          accessToken,
          refreshToken,
        } = await response.json();
        if (response.status === 409) {
          if (message === "USERNAME NOT AVAILABLE") {
            setValidate({ ...validate, username: "Username not available" });
          }
          if (message === "EMAIL NOT AVAILABLE") {
            setValidate({ ...validate, email: "Email not available" });
          }
          setLoading(false);
        } else {
          localStorage.setItem("token", accessToken);
          setRefreshToken(refreshToken);
          setTimeout(() => history.push("/"), 1000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, [form]);
  // console.log(form);
  return (
    <Container fluid>
      <Row className='registration-form'>
        <Col sm={4}>
          <h1>Join Bamboo</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId='first_name' className='py-1'>
              <Form.Label column sm='3'>
                First name
              </Form.Label>
              <Col>
                <Form.Control
                  type='text'
                  minLength={3}
                  value={form.first_name}
                  placeholder={"Enter first name"}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='last_name' className='py-1'>
              <Form.Label column sm='3'>
                Last name
              </Form.Label>
              <Col>
                <Form.Control
                  type='text'
                  minLength={3}
                  value={form.last_name}
                  placeholder={"Enter last name"}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='username' className='py-1'>
              <Form.Label column sm='3'>
                Username
              </Form.Label>
              <Col>
                <Form.Control
                  type='text'
                  minLength={5}
                  value={form.username}
                  placeholder={"Enter username"}
                  onChange={handleChange}
                />
                <Form.Text className='code-red m-0'>
                  {validate.username}
                </Form.Text>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='email' className='py-1'>
              <Form.Label column sm='3'>
                Email
              </Form.Label>
              <Col>
                <Form.Control
                  type='email'
                  value={form.email}
                  placeholder={"Enter email"}
                  onChange={handleChange}
                />
                <Form.Text className='code-red m-0'>{validate.email}</Form.Text>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='password' className='py-1'>
              <Form.Label column sm='3'>
                Password
              </Form.Label>
              <Col>
                <Form.Control
                  type='password'
                  minLength={8}
                  value={form.password}
                  placeholder={"Enter password"}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            {loading ? (
              <Spinner animation='grow' className='my-4' />
            ) : (
              <>
                <LoginBtn
                  variant='secondary'
                  label='Login instead?'
                  handleClick={handleClick}
                  className='my-3 mr-3'
                />
                <SubmitBtn variant='secondary' className='my-3' />
              </>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
