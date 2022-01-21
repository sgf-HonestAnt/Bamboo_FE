import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
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
import { attemptLoginUser } from "../../utils/funcs/f_users";
import { LoginBtn, SubmitBtn } from "../__Components/Buttons";
import "./styles.css";

const schema = yup.object().shape({
  username: yup.string().required("No email or username provided."),
  password: yup.string().required("No password provided."),
});

export default function LoginPage({ history }: RouteComponentProps) {
  const dispatch = useDispatch();
  const [loadingLoginPage, setLoadingLoginPage] = useState(false);
  const [failed, setFailed] = useState(false);
  function handleClick() {
    history.push("/register");
  }
  const handleSubmit = async (e: any) => {
    setLoadingLoginPage(true);
    const loggedIn = await attemptLoginUser(e, setLoadingLoginPage, dispatch);
    loggedIn ? history.push("/") : setFailed(true);
  };
  console.log("LOGIN PAGE");
  return (
    <Container fluid>
      <Row className='login-form px-5'>
        <Col
          className={`col-12 col-sm-8 col-md-6 col-lg-4 px-0 login-form__col`}>
          <Card>
            <Card.Body>
              <h1>Login to Bamboo</h1>
              <Formik
                validationSchema={schema}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    handleSubmit(values);
                    setSubmitting(false);
                  }, 400);
                }}
                initialValues={{
                  username: "",
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
                  <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId='username'>
                      <Form.Label column sm={12}>
                        Email or username
                      </Form.Label>
                      <Col sm={12}>
                        <InputGroup hasValidation>
                          <Form.Control
                            type='text'
                            value={values.username}
                            placeholder='Enter email or username'
                            aria-describedby='enter email or username'
                            onChange={handleChange}
                            isInvalid={!!errors.username}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.username}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId='password'>
                      <Form.Label column sm='12'>
                        Password
                      </Form.Label>
                      <Col sm='12'>
                        <InputGroup hasValidation>
                          <Form.Control
                            type='password'
                            value={values.password}
                            placeholder='Enter password'
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.password}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                    </Form.Group>
                    <div className='my-2 login-form__failed-text'>
                      {failed ? "Login failed." : ""}
                    </div>
                    {loadingLoginPage ? (
                      <Spinner animation='grow' className='my-4' />
                    ) : (
                      <div className='py-3'>
                        <SubmitBtn variant='secondary' />
                        <LoginBtn
                          variant='secondary'
                          label='Register instead?'
                          handleClick={handleClick}
                        />
                      </div>
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
