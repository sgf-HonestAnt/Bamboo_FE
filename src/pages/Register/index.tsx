import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { setRefreshToken } from "../../redux/actions/user";
import { RouteComponentProps } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { LoginBtn, SubmitBtn } from "../__Components/Buttons";
import { BE_URL, USERS, REGISTER, POST } from "../../utils/const/str";
import "./styles.css";

const schema = yup.object().shape({
  first_name: yup.string().required("No first name provided."),
  last_name: yup.string().required("No last name provided."),
  username: yup
    .string()
    .required("No username provided.")
    .min(3, "Username is too short - should be 3 chars minimum."),
  email: yup.string().email().required("No email provided."),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, and One Number."
    ),
});

export default function RegisterPage({ history }: RouteComponentProps) {
  const [loading, setLoading] = useState(false);
  // const [validate, setValidate] = useState<validateProps>({
  //   username: null,
  //   email: null,
  //   password: null,
  // });
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });
  // const handleChange = async (e: any) => {
  //   // e.preventDefault();
  //   // setValidate({ username: null, email: null, password: null });
  //   console.log(e.target.id, e.target.value);
  //   // const { id, value } = e.target;
  //   // console.log({ [id]: value });
  //   // setForm({
  //   //   ...form,
  //   //   [id]: value,
  //   // });
  // };
  const handleClick = () => {
    history.push("/login");
  };
  const handleSubmit = async (e: any) => {
    // e.preventDefault();
    // console.log(e);
    setLoading(true);
    try {
      console.log("✔️attempt registration!", e);
      const url = `${BE_URL}/${USERS}/${REGISTER}`;
      const method = POST;
      const headers = { "Content-Type": "application/json" };
      const body = JSON.stringify(e);
      const response = await fetch(url, {
        method,
        headers,
        body,
      });
      const {
        //message,
        //available,
        accessToken,
        refreshToken,
      } = await response.json();
      console.log(response.status);
      if (response.status === 409) {
        setLoading(false);
      } else {
        localStorage.setItem("token", accessToken);
        setRefreshToken(refreshToken);
        setTimeout(() => history.push("/"), 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("REGISTRATION PAGE", form);
  return (
    <Container fluid>
      <Row className='registration-form'>
        <Col sm={4}>
          <h1>Join Bamboo</h1>
          <Formik
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                handleSubmit(values);
                setSubmitting(false);
              }, 400);
            }}
            initialValues={{
              first_name: "",
              last_name: "",
              username: "",
              email: "",
              password: "",
            }}>
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId='first_name' className='py-1'>
                  <Form.Label column sm='3'>
                    First name
                  </Form.Label>
                  <Col>
                    <InputGroup hasValidation>
                      <Form.Control
                        type='text'
                        placeholder='Jane'
                        aria-describedby='first name'
                        name='first_name'
                        value={values.first_name}
                        onChange={handleChange}
                        isInvalid={!!errors.first_name}
                        // isValid={touched.first_name && !errors.first_name}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.first_name}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='last_name' className='py-1'>
                  <Form.Label column sm='3'>
                    Last name
                  </Form.Label>
                  <Col>
                    <InputGroup hasValidation>
                      <Form.Control
                        type='text'
                        placeholder='Doe'
                        aria-describedby='Last name'
                        name='last_name'
                        value={values.last_name}
                        onChange={handleChange}
                        isInvalid={!!errors.last_name}
                        // isValid={touched.last_name && !errors.last_name}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.last_name}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='username' className='py-1'>
                  <Form.Label column sm='3'>
                    Username
                  </Form.Label>
                  <Col>
                    <InputGroup hasValidation>
                      <InputGroup.Text id='username'>@</InputGroup.Text>
                      <Form.Control
                        type='text'
                        placeholder='janedoe'
                        aria-describedby='username'
                        name='username'
                        value={values.username}
                        onChange={handleChange}
                        isInvalid={!!errors.username}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.username}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='email' className='py-1'>
                  <Form.Label column sm='3'>
                    Email
                  </Form.Label>
                  <Col>
                    <InputGroup hasValidation>
                      <Form.Control
                        type='email'
                        placeholder='janedoe@email.com'
                        aria-describedby='email'
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        // isValid={touched.email && !errors.email}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.email}
                      </Form.Control.Feedback>{" "}
                    </InputGroup>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='password' className='py-1'>
                  <Form.Label column sm='3'>
                    Password
                  </Form.Label>
                  <Col>
                    <InputGroup hasValidation>
                      <Form.Control
                        type='text'
                        placeholder='********'
                        aria-describedby='password'
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                        // isValid={touched.password && !errors.password}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
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
            )}
          </Formik>
          {/* <Form onSubmit={handleSubmit}>
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
          </Form> */}
        </Col>
      </Row>
    </Container>
  );
}
