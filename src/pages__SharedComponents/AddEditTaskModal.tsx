import { useState } from "react";
import { History, Location } from "history";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { followedUserInt, userInt } from "../typings/interfaces";
import { setUserLoading } from "../redux/actions/user";
import { TASK_CATEGORIES, TASK_VALUES } from "../utils/appConstants";
import { getMinMaxDateAsString } from "../utils/f_dates";
import { attemptPostTask } from "../utils/f_tasks";
import BambooPoints from "./XP";

type AddEditTaskModalProps = {
  show: any;
  handleClose: any;
  taskId?: string;
  user: userInt;
  followedUsers: followedUserInt[];
  categories: string[];
  history: History<unknown> | string[];
  location: Location<unknown>;
};
type FormProps = {
  title: string;
  value: number;
  category: string;
  newCategory: string | undefined;
  desc: string;
  repeated: string;
  repeats: string;
  repeatsOther: number;
  repetitions: string;
  shared: string;
  sharedWith: string[];
  deadline: string;
};
const AddEditTaskModal = (props: AddEditTaskModalProps) => {
  const {
    show,
    handleClose,
    taskId,
    user,
    followedUsers,
    categories,
    history,
    location,
  } = props;
  const { refreshToken } = user;
  const dispatch = useDispatch();
  const { min, max } = getMinMaxDateAsString(new Date());
  // console.log(min, max);
  const [form, setForm] = useState<FormProps>({
    title: "",
    value: 0,
    category: "",
    newCategory: "",
    desc: " ",
    repeated: "no",
    repeats: "never",
    repeatsOther: 0,
    repetitions: "0",
    shared: "no",
    sharedWith: [],
    deadline: "",
  });
  const [showNewCat, setShowNewCat] = useState(false);
  const [showRepeat, setShowRepeat] = useState(true);
  const [showRepeatOptions, setShowRepeatOptions] = useState(false);
  const [showOtherRepeat, setShowOtherRepeat] = useState(false);
  const [showShared, setShowShared] = useState(false);
  const [showSharedDropdown, setShowSharedDropdown] = useState(false);
  // console.log(
  //   { showNewCat },
  //   { showRepeatOptions },
  //   { showOtherRepeat },
  //   { showShared },
  //   { showSharedDropdown }
  // );
  const handleChange = (e: { target: { id: any; value: any } }) => {
    const id = e.target.id;
    const value = e.target.value;
    if (id === "category" && value === "new") {
      setShowNewCat(true);
      setForm({ ...form, [id]: value });
    } else if (id === "repeated" && value === "yes") {
      setForm({
        ...form,
        repeated: "yes",
        repeats: "daily",
        repetitions: "28",
      });
      setShowRepeat(false);
      setShowRepeatOptions(true);
    } else if (id === "repeated" && value === "no") {
      setShowRepeat(false);
      setShowShared(true);
    } else if (id === "repeats" && value === "never") {
      setForm({ ...form, repeated: "no", repeats: "never", repetitions: "0" });
    } else if (id === "repeats" && value === "other") {
      setForm({ ...form, repeatsOther: 2, repetitions: "0" });
      setShowRepeatOptions(false);
      setShowOtherRepeat(true);
    } else if (id === "repeats" && value === "daily") {
      setForm({
        ...form,
        repeated: "yes",
        repeats: "daily",
        repetitions: "28",
      });
    } else if (id === "repeats" && value === "weekly") {
      setForm({
        ...form,
        repeated: "yes",
        repeats: "weekly",
        repetitions: "20",
      });
    } else if (id === "repeats" && value === "monthly") {
      setForm({
        ...form,
        repeated: "yes",
        repeats: "monthly",
        repetitions: "12",
      });
    } else if (id === "shared" && value === "yes") {
      setShowShared(false);
      setShowSharedDropdown(true);
      setForm({ ...form, shared: "yes" });
    } else if (id === "sharedWith") {
      const array = [];
      array.push(value); 
      setForm({ ...form, sharedWith: array });
    } else {
      setForm({ ...form, [id]: value });
    }
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(form);
    try {
      const { _id } = await attemptPostTask(
        form,
        refreshToken,
        history,
        location
      );
      console.log("CREATED NEW TASK", _id);
      setForm({
        title: "",
        value: 0,
        category: "",
        newCategory: "",
        desc: " ",
        repeated: "no",
        repeats: "never",
        repeatsOther: 0,
        repetitions: "0",
        shared: "no",
        sharedWith: [],
        deadline: "",
      });
      setShowNewCat(false);
      setShowRepeat(true);
      setShowRepeatOptions(false);
      setShowOtherRepeat(false);
      setShowShared(false);
      setShowSharedDropdown(false);
      handleClose();
      dispatch(setUserLoading(true));
      // NEED TO RELOAD
      history.push("/dash")
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseModal = () => {
    setForm({
      title: "",
      value: 0,
      category: "",
      newCategory: "",
      desc: " ",
      repeated: "no",
      repeats: "never",
      repeatsOther: 0,
      repetitions: "0",
      shared: "no",
      sharedWith: [],
      deadline: "",
    });
    setShowNewCat(false);
    setShowRepeat(true);
    setShowRepeatOptions(false);
    setShowOtherRepeat(false);
    setShowShared(false);
    setShowSharedDropdown(false);
    handleClose();
  };
  if (taskId) {
    console.log(taskId);
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Add new task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='title' className='py-2'>
            <Form.Label>What's the name of this task?</Form.Label>
            <Form.Control
              required
              type='text'
              value={form.title}
              placeholder='for e.g. "Solve World Hunger"'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId='value' className='py-2'>
            <Form.Label>
              How many Bamboo Points <BambooPoints /> is it worth?
            </Form.Label>
            <Form.Control
              required
              as='select'
              onChange={handleChange}
              defaultValue={"DEFAULT"}
              aria-describedby='valueHelpBlock'>
              <option value='DEFAULT' disabled>
                Select a value
              </option>
              {TASK_VALUES.map((script, i) => {
                let value = 10 * (i + 1);
                return (
                  <option
                    key={i}
                    value={value}
                    //   selected={form.value === value}
                  >
                    {value}XP: {script}
                  </option>
                );
              })}
            </Form.Control>
            <Form.Text id='valueHelpBlock' muted>
              Bamboo Points can be spent on future rewards.
            </Form.Text>
          </Form.Group>
          {!showNewCat ? (
            <Form.Group controlId='category'>
              <Form.Label>What's the category?</Form.Label>
              <Form.Control
                required
                as='select'
                onChange={handleChange}
                defaultValue={"DEFAULT"}>
                <option value='DEFAULT' disabled>
                  Select a category
                </option>
                {TASK_CATEGORIES.map((c) => (
                  <option
                    key={c}
                    value={c}
                    //   selected={form.category === c}
                  >
                    {c}
                  </option>
                ))}
                <option value='' disabled>
                  -------
                </option>
                {categories
                  .filter((c) => c !== "none" && !TASK_CATEGORIES.includes(c))
                  .sort()
                  .map((c, i) => {
                    return (
                      <option
                        key={i}
                        value={c}
                        //   selected={form.category === c}
                      >
                        {c}
                      </option>
                    );
                  })}
                <option
                  value='new'
                  // selected={form.category === "new"}
                >
                  create new category
                </option>
              </Form.Control>
            </Form.Group>
          ) : (
            <Form.Group controlId='newCategory' className='py-2'>
              <Form.Label>Create new category</Form.Label>
              <Form.Control
                required
                type='text'
                value={form.newCategory}
                placeholder='for e.g. "Knitting"'
                onChange={handleChange}
              />
            </Form.Group>
          )}
          <Form.Group controlId='desc' className='py-2'>
            <Form.Label>Describe this task (optional)</Form.Label>
            <Form.Control
              required
              as='textarea'
              rows={2}
              placeholder='for e.g. "Put food before trade, find balance with nature&apos;s systems"'
              onChange={handleChange}
            />
          </Form.Group>
          {showRepeat ? (
            <Form.Group controlId='repeated'>
              <Form.Label>Does it repeat?</Form.Label>
              <div className='mb-3'>
                <Form.Check
                  inline
                  label='yes'
                  name='group1'
                  type='radio'
                  value='yes'
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label='no'
                  name='group1'
                  type='radio'
                  value='no'
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          ) : showRepeatOptions ? (
            <Form.Group controlId='repeats' aria-describedby='repeatsHelpBlock'>
              <Form.Label>How often?</Form.Label>
              <div className='mb-3'>
                <Form.Check
                  inline
                  label='daily*'
                  name='group1'
                  type='radio'
                  value='daily'
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label='weekly*'
                  name='group1'
                  type='radio'
                  value='weekly'
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label='monthly*'
                  name='group1'
                  type='radio'
                  value='monthly'
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label='other'
                  name='group1'
                  type='radio'
                  value='other'
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label='never'
                  name='group1'
                  type='radio'
                  value='never'
                  onChange={handleChange}
                />
                <Form.Text id='repeatsHelpBlock' muted>
                  * If set to repeat, tasks will be created for 28 days, 10
                  weeks or 12 months by default. Don't want this? Select 'other'
                  and choose the number of repeats!
                </Form.Text>
              </div>
              <div></div>
            </Form.Group>
          ) : showOtherRepeat ? (
            <Row>
              <Col>Task repeats</Col>
              <Col>
                <Form.Group controlId='repeatsOther'>
                  <Form.Control
                    as='select'
                    onChange={handleChange}
                    defaultValue='2'>
                    <option value='1'>Daily</option>
                    <option value='7'>Weekly</option>
                    <option value='28'>Monthly</option>
                    <option value='2'>Every other day</option>
                    <option value='3'>Every third day</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col sm={12}>
                <Form.Group as={Row} controlId='repetitions'>
                  <Col>
                    To a total of{" "}
                    <Form.Control
                      type='text'
                      onChange={handleChange}
                      value={form.repetitions}></Form.Control>
                    repetitions
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          ) : (
            <></>
          )}
          {showShared ? (
            <Form.Group controlId='shared'>
              <Form.Label>Is it shared?</Form.Label>
              <div className='mb-3'>
                <Form.Check
                  inline
                  label='yes'
                  name='group1'
                  type='radio'
                  value='yes'
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label='no'
                  name='group1'
                  type='radio'
                  value='no'
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          ) : showSharedDropdown ? (
            <Form.Group controlId='sharedWith'>
              <Form.Label>Who would you like to share it with?</Form.Label>
              <Form.Control
                required
                as='select'
                onChange={handleChange}
                aria-describedby='sharedWithHelpBlock'
                defaultValue={"DEFAULT"}>
                <option value='DEFAULT' disabled>
                  Select a user
                </option>
                {followedUsers.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.username}
                  </option>
                ))}
              </Form.Control>
              {followedUsers.length < 1 && (
                <Form.Text id='sharedWithHelpBlock' muted>
                  No one to share with? Add users at the 'following' page.
                </Form.Text>
              )}
            </Form.Group>
          ) : (
            <></>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={handleSubmit}>
          Save task
        </Button>
        <Button variant='secondary' onClick={handleCloseModal}>
          Go back
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditTaskModal;
