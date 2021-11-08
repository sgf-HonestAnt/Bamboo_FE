import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { followedUserInt } from "../../typings/interfaces";
import "./styles.css";

type AddTaskProps = {
  categories: string[];
  followedUsers: followedUserInt[];
};

const AddTask = (props: AddTaskProps) => {
  const { categories, followedUsers } = props;
  const [statusToShow, setStatusToShow] = useState({
    category: "",
    title: "",
    descrip: "",
    value: "",
    sharedWith: [],
    repeat: "",
  });
  const changeTitle = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setStatusToShow({
      ...statusToShow,
      title: value,
    });
  };
  const changeDescrip = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setStatusToShow({
      ...statusToShow,
      descrip: value,
    });
  };
  const changeCategory = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setStatusToShow({
      ...statusToShow,
      category: value,
    });
  };
  const changeRepeat = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setStatusToShow({
      ...statusToShow,
      repeat: value,
    });
  };
  const changeValue = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setStatusToShow({
      ...statusToShow,
      value: value,
    });
  };
  // const changeShared = (e: { target: { value: any } }) => {
  //   console.log(e.target.value);
  // };
  const addTask = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(statusToShow);
  };
  return (
    <Row className='add-task-page p-2'>
      <Col sm={6}>
        <Form onSubmit={addTask}>
          {/* title */}
          <Form.Group controlId='exampleForm.ControlInput1'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              value={statusToShow.title}
              placeholder='...'
              onChange={changeTitle}
            />
          </Form.Group>
          <Form.Group controlId='exampleForm.ControlInput1'>
            <Form.Label>Value</Form.Label>
            <Form.Control
              type='text' //this should be number.
              value={statusToShow.value}
              placeholder='0'
              onChange={changeValue}
            />
          </Form.Group>
          {/* category */}
          <Form.Group controlId='exampleForm.Category'>
            <Form.Label>Category</Form.Label>
            <Form.Control as='select' onChange={changeCategory}>
              <option value='none' selected={statusToShow.category === "none"}>
                none
              </option>
              {categories
                .filter((c) => c !== "none")
                .sort()
                .map((c, i) => {
                  return (
                    <option
                      key={i}
                      value={c} // make all categories lower case in backend.
                      selected={statusToShow.category === c}>
                      {c}
                    </option>
                  );
                })}
            </Form.Control>
          </Form.Group>
          {/* description */}
          <Form.Group controlId='exampleForm.ControlInput1'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={statusToShow.descrip}
              placeholder='...'
              onChange={changeDescrip}
            />
          </Form.Group>
          {/* image */}
          {/* <Form.File id='custom-file' label='Custom file input' custom /> */}
          {/* shared with */}
          {/* <Form.Group controlId='exampleForm.ControlSelect2'>
            <Form.Label>Share with</Form.Label>
            <Form.Control as='select' multiple onChange={changeShared}>
              {followedUsers.map((f, i) => (
                <option
                  key={i}
                  value={f._id}
                  selected={statusToShow.sharedWith.includes(f._id)}>
                  {f.username}
                </option>
              ))}
            </Form.Control>
          </Form.Group> */}
          <Form.Group controlId='exampleForm.Category'>
            <Form.Label>Does it repeat?</Form.Label>
            <Form.Control as='select' onChange={changeRepeat}>
              <option value='never' selected={statusToShow.repeat === "never"}>
                never
              </option>
              <option value='daily' selected={statusToShow.repeat === "daily"}>
                daily
              </option>
            </Form.Control>
          </Form.Group>
          <br />
          {/* <br />
          <label htmlFor='deadline'>Deadline</label>
          <input
            type='date'
            id='deadline'
            name='deadline'
            value='2018-07-22'
            min='2018-01-01'
            max='2018-12-31'
          />{" "}
          <br /> */}
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default AddTask;
