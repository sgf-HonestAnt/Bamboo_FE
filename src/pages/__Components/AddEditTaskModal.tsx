import { History, Location } from "history";
import { Formik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { Modal, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import {
  beautifulDnD,
  followedUserInt,
  reduxStateInt,
  taskInt,
  userInt,
} from "../../typings/interfaces";
import {
  EditTask,
  setNewCategory,
  setNewTask,
} from "../../redux/actions/tasks";
import { TASK_VALUES } from "../../utils/const/arr";
import {
  PUT,
  POST,
  NEVER,
  TASK_CATEGORIES,
  TEAM,
  AWAITED,
} from "../../utils/const/str";
import { FiUser } from "react-icons/fi";
import {
  getShortDateAsString,
  getMinMaxDateAsString,
} from "../../utils/funcs/f_dates";
import {
  attemptPostOrEditTask,
  attemptDeleteTask,
  removeSelfFromTask,
} from "../../utils/funcs/f_tasks";
import BambooPoints from "./XP";
import { getAvatarById, getUsernameById } from "../../utils/funcs/f_users";
import { XButton } from "./Buttons";
import { setUserLoading } from "../../redux/actions/user";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("No title provided.")
    .max(30, "Title cannot exceed 30 chars."),
  value: yup
    .number()
    .required("No value provided.")
    .min(10, "No value provided."),
  category: yup
    .string()
    .required("No category provided.")
    .min(1, "No category provided."),
  newCategory: yup.string().max(12, "Category cannot exceed 12 chars."),
  desc: yup.string(),
  repeated: yup.string(),
  repeats: yup.string(),
  repeatsOther: yup.number(),
  repetitions: yup.string().matches(/^(?=.*[0-9])/, "Must be numbers."),
  shared: yup.string(),
  sharedWith: yup.array().of(yup.string()),
  deadline: yup.string(),
});

type AddEditTaskModalProps = {
  view?: any;
  setView?: any;
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
const AddEditTaskModal = (props: AddEditTaskModalProps) => {
  const dispatch = useDispatch();
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { currentTasks, currentUser } = state;
  const { my_user, followedUsers } = currentUser;
  const { categories, awaited, in_progress } = currentTasks;
  const { min, max } = getMinMaxDateAsString(new Date());
  const {
    view,
    setView,
    show,
    handleClose,
    // taskId,
    history,
    location,
    initialData,
    setInitialData,
    taskSet,
  } = props;
  const { refreshToken } = my_user;
  const avatar =
    taskSet && taskSet.createdBy !== my_user._id
      ? getAvatarById(followedUsers, taskSet.createdBy)
      : my_user.avatar;
  // const { min, max } = getMinMaxDateAsString(new Date());
  const [showWarning, setShowWarning] = useState(false);
  const [changed, setChanged] = useState(false);
  const removeUserFromShared = () => {
    console.log("remove user...");
    // e.preventDefault();
    // const value = e.target.value;
    // const updatedSharedUsers = form.sharedWith.filter((u_id) => u_id !== value);
    // setForm({ ...form, sharedWith: updatedSharedUsers });
  };
  const [formToSubmit, setFormToSubmit] = useState({});
  const handleSubmitFormik = async (e: any) => {
    console.log("submitting to post or edit=>", e);
    const { repeatedRadio, repeatsRadio, repeats, repeatsOther } = e;
    try {
      // if (e.category === "") {
      //   e.category = "none";
      // }
      const method = taskSet ? PUT : POST;
      const taskId = taskSet ? taskSet._id : null;
      const newTask = await attemptPostOrEditTask(
        e,
        refreshToken,
        method,
        taskId,
        history,
        location
      );
      console.log("POSTED OR EDITED TASK=>", newTask);
      // if (repeats !== "never") {
      //   history.push(`/reload/${location.pathname}`);
      // } ?????
      if (taskSet) {
        console.log("TASK WAS SET, SO I AM DISPATCHING AN EDIT.");
        const editedStatus = taskSet.status;
        const listOfTasks = editedStatus === AWAITED ? awaited : in_progress;
        const editedListOfTasks = listOfTasks.filter(
          (t) => t._id !== taskSet._id
        );
        editedListOfTasks.push(newTask);
        dispatch(EditTask(editedStatus, editedListOfTasks));
      } else {
        console.log("TASK WAS NOT SET, SO I AM DISPATCHING A NEW TASK.");
        dispatch(setNewTask(newTask));
      }
      if (
        !TASK_CATEGORIES.includes(newTask.category.toLowerCase()) &&
        !categories.includes(newTask.category.toLowerCase())
      ) {
        console.log(
          "THERE WAS A NEW CATEGORY, SO I AM DISPATCHING A NEW CATEGORY."
        );
        categories.push(newTask.category.toLowerCase());
        dispatch(setNewCategory(categories));
      }
      if (initialData) {
        console.log(
          "THERE WAS INITIAL DATA (THIS CAME FROM TASKS PAGE) SO I AM SHUFFLING THAT TOO."
        );
        if (taskSet) {
          const index = initialData.tasks.findIndex(
            (task: taskInt | undefined) => task?._id === taskSet._id
          );
          initialData.tasks[index] = newTask;
        } else {
          initialData.tasks.push(newTask); // push new task to list of tasks
          initialData.lists[0].taskIds.push(newTask._id); // push new id to awaited taskIds
        }
        const newData = {
          ...initialData,
          tasks: [...initialData.tasks!],
          lists: [...initialData.lists!],
        };
        setInitialData(newData);
      }
      if (repeatsOther !== 0 || repeats !== "never") {
        console.log("TASK WAS REPEATED, SO I AM FIRING OFF A RELOAD.");
        // force reload when tasks are repeated
        history.push("/reload");
      } else {
        console.log(
          "TASK WAS NOT REPEATED, SO I AM JUST SETTING MODAL TO !CHANGED AND CLOSING IT."
        );
        handleClose();
        setChanged(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = () => {
    setShowWarning(true);
  };
  const handleEdit = () => {
    setView(false);
  };
  // const removeTaskFromInitialData = async (selectedTask: taskInt) => {
  //   console.log("removing task from initial data");
  //   if (initialData) {
  //     const updatedInitialDataTasks = initialData.tasks.filter(
  //       (task) => task?._id !== selectedTask._id
  //     );
  //     const listIndex = initialData.lists.findIndex(
  //       (list) => list.id === selectedTask.status
  //     );
  //     const indexedList = initialData.lists[listIndex];
  //     const updatedTaskIds = indexedList.taskIds.filter(
  //       (id) => id !== selectedTask._id
  //     );
  //     const updatedList = {
  //       ...indexedList,
  //       taskIds: updatedTaskIds,
  //     };
  //     const updatedInitialDataLists = initialData.lists;
  //     updatedInitialDataLists[listIndex] = updatedList;
  //     const newData = {
  //       ...initialData,
  //       tasks: [...updatedInitialDataTasks!],
  //       lists: [...updatedInitialDataLists!],
  //     };
  //     setInitialData(newData);
  //   }
  // };
  const deleteTask = async () => {
    console.log("deleting task at addedittaskmodal");
    if (taskSet) {
      await attemptDeleteTask(taskSet._id);
      handleClose();
      history.push("/reload?pathname=tasks");
    }
  };
  const removeSelf = async () => {
    console.log("removing task at addedittaskmodal");
    if (taskSet) {
      await removeSelfFromTask(taskSet._id, currentTasks, dispatch);
      handleClose();
      history.push("/reload?pathname=tasks");
    }
  };
  const handleCloseModal = () => {
    setChanged(false);
    handleClose();
  };
  // if (taskId) {
  //   // console.log(taskId);
  // }
  console.log(formToSubmit);
  return (
    <Modal show={show} onHide={handleCloseModal}>
      {taskSet && view ? (
        <>
          <Modal.Header>
            <Modal.Title>
              {taskSet.title} ({taskSet.value}XP)
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              {taskSet.deadline && (
                <li>Deadline: {getShortDateAsString(taskSet.deadline)}</li>
              )}
              {taskSet.category && <li>Category: {taskSet.category}</li>}
              {taskSet.desc && <li>Description: {taskSet.desc}</li>}
              {taskSet.repeats && <li>Repeats: {taskSet.repeats}</li>}
              {taskSet.sharedWith && taskSet.sharedWith.length > 1 ? (
                <li>
                  Shared with:
                  <br />
                  {taskSet.sharedWith
                    .filter((id) => id !== my_user._id)
                    .map((id, i) => {
                      const avatar = getAvatarById(followedUsers, id);
                      const username = getUsernameById(followedUsers, id);
                      return (
                        <div key={i}>
                          <Link to={`/following?id=${id}`}>
                            <img
                              src={avatar}
                              alt={username}
                              className='x-tiny-round mr-1'
                            />
                            {username}
                          </Link>
                        </div>
                      );
                    })}
                </li>
              ) : (
                <li>Shared with: not shared</li>
              )}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={handleEdit}>
              Edit task?
            </Button>
            <Button variant='secondary' onClick={handleCloseModal}>
              No, go back
            </Button>
          </Modal.Footer>
        </>
      ) : showWarning ? (
        <>
          <Modal.Header>
            <Modal.Title>Delete task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {taskSet && taskSet.createdBy !== my_user._id ? (
              <div>
                Are you sure you want to remove yourself from this task?{" "}
              </div>
            ) : (
              <div>Are you sure you want to permanently delete this task? </div>
            )}
            <div className={`bamboo-task__title ${taskSet?.category}`}>
              {taskSet?.title} ({taskSet?.value}XP)
            </div>
          </Modal.Body>
          <Modal.Footer>
            {taskSet && taskSet.createdBy !== my_user._id ? (
              <Button variant='primary' onClick={removeSelf}>
                Yes, remove
              </Button>
            ) : (
              <Button variant='primary' onClick={deleteTask}>
                Yes, delete
              </Button>
            )}
            <Button variant='secondary' onClick={handleCloseModal}>
              No, go back
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Modal.Header>
            <Modal.Title>
              {!taskSet ? "Add new task" : "Edit a task"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {taskSet && (
              <div>
                <img src={avatar} alt='' className='x-tiny-round' />{" "}
                <strong>
                  {taskSet.createdBy !== my_user._id
                    ? getUsernameById(followedUsers, taskSet.createdBy)
                    : "You"}
                </strong>{" "}
                created this task. It is due{" "}
                {taskSet.deadline
                  ? `on ${getShortDateAsString(taskSet.deadline)}.`
                  : "any time."}
              </div>
            )}
            <Formik
              validationSchema={schema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  handleSubmitFormik(values);
                  setSubmitting(false);
                }, 400);
              }}
              initialValues={{
                title: taskSet?.title || "",
                value: taskSet?.value || 0,
                category: taskSet?.category || "",
                newCategory: "",
                desc: taskSet?.desc || " ",
                repeated: "no",
                repeats: taskSet?.repeats || "never",
                repeatsOther: 0,
                repetitions: "0",
                shared: "no",
                sharedWith: taskSet?.sharedWith || [],
                deadline: taskSet?.deadline || "",
                repeatedRadio: null,
                repeatsRadio: null,
                sharedRadio: null,
              }}>
              {({
                handleSubmit,
                handleChange,
                values,
                touched,
                isValid,
                errors,
              }) => (
                <>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='title' className='py-2'>
                      <Form.Label>What's the name of this task?</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type='text'
                          value={values.title}
                          placeholder={
                            values.title
                              ? values.title
                              : 'for e.g. "Solve World Hunger"'
                          }
                          aria-describedby="what's the name of this task?"
                          onChange={(e) => {
                            if (!changed) {
                              setChanged(true);
                            }
                            handleChange(e);
                          }}
                          isInvalid={!!errors.title}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.title}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group controlId='value' className='py-2'>
                      <Form.Label>
                        How many Bamboo Points <BambooPoints /> is it worth?
                      </Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          as='select'
                          defaultValue={taskSet ? taskSet.value : "DEFAULT"}
                          aria-describedby='how many bamboo points is it worth?'
                          onChange={(e) => {
                            if (!changed) {
                              setChanged(true);
                            }
                            handleChange(e);
                          }}
                          isInvalid={!!errors.value}
                          // hasValidation
                        >
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
                        <Form.Control.Feedback type='invalid'>
                          {errors.value}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    {values.category !== "new" ? (
                      <Form.Group controlId='category' className='py-2'>
                        <Form.Label>What's the category?</Form.Label>
                        <InputGroup hasValidation>
                          <Form.Control
                            as='select'
                            defaultValue={
                              taskSet ? taskSet.category : "DEFAULT"
                            }
                            aria-describedby="what's the category?"
                            onChange={(e) => {
                              if (!changed) {
                                setChanged(true);
                              }
                              handleChange(e);
                            }}
                            isInvalid={!!errors.value}
                            // hasValidation
                          >
                            <option value='DEFAULT' disabled>
                              Select a category
                            </option>
                            {categories
                              .filter(
                                (c) =>
                                  c !== "none" && !TASK_CATEGORIES.includes(c)
                              )
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
                            {TASK_CATEGORIES.map((c, i) => {
                              return (
                                <option
                                  key={i}
                                  value={c}
                                  //   selected={form.value === value}
                                >
                                  {c}
                                </option>
                              );
                            })}
                            {!taskSet && (
                              <>
                                <option value='' disabled>
                                  -------
                                </option>
                                <option
                                  value='new' // if value is new, showNewCat(true)
                                  // selected={form.category === "new"}
                                >
                                  create new category
                                </option>
                              </>
                            )}
                          </Form.Control>
                          <Form.Control.Feedback type='invalid'>
                            {errors.category}
                          </Form.Control.Feedback>
                          {/* {()=>{
                          if (value === "new") 
                          {console.log(value)}
                        )}} */}
                        </InputGroup>
                      </Form.Group>
                    ) : (
                      <Form.Group controlId='newCategory' className='py-2'>
                        <Form.Label>Create new category</Form.Label>
                        <InputGroup hasValidation>
                          <Form.Control
                            type='text'
                            value={values.newCategory}
                            placeholder='for e.g. "Knitting"'
                            aria-describedby='create new category'
                            onChange={(e) => {
                              if (!changed) {
                                setChanged(true);
                              }
                              handleChange(e);
                            }}
                            onKeyPress={(e) => {
                              setFormToSubmit({
                                ...formToSubmit,
                                category: values.newCategory,
                              });
                            }}
                            isInvalid={!!errors.newCategory}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.newCategory}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    )}
                    <Form.Group controlId='desc' className='py-2'>
                      <Form.Label>Describe this task (optional)</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          as='textarea'
                          rows={2}
                          value={values.desc}
                          placeholder={
                            taskSet
                              ? taskSet.desc
                              : 'for e.g. "Put food before trade, find balance with nature&apos;s systems"'
                          }
                          aria-describedby='describe this task (optional)'
                          onChange={(e) => {
                            if (!changed) {
                              setChanged(true);
                            }
                            setFormToSubmit({
                              ...formToSubmit,
                              desc: values.desc,
                            });
                            handleChange(e);
                          }}
                          isInvalid={!!errors.desc}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.desc}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    {!taskSet && (
                      <Form.Group controlId='deadline' className='py-2'>
                        <Form.Label>Give it a deadline (optional)</Form.Label>
                        <InputGroup hasValidation>
                          <Form.Control
                            type='date'
                            aria-describedby='Give it a deadline (optional)'
                            min={min}
                            max={max}
                            onChange={(e) => {
                              if (!changed) {
                                setChanged(true);
                              }
                              setFormToSubmit({
                                ...formToSubmit,
                                deadline: values.deadline,
                              });
                              handleChange(e);
                            }}
                            isInvalid={!!errors.deadline}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.deadline}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    )}
                    {taskSet ? (
                      <ul>
                        {taskSet.sharedWith && taskSet.sharedWith.length > 1 ? (
                          <>
                            <li>Any edits you make will be shared with</li>
                            <div className='ml-3'>
                              {taskSet.sharedWith
                                .filter((id) => id !== my_user._id)
                                .map((id, i) => {
                                  const username = getUsernameById(
                                    followedUsers,
                                    id
                                  );
                                  return (
                                    <div key={i}>
                                      <FiUser /> {username}
                                    </div>
                                  );
                                })}
                            </div>
                            <li>
                              You will only accrue Bamboo Points if you complete
                              it.
                            </li>
                          </>
                        ) : taskSet.type === TEAM ? (
                          <li>
                            This task is no longer shared because other users
                            have removed themselves.
                          </li>
                        ) : (
                          <li>This task is not shared.</li>
                        )}
                        {taskSet.createdBy !== my_user._id ? (
                          <li>You can remove yourself from this task.</li>
                        ) : (
                          <li>Only you can delete this task.</li>
                        )}
                        {taskSet.repeats === NEVER ? (
                          <li>This task is never repeated.</li>
                        ) : (
                          <li>This task is repeated {taskSet.repeats}.</li>
                        )}
                      </ul>
                    ) : !values.repeatedRadio ? (
                      <Form.Group
                        controlId='repeated'
                        aria-describedby='does it repeat?'>
                        <Form.Label>Does it repeat?</Form.Label>
                        <InputGroup hasValidation>
                          <div className='mb-3'>
                            <Form.Check
                              inline
                              label='yes'
                              name='repeatedRadio'
                              type='radio'
                              value='yes'
                              onChange={(e) => {
                                if (!changed) {
                                  setChanged(true);
                                }
                                setFormToSubmit({
                                  ...formToSubmit,
                                  repeated: values.repeated,
                                });
                                handleChange(e);
                              }}
                            />
                            <Form.Check
                              inline
                              label='no'
                              name='repeatedRadio'
                              type='radio'
                              value='no'
                              onChange={(e) => {
                                if (!changed) {
                                  setChanged(true);
                                }
                                setFormToSubmit({
                                  ...formToSubmit,
                                  repeated: values.repeated,
                                });
                                handleChange(e);
                              }}
                            />
                          </div>
                          <Form.Control.Feedback type='invalid'>
                            {errors.repeated}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    ) : values.repeatedRadio === "yes" &&
                      values.repeatsRadio === null ? (
                      <Form.Group
                        controlId='repeats'
                        aria-describedby='how often?'>
                        <Form.Label>How often?</Form.Label>
                        <InputGroup hasValidation>
                          <div className='mb-3'>
                            <Form.Check
                              inline
                              label='daily*'
                              name='repeatsRadio'
                              type='radio'
                              value='daily'
                              onChange={(e) => {
                                if (!changed) {
                                  setChanged(true);
                                }
                                setFormToSubmit({
                                  ...formToSubmit,
                                  repeats: values.repeats,
                                });
                                handleChange(e);
                              }}
                            />
                            <Form.Check
                              inline
                              label='weekly*'
                              name='repeatsRadio'
                              type='radio'
                              value='weekly'
                              onChange={(e) => {
                                if (!changed) {
                                  setChanged(true);
                                }
                                setFormToSubmit({
                                  ...formToSubmit,
                                  repeats: values.repeats,
                                });
                                handleChange(e);
                              }}
                            />
                            <Form.Check
                              inline
                              label='monthly*'
                              name='repeatsRadio'
                              type='radio'
                              value='monthly'
                              onChange={(e) => {
                                if (!changed) {
                                  setChanged(true);
                                }
                                setFormToSubmit({
                                  ...formToSubmit,
                                  repeats: values.repeats,
                                });
                                handleChange(e);
                              }}
                            />
                            <Form.Check
                              inline
                              label='other'
                              name='repeatsRadio'
                              type='radio'
                              value='other'
                              onChange={(e) => {
                                if (!changed) {
                                  setChanged(true);
                                }
                                setFormToSubmit({
                                  ...formToSubmit,
                                  repeats: values.repeats,
                                });
                                handleChange(e);
                              }}
                            />
                            <Form.Check
                              inline
                              label='never'
                              name='repeatsRadio'
                              type='radio'
                              value='never'
                              onChange={(e) => {
                                if (!changed) {
                                  setChanged(true);
                                }
                                setFormToSubmit({
                                  ...formToSubmit,
                                  repeats: values.repeats,
                                });
                                handleChange(e);
                              }}
                            />
                            <Form.Text id='repeats' muted>
                              * If set to repeat, tasks will be created for 28
                              days, 10 weeks or 12 months by default. Don't want
                              this? Select 'other' and choose the number of
                              repeats!
                            </Form.Text>
                          </div>
                          <Form.Control.Feedback type='invalid'>
                            {errors.repeats}
                          </Form.Control.Feedback>
                        </InputGroup>
                        <div></div>
                      </Form.Group>
                    ) : values.repeatedRadio === "yes" &&
                      values.repeatsRadio === "other" ? (
                      <Row>
                        <Col>Task repeats</Col>
                        <Col>
                          <Form.Group controlId='repeatsOther'>
                            <Form.Label>Task Repeats</Form.Label>
                            <InputGroup hasValidation>
                              <Form.Control
                                as='select'
                                onChange={(e) => {
                                  if (!changed) {
                                    setChanged(true);
                                  }
                                  setFormToSubmit({
                                    ...formToSubmit,
                                    repeatsOther: values.repeatsOther,
                                  });
                                  handleChange(e);
                                }}
                                defaultValue='1'
                                aria-describedby='task repeats'
                                isInvalid={!!errors.repeatsOther}>
                                <option value='1'>Daily</option>
                                <option value='7'>Weekly</option>
                                <option value='28'>Monthly</option>
                                <option value='2'>Every other day</option>
                                <option value='3'>Every third day</option>
                              </Form.Control>
                              <Form.Control.Feedback type='invalid'>
                                {errors.repeatsOther}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                        </Col>
                        <Col sm={12}>
                          <Form.Group as={Row} controlId='repetitions'>
                            <Col>
                              <Form.Label>To a total of</Form.Label>
                              <InputGroup hasValidation>
                                <Form.Control
                                  type='text'
                                  onChange={(e) => {
                                    if (!changed) {
                                      setChanged(true);
                                    }
                                    setFormToSubmit({
                                      ...formToSubmit,
                                      repetitions: values.repetitions,
                                    });
                                    handleChange(e);
                                  }}
                                  value={values.repetitions}
                                  isInvalid={
                                    !!errors.repetitions
                                  }></Form.Control>
                                repetitions
                                <Form.Control.Feedback type='invalid'>
                                  {errors.repetitions}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Col>
                          </Form.Group>
                        </Col>
                      </Row>
                    ) : (
                      <></>
                    )}
                    {values.repeatedRadio === "no" && !values.sharedRadio ? (
                      <Form.Group
                        controlId='shared'
                        aria-describedby='is it shared?'>
                        <Form.Label>Is it shared?</Form.Label>
                        <div className='mb-3'>
                          <Form.Check
                            inline
                            label='yes'
                            name='sharedRadio'
                            type='radio'
                            value={"yes"}
                            onChange={handleChange}
                          />
                          <Form.Check
                            inline
                            label='no'
                            name='sharedRadio'
                            type='radio'
                            value={"no"}
                            onChange={handleChange}
                          />
                        </div>
                      </Form.Group>
                    ) : values.sharedRadio === "yes" ? (
                      <Form.Group controlId='sharedWith'>
                        <Form.Label>
                          Who would you like to share it with?
                        </Form.Label>
                        {values.sharedWith.length > 0 && (
                          <Form.Text>
                            {values.sharedWith.map((id) => {
                              const username = getUsernameById(
                                followedUsers,
                                id
                              );
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
                          aria-describedby='who would you like to share it with?'
                          defaultValue={["DEFAULT"]}
                          isInvalid={!!errors.sharedWith}
                          multiple>
                          <option value='DEFAULT' disabled>
                            Select a user
                          </option>
                          {followedUsers.map((u) => (
                            <option
                              key={u._id}
                              value={`${u._id}/${u.username}`}>
                              {u.username}
                            </option>
                          ))}
                        </Form.Control>
                        {followedUsers.length < 1 && (
                          <Form.Text id='sharedWithHelpBlock' muted>
                            No one to share with? Add users at the 'following'
                            page.
                          </Form.Text>
                        )}
                        <Form.Control.Feedback type='invalid'>
                          {errors.sharedWith}
                        </Form.Control.Feedback>
                      </Form.Group>
                    ) : (
                      <></>
                    )}
                    {
                      // taskSet && !changed ? (
                      //   <Button variant='primary' className="mx-1" type='submit' disabled>
                      //     Save edit
                      //   </Button>
                      // ) :
                      taskSet ? (
                        <Button
                          variant='primary'
                          className='mx-1'
                          type='submit'>
                          Save edit
                        </Button>
                      ) : (
                        // !changed ? (
                        //   <Button variant='primary' type='submit' disabled>
                        //     Save task
                        //   </Button>
                        // ) :
                        <Button
                          variant='primary'
                          className='mx-1'
                          type='submit'>
                          Save task
                        </Button>
                      )
                    }
                    {taskSet && taskSet.createdBy === my_user._id ? (
                      <Button
                        variant='secondary'
                        className='mx-1'
                        onClick={handleDelete}>
                        Delete task
                      </Button>
                    ) : taskSet && taskSet.createdBy !== my_user._id ? (
                      <Button
                        variant='secondary'
                        className='mx-1'
                        onClick={handleDelete}>
                        Remove myself
                      </Button>
                    ) : (
                      <></>
                    )}
                    <Button
                      variant='secondary'
                      className='mx-1'
                      onClick={handleCloseModal}>
                      Go back
                    </Button>
                  </Form>
                </>
              )}
            </Formik>
          </Modal.Body>
          {/* <Modal.Footer></Modal.Footer> */}
        </>
      )}
    </Modal>
  );
};

export default AddEditTaskModal;
