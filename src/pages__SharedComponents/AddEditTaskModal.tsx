import { History, Location } from "history";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import {
  beautifulDnD,
  followedUserInt,
  reduxStateInt,
  taskInt,
  userInt,
} from "../typings/interfaces";
import {
  NEVER,
  NONE,
  TASK_CATEGORIES,
  TASK_VALUES,
} from "../utils/appConstants";
import { setNewCategory, setNewTask } from "../redux/actions/tasks";
import { getMinMaxDateAsString, getShortDateAsString } from "../utils/f_dates";
import { attemptPostTask } from "../utils/f_tasks";
import BambooPoints from "./XP";
import { getUsernameById } from "../utils/f_users";
import { XButton } from "./Buttons";
import { ICOUSER } from "../utils/appIcons";
import { setUserLoading } from "../redux/actions/user";

type AddEditTaskModalProps = {
  show: any;
  handleClose: any;
  taskId?: string;
  user: userInt;
  followedUsers: followedUserInt[];
  categories: string[];
  history: History<unknown> | string[];
  location: Location<unknown>;
  initialData?: beautifulDnD;
  setInitialData?: any;
  taskSet: taskInt | null;
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
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user, followedUsers } = state.currentUser;
  const { categories } = state.currentTasks;
  const {
    show,
    handleClose,
    taskId,
    history,
    location,
    initialData,
    setInitialData,
    taskSet,
  } = props;
  // console.log(taskSet);
  const { refreshToken } = my_user;
  const dispatch = useDispatch();
  const { min, max } = getMinMaxDateAsString(new Date());
  const [form, setForm] = useState<FormProps>({
    title: taskSet ? taskSet.title : "",
    value: taskSet ? taskSet.value : 0,
    category: taskSet ? taskSet.category : "",
    newCategory: "",
    desc: taskSet ? taskSet.desc : " ",
    repeated: "no",
    repeats: taskSet ? taskSet.repeats : "never",
    repeatsOther: 0,
    repetitions: "0",
    shared: "no",
    sharedWith: taskSet ? taskSet.sharedWith! : [],
    deadline: taskSet ? taskSet.deadline! : "",
  });
  // const [sharedUsers, setSharedUsers] = useState<string[]>([])
  const [showNewCat, setShowNewCat] = useState(false);
  const [showRepeat, setShowRepeat] = useState(true);
  const [showRepeatOptions, setShowRepeatOptions] = useState(false);
  const [showOtherRepeat, setShowOtherRepeat] = useState(false);
  const [showShared, setShowShared] = useState(false);
  const [showSharedDropdown, setShowSharedDropdown] = useState(false);
  const removeUserFromShared = (e: {
    preventDefault: () => void;
    target: { value: any };
  }) => {
    e.preventDefault();
    const value = e.target.value;
    const updatedSharedUsers = form.sharedWith.filter((u_id) => u_id !== value);
    setForm({ ...form, sharedWith: updatedSharedUsers });
  };
  const handleChange = (e: { target: { id: any; value: any } }) => {
    const id = e.target.id;
    const value = e.target.value;
    if (id === "category" && value === "new") {
      setShowNewCat(true);
      setForm({ ...form, [id]: value });
    } else if (id === "newCategory") {
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
      const array = form.sharedWith;
      array.push(value.split("/")[0]);
      setForm({ ...form, sharedWith: array });
    } else {
      setForm({ ...form, [id]: value });
    }
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const newTask = await attemptPostTask(
        form,
        refreshToken,
        history,
        location
      );
      dispatch(setNewTask(newTask));
      if (
        !TASK_CATEGORIES.includes(newTask.category.toLowerCase()) &&
        !categories.includes(newTask.category.toLowerCase())
      ) {
        categories.push(newTask.category.toLowerCase());
        setNewCategory(categories);
      }
      if (initialData) {
        // TASKS PAGE
        initialData.tasks.push(newTask); // push new task to list of tasks
        initialData.lists[0].taskIds.push(newTask._id); // push new id to awaited taskIds
        const newData = {
          ...initialData,
          tasks: [...initialData.tasks!],
          lists: [...initialData.lists!],
        };
        setInitialData(newData);
      }
      const { repeats, repeatsOther } = form;
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
      if (repeatsOther !== 0 || repeats !== "never") {
        console.log("TRYING TO REFRESH");
        dispatch(setUserLoading(true));
      }
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
    // console.log(taskId);
  }
  // console.log(taskSet);
  console.log(form);
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
              placeholder={
                form.title ? form.title : 'for e.g. "Solve World Hunger"'
              }
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
              defaultValue={taskSet ? taskSet.value : "DEFAULT"}
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
                defaultValue={taskSet ? taskSet.category : "DEFAULT"}>
                <option value='DEFAULT' disabled>
                  Select a category
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
                <option value={NONE}>{NONE}</option>
                <option value='' disabled>
                  -------
                </option>
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
              placeholder={
                taskSet
                  ? taskSet.desc
                  : 'for e.g. "Put food before trade, find balance with nature&apos;s systems"'
              }
              onChange={handleChange}
            />
          </Form.Group>
          {!taskSet && (
            <Form.Group controlId='deadline' className='py-2'>
              <Form.Label>Give it a deadline (optional)</Form.Label>
              <Form.Control
                type='date'
                min={min}
                max={max}
                onChange={handleChange}
              />
            </Form.Group>
          )}
          {taskSet ? (
            <ul>
              {taskSet.repeats === NEVER ? (
                <li>This task is never repeated.</li>
              ) : (
                <li>This task is repeated {taskSet.repeats}.</li>
              )}
              {taskSet.deadline ? (
                <li>
                  This task is due on {getShortDateAsString(taskSet.deadline)}
                </li>
              ) : (
                <li>This task is due any time.</li>
              )}
              {taskSet.sharedWith && taskSet.sharedWith.length > 1 ? (
                <>
                  <li>Any edits you make will be shared with</li>
                  <div className='ml-3'>
                    {taskSet.sharedWith
                      .filter((id) => id !== my_user._id)
                      .map((id, i) => {
                        const username = getUsernameById(followedUsers, id);
                        return (
                          <div key={i}>
                            <ICOUSER /> {username}
                          </div>
                        );
                      })}
                  </div>
                </>
              ) : (
                <li>This task is not shared.</li>
              )}
            </ul>
          ) : showRepeat ? (
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
              {form.sharedWith.length > 0 && (
                <Form.Text>
                  {form.sharedWith.map((id) => {
                    const username = getUsernameById(followedUsers, id);
                    return (
                      <span className='mr-3' key={id}>
                        {username}{" "}
                        <XButton
                          value={id}
                          handleClick={removeUserFromShared}
                        />
                      </span>
                    );
                  })}
                </Form.Text>
              )}
              <Form.Control
                required
                as='select'
                onChange={handleChange}
                aria-describedby='sharedWithHelpBlock'
                defaultValue={["DEFAULT"]}
                multiple>
                <option value='DEFAULT' disabled>
                  Select a user
                </option>
                {followedUsers.map((u) => (
                  <option key={u._id} value={`${u._id}/${u.username}`}>
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
