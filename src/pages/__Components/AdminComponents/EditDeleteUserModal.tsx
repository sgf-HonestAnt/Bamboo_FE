import { useState } from "react";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";
import { userInt } from "../../../typings/interfaces";
import { USERS } from "../../../utils/const/str";

interface EditDeleteUserModalProps extends userInt {
  handleClose: any;
  show: boolean;
  setForm: any;
  setDeleteOption: any;
  showDeleteWarning: boolean;
}

const EditDeleteUserModal = (props: EditDeleteUserModalProps) => {
  const { handleClose, show, setForm, setDeleteOption, showDeleteWarning } =
    props;
  const [modalForm, setModalForm] = useState({
    first_name: props.first_name,
    last_name: props.last_name,
    username: props.username,
    email: props.email,
    bio: props.bio,
    level: props.level,
  });
  const handleChange = (e: { target: { id: any; value: any } }) => {
    const id = e.target.id;
    const value = e.target.value;
    setModalForm({ ...modalForm, [id]: value });
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  const handleCloseModal = () => {
    setForm({ dropdown: USERS, id: "", search: "" });
    setDeleteOption({ show: false, id: "" });
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      {showDeleteWarning ? (
        <>
          <Modal.Header>
            <Modal.Title>Delete '{props.username}'</Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
          <Modal.Footer></Modal.Footer>
        </>
      ) : (
        <>
          <Modal.Header>
            <Modal.Title>Edit '{props.username}'</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} controlId='first_name' className='pb-1'>
                <Form.Label column sm={3}>
                  First name
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type='text'
                    value={modalForm.first_name}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId='last_name' className='pb-1'>
                <Form.Label column sm={3}>
                  Last name
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type='text'
                    value={modalForm.last_name}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId='username' className='pb-1'>
                <Form.Label column sm={3}>
                  Username
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type='text'
                    value={modalForm.username}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId='email' className='pb-1'>
                <Form.Label column sm={3}>
                  Email
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type='email'
                    value={modalForm.email}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId='bio' className='pb-1'>
                <Form.Label column sm={3}>
                  Bio
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type='text'
                    value={modalForm.bio}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={handleSubmit} disabled>
              Edit user
            </Button>
            <Button variant='secondary' onClick={handleCloseModal}>
              Go back
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default EditDeleteUserModal;
