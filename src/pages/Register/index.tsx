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
  Card,
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
  const [loadingRegistration, setLoadingRegistration] = useState(false);
  const handleClick = () => {
    history.push("/login");
  };
  const handleSubmit = async (e: any) => {
    setLoadingRegistration(true);
    try {
      // console.log("✔️attempt registration!", e);
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
      if (response.status === 409) {
        setLoadingRegistration(false);
      } else {
        localStorage.setItem("token", accessToken);
        setRefreshToken(refreshToken);
        setTimeout(() => history.push("/"), 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container fluid>
      <Row className='registration-form px-1'>
        <Col
          sm={4}
          className='col-12 col-sm-8 col-md-6 col-lg-4 px-0 register-form__col'>
          <Card className='bamboo-card px-4 pb-0 pt-1 m-0' id='register-card'>
            <Card.Body>
              <h1 className='pb-1 align-left'>Join Bamboo</h1>
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
                    <Form.Group
                      as={Row}
                      controlId='first_name'
                      className='py-1'>
                      <Form.Label column sm='3' className="align-left">
                        First name
                      </Form.Label>
                      <Col>
                        <InputGroup hasValidation>
                          <Form.Control
                            type='text'
                            placeholder={errors.first_name||'Jane'}
                            aria-describedby='first name'
                            name='first_name'
                            value={values.first_name}
                            onChange={handleChange}
                            isInvalid={!!errors.first_name}
                          />
                        </InputGroup>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId='last_name' className='py-1'>
                      <Form.Label column sm='3' className="align-left">
                        Last name
                      </Form.Label>
                      <Col>
                        <InputGroup hasValidation>
                          <Form.Control
                            type='text'
                            placeholder={errors.last_name||'Doe'}
                            aria-describedby='Last name'
                            name='last_name'
                            value={values.last_name}
                            onChange={handleChange}
                            isInvalid={!!errors.last_name}
                          />
                        </InputGroup>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId='username' className='py-1'>
                      <Form.Label column sm='3' className="align-left">
                        Username
                      </Form.Label>
                      <Col>
                        <InputGroup hasValidation>
                          <Form.Control
                            type='text'
                            placeholder={errors.username||'janedoe'}
                            aria-describedby='username'
                            name='username'
                            value={values.username}
                            onChange={handleChange}
                            isInvalid={!!errors.username}
                          />
                        </InputGroup>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId='email' className='py-1'>
                      <Form.Label column sm='3' className="align-left">
                        Email
                      </Form.Label>
                      <Col>
                        <InputGroup hasValidation>
                          <Form.Control
                            type='email'
                            placeholder={errors.email||'janedoe@email.com'}
                            aria-describedby='email'
                            name='email'
                            value={values.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                          />
                        </InputGroup>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId='password' className='py-1'>
                      <Form.Label column sm='3' className="align-left">
                        Password
                      </Form.Label>
                      <Col>
                        <InputGroup hasValidation>
                          <Form.Control
                            type='text'
                            placeholder={errors.password||'********'}
                            aria-describedby='password'
                            name='password'
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                          />
                        </InputGroup>
                      </Col> 
                    </Form.Group>
                    {loadingRegistration ? (
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
