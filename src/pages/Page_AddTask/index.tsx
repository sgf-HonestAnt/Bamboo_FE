import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { followedUserInt, SetTask } from "../../typings/interfaces";
import { MdOutlinePsychology } from "react-icons/md";
import "./styles.css";

type AddTaskProps = {
  categories: string[];
  followedUsers: followedUserInt[];
};

const AddTask = (props: AddTaskProps) => {
  const { categories, followedUsers } = props;
  // categories
  const [showCategoryDrop, setShowCategoryDrop] = useState(true);
  const [showCategory, setShowCategory] = useState(false);
  // other options
  // does it repeat?
  const [showRepeat, setShowRepeat] = useState(true);
  // ➡️ changeRepeated
  // if yes, how often?
  const [showHowOften, setShowHowOften] = useState(false);
  // ➡️ changeHowOften
  // if other, how many days?
  const [showOther, setShowOther] = useState(false);
  // ➡️ changeOtherRep
  // OR
  // if no, is it shared?
  const [showShared, setShowShared] = useState(false);
  // ➡️ changeShared
  // if yes, who with?
  const [showSharedWith, setShowSharedWith] = useState(false);
  // ➡️ changeSharedWith

  const [otherRep, setOtherRep] = useState(false);
  const [validated, setValidated] = useState(false);
  const [newCateg, setNewCateg] = useState(false);
  const [task, setTask] = useState<SetTask>({
    category: "",
    title: "",
    descrip: "",
    value: 0,
    repeats: "",
    sharedWith: [],
  });
  const changeSettings = (e: { target: { id: any; value: any } }) => {
    const id = e.target.id;
    const value = e.target.value;
    setTask({
      ...task,
      [id]: value,
    });
  };
  const changeCategory = (e: { target: { value: string } }) => {
    const value = e.target.value;
    if (value === "new") {
      setShowCategory(true);
      setShowCategoryDrop(false);
    } else {
      setTask({
        ...task,
        category: value,
      });
    }
  };
  const changeRepeated = (e: { target: { value: string } }) => {
    const value = e.target.value;
    console.log(value);
    if (value === "yes") {
      setShowHowOften(true);
      setShowRepeat(false);
    } else {
      setShowShared(true);
      setShowRepeat(false);
      setTask({
        ...task,
        repeats: value,
      });
    }
  };
  const changeHowOften = (e: { target: { value: any } }) => {
    const value = e.target.value;
    console.log(value);
    if (value === "other") {
      setShowOther(true);
      setShowHowOften(false);
    } else {
      setTask({
        ...task,
        repeats: value,
      });
    }
  };
  const changeOtherRep = (e: { target: { value: any } }) => {
    const value = e.target.value;
    console.log(value);
    setTask({
      ...task,
      repeats: value,
    });
  };
  const changeShared = (e: { target: { value: any } }) => {
    const value = e.target.value;
    console.log(value);
    if (value === "yes") {
      setShowSharedWith(true);
      setShowShared(false);
    }
  };
  const changeSharedWith = (e: { target: { value: any } }) => {
    const value = e.target.value;
    console.log(value);
    const array = task.sharedWith
    !task.sharedWith.includes(value) ? array.push(value) : array.filter(v=>v!==value)
    console.log(array)
    setTask({
      ...task,
      sharedWith: array,
    });
  };
  const addTask = (e: {
    currentTarget: any;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log(task);
    setValidated(true);
  };
  console.log(task);
  return (
    <Row className='add-task-page p-2'>
      <Col sm={6}>
        <Form noValidate validated={validated} onSubmit={addTask}>
          {/* title */}
          <Form.Group controlId='title'>
            <Form.Label>What's the name of this task?</Form.Label>
            <Form.Control
              required
              type='text'
              value={task.title}
              placeholder='Name the task'
              onChange={changeSettings}
              aria-describedby='titleHelpBlock'
            />
            <Form.Text id='titleHelpBlock' muted>
              Alternatively, you can create a new category.
            </Form.Text>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          {/* value */}
          <Form.Group controlId='value'>
            <Form.Label>How hard is it?</Form.Label>
            <Form.Control
              as='select'
              onChange={changeSettings}
              aria-describedby='valueHelpBlock'>
              <option value='' disabled selected>
                Select a value
              </option>
              <option value={10} selected={task.value === 10}>
                10XP: it's a piece of cake!
              </option>
              <option value={20} selected={task.value === 20}>
                20XP:
              </option>
              <option value={30} selected={task.value === 30}>
                30XP:
              </option>
              <option value={40} selected={task.value === 40}>
                40XP:
              </option>
              <option value={50} selected={task.value === 50}>
                50XP:
              </option>
            </Form.Control>
            <Form.Text id='valueHelpBlock' muted>
              Alternatively, you can create a new category.
            </Form.Text>
          </Form.Group>
          {/* category */}
          {showCategoryDrop && (
            <Form.Group controlId='category'>
              <Form.Label>What's the category?</Form.Label>
              <Form.Control
                as='select'
                onChange={changeCategory}
                aria-describedby='categoryHelpBlock'>
                <option value='' disabled selected>
                  Select a category
                </option>
                <option
                  value='household'
                  selected={task.category === "household"}>
                  household
                </option>
                <option value='work' selected={task.category === "work"}>
                  work
                </option>
                <option
                  value='relationships'
                  selected={task.category === "relationships"}>
                  relationships
                </option>
                <option
                  value='well-being'
                  selected={task.category === "well-being"}>
                  well-being
                </option>
                <option value='' disabled>
                  -------
                </option>
                {categories
                  .filter((c) => c !== "none")
                  .sort()
                  .map((c, i) => {
                    return (
                      <option key={i} value={c} selected={task.category === c}>
                        {c}
                      </option>
                    );
                  })}
                <option value='new' selected={task.category === "new"}>
                  create new category
                </option>
              </Form.Control>
              <Form.Text id='categoryHelpBlock' muted>
                Alternatively, you can create a new category.
              </Form.Text>
            </Form.Group>
          )}
          {/* new category */}
          {showCategory && (
            <Form.Group controlId='category'>
              <Form.Label>Name your category</Form.Label>
              <Form.Control
                required
                type='text'
                value={task.category}
                placeholder='Name the category'
                onChange={changeSettings}
                aria-describedby='newCategoryHelpBlock'
              />
              <Form.Text id='newCategoryHelpBlock' muted>
                Alternatively, you can create a new category.
              </Form.Text>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          )}
          {/* description */}
          <Form.Group controlId='descrip'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Provide more details'
              onChange={changeSettings}
              aria-describedby='descripHelpBlock'
            />
            <Form.Text id='descripHelpBlock' muted>
              Alternatively, you can create a new category.
            </Form.Text>
          </Form.Group>
          {/* image */}
          <Form.Group controlId='image' className='mb-3'>
            <Form.Label>Does the task have an image?</Form.Label>
            <Form.Control type='file' />
          </Form.Group>
          {/* repeated */}
          {showRepeat && (
            <Form.Group controlId='repeated'>
              <Form.Label>Does it repeat?</Form.Label>
              <div className='mb-3'>
                <Form.Check
                  inline
                  label='yes'
                  name='group1'
                  type='radio'
                  value='yes'
                  onChange={changeRepeated}
                />
                <Form.Check
                  inline
                  label='no'
                  name='group1'
                  type='radio'
                  value='no'
                  onChange={changeRepeated}
                />
              </div>
            </Form.Group>
          )}
          {showHowOften && (
            <Form.Group controlId='repeats'>
              <Form.Label>How often?</Form.Label>
              <div className='mb-3'>
                <Form.Check
                  inline
                  label='daily'
                  name='group1'
                  type='radio'
                  value='daily'
                  onChange={changeHowOften}
                />
                <Form.Check
                  inline
                  label='weekly'
                  name='group1'
                  type='radio'
                  value='weekly'
                  onChange={changeHowOften}
                />
                <Form.Check
                  inline
                  label='monthly'
                  name='group1'
                  type='radio'
                  value='monthly'
                  onChange={changeHowOften}
                />
                <Form.Check
                  inline
                  label='other'
                  name='group1'
                  type='radio'
                  value='other'
                  onChange={changeHowOften}
                />
              </div>
            </Form.Group>
          )}
          {showOther && (
            <Form.Group controlId='repeats'>
              <div>
                Task repeats every
                <input
                  type='number'
                  min='2'
                  max='100'
                  onChange={changeOtherRep}
                />
                days
              </div>
            </Form.Group>
          )}
          {showShared && (
            <Form.Group controlId='sharedWith'>
              <Form.Label>Is it shared?</Form.Label>
              <div className='mb-3'>
                <Form.Check
                  inline
                  label='yes'
                  name='group1'
                  type='radio'
                  value='yes'
                  onChange={changeShared}
                />
                <Form.Check
                  inline
                  label='no'
                  name='group1'
                  type='radio'
                  value='no'
                  onChange={changeShared}
                />
              </div>
            </Form.Group>
          )}
          {showSharedWith && (
            <Form.Group controlId='sharedWith'>
              <Form.Label>Choose up to 3</Form.Label>
              <Form.Control
                as='select'
                multiple
                onChange={changeSharedWith}
                aria-describedby='sharedWithHelpBlock'>
                <option value='' disabled selected>
                  Select a username
                </option>
                {followedUsers.map((u, i) => (
                  <option
                    key={i}
                    value={u._id}
                    selected={task.sharedWith.includes(u._id)}>                  
                    {u.username}
                  </option>
                ))}
              </Form.Control>
              <Form.Text id='sharedWithHelpBlock' muted>
                Alternatively, you can create a new category.
              </Form.Text>
            </Form.Group>
          )}
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
