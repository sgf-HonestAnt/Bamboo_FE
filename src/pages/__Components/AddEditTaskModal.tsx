import { History, Location } from "history";
import { Formik, useField } from "formik";
import Select from "react-select";
import * as yup from "yup";
import { CirclePicker } from "react-color";
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
import { TASK_VALUES } from "../../utils/const/arr";
import { NEVER, TEAM, SOLO, AWAITED } from "../../utils/const/str";
import { FiUser } from "react-icons/fi";
import {
  getShortDateAsString,
  getMinMaxDateAsString,
} from "../../utils/funcs/f_dates";
import {
  attemptDeleteTask,
  removeSelfFromTask,
} from "../../utils/funcs/f_tasks";
import { getAvatarById, getUsernameById } from "../../utils/funcs/f_users";
import { Link } from "react-router-dom";
import submitFormikTask from "../../utils/funcs/f_submitFormikTask";
import { TaskButton } from "./DashComponents/MapTasks";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("No title provided.")
    .min(1, "No title provided."),
  value: yup
    .number()
    .required("No value provided.")
    .min(10, "No value provided."),
  category: yup
    .string()
    .required("No category provided.")
    .min(1, "No category provided."),
  desc: yup.string(),
  repeated: yup.string(),
  repeats: yup.string(),
  repeatsOther: yup.number(),
  repetitions: yup.string().matches(/^(?=.*[1-9])/, "Must be numbers."),
  shared: yup.string(),
  sharedWith: yup.array().of(yup.string()),
  deadline: yup.string(),
});

// repeatsOther: 0,
// repetitions: "1",

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

function SelectInput({ label, setSharedUsers, ...props }: any) {
  const [field, meta] = useField(props);
  const options = props.children.map((option: typeof props.children) => ({
    value: option.props.value,
    label: option.props.children,
  }));
  const onChange = (selectedOptions: any) => {
    setSharedUsers({ selectedOptions });
  };
  return (
    <div className='mb-3'>
      <label htmlFor={props.id || props.name} className='form-label'>
        {label}
      </label>
      <Select
        isMulti
        defaultValue={options.find(
          (option: { label: string; value: string }) =>
            option.value === field.value
        )}
        options={options}
        onChange={onChange}
        // onBlur={setTouched}
      />
      {meta.touched && meta.error ? (
        <div className='form-text text-danger'>{meta.error}</div>
      ) : null}
    </div>
  );
}

export default function AddEditTaskModal(props: AddEditTaskModalProps) {
  const dispatch = useDispatch();
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { currentTasks, currentUser } = state;
  const { my_user, followedUsers } = currentUser;
  const { categories, categoriesColors, awaited, in_progress } = currentTasks;
  const { customColors } = state.currentSettings;
  // comes from redux (f/e) ONLY. f/e has full control over color choice, b/e merely stores choices once made.
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
  const [newCategoryColor, setNewCategoryColor] = useState<
    string | undefined
  >();
  function handleChangeColor(color: any) {
    const sAsNum = parseFloat(color.hsl.s);
    const lAsNum = parseFloat(color.hsl.l);
    const parseS = 100 * sAsNum;
    const parseL = 100 * lAsNum;
    const hsla = `hsla(${color.hsl.h}, ${parseS}%, ${parseL}%, 0.8)`;
    setNewCategoryColor(hsla);
  }
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  async function loadModal() {
    let array: { value: string; label: string }[] = [];
    for (let i = 0; i < followedUsers.length; i++) {
      array.push({
        value: `${followedUsers[i]._id}`,
        label: `${followedUsers[i].username}`,
      });
    }
    setOptions(array);
  }
  const avatar =
    taskSet && taskSet.createdBy !== my_user._id
      ? getAvatarById(followedUsers, taskSet.createdBy)
      : my_user.avatar;
  // const { min, max } = getMinMaxDateAsString(new Date());
  const [showWarning, setShowWarning] = useState(false);
  const [changed, setChanged] = useState<{
    title: boolean;
    value: boolean;
    category: boolean;
  }>({
    title: false,
    value: false,
    category: false,
  });
  const [sharedUsers, setSharedUsers] = useState({ selectedOptions: [] });
  // console.log(
  //   "sharedUsers at modal=>",
  //   sharedUsers,
  //   "taskSet.sharedWith at modal",
  //   taskSet?.sharedWith
  // );
  const handleDelete = () => {
    setShowWarning(true);
  };
  const handleEdit = () => {
    setView(false);
  };
  const deleteTask = async () => {
    if (taskSet) {
      await attemptDeleteTask(taskSet._id);
      handleClose();
      history.push("/reload?pathname=tasks");
    }
  };
  const removeSelf = async () => {
    if (taskSet) {
      await removeSelfFromTask(taskSet._id, currentTasks, dispatch);
      handleClose();
      history.push("/reload?pathname=tasks");
    }
  };
  const [showEditCategories, setShowEditCategories] = useState(false);
  const handleCloseModal = () => {
    setShowEditCategories(false);
    setSharedUsers({ selectedOptions: [] });
    setChanged({ title: false, value: false, category: false });
    setShowWarning(false);
    taskSet && setView(true);
    // history.push("/tasks");
    handleClose();
  };
  useEffect(() => {
    loadModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followedUsers]);
  return (
    <Modal show={show} onHide={handleCloseModal}>
      {location.pathname === "/categories" || showEditCategories ? (
        <>
          {/* <CategoryEditOrDelete handleCloseModal={handleCloseModal} /> */}
        </>
      ) : taskSet && view ? (
        <>
          <Modal.Header>
            <Modal.Title>
              {taskSet.title} ({taskSet.value}XP)
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              {taskSet.deadline && (
                <li className='py-1'>
                  Deadline: {getShortDateAsString(taskSet.deadline)}
                </li>
              )}
              {taskSet.category && (
                <li className='py-1'>Category: {taskSet.category}</li>
              )}
              {taskSet.desc && (
                <li className='py-1'>Description: {taskSet.desc}</li>
              )}
              {taskSet.repeats && (
                <li className='py-1'>Repeats: {taskSet.repeats}</li>
              )}
              {taskSet.createdBy !== my_user._id && (
                <li className='py-1'>
                  Created by: <br />
                  <div>
                    <Link to={`/following?id=${taskSet.createdBy}`}>
                      <img
                        src={getAvatarById(followedUsers, taskSet.createdBy)}
                        alt={getUsernameById(followedUsers, taskSet.createdBy)}
                        className='dotted-border x-tiny-round mr-1'
                      />
                      {getUsernameById(followedUsers, taskSet.createdBy)}
                    </Link>
                  </div>
                </li>
              )}
              {taskSet.sharedWith && taskSet.sharedWith.length > 1 ? (
                <li className='py-1'>
                  Shared with:
                  <br />
                  <img
                    src={my_user.avatar}
                    alt={my_user.username}
                    className='dotted-border x-tiny-round mr-1'
                  />
                  {my_user.username} (me)
                  {taskSet.sharedWith
                    .filter((id) => id !== my_user._id)
                    .map((id, i) => {
                      const avatar = getAvatarById(followedUsers, id);
                      const username = getUsernameById(followedUsers, id);
                      return avatar && username ? (
                        <div key={i} className='pt-1'>
                          <Link to={`/following?id=${id}`}>
                            <img
                              src={avatar}
                              alt={username}
                              className='dotted-border x-tiny-round mr-1'
                            />
                            {username}
                          </Link>
                        </div>
                      ) : (
                        <></>
                      );
                    })}
                </li>
              ) : (
                <li className='py-1'>Shared with: not shared</li>
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
          <Modal.Body>
            {taskSet && (
              <div className='px-2 pb-3'>
                <img
                  src={avatar}
                  alt=''
                  className='dotted-border x-tiny-round'
                />{" "}
                <strong>
                  {taskSet.createdBy !== my_user._id
                    ? getUsernameById(followedUsers, taskSet.createdBy)
                    : "You"}
                </strong>{" "}
                created this task. It's due{" "}
                {taskSet.deadline
                  ? `on ${getShortDateAsString(taskSet.deadline)}.`
                  : "any time."}
              </div>
            )}
            <Formik
              validationSchema={schema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  submitFormikTask(
                    values,
                    newCategoryColor,
                    sharedUsers,
                    setSharedUsers,
                    taskSet,
                    categories,
                    categoriesColors,
                    awaited,
                    in_progress,
                    refreshToken,
                    initialData,
                    setInitialData,
                    setChanged,
                    handleClose,
                    history,
                    location,
                    dispatch
                  );
                  taskSet && setView(true);
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
                repeats: taskSet?.repeats || NEVER,
                repeatsOther: 0,
                repetitions: "1",
                shared: "no",
                sharedWith: taskSet?.sharedWith || [],
                deadline: taskSet?.deadline || "",
                repeatedRadio: null,
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
                  <Form onSubmit={handleSubmit} className='px-2'>
                    <h4 className='py-1'>
                      {!taskSet ? "Add new task" : "Edit a task"}
                    </h4>
                    <Form.Group controlId='title' className='py-1'>
                      <Form.Label>
                        {taskSet ? "Edit name (optional)." : "Name your task."}
                      </Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type='text'
                          maxLength={30}
                          value={values.title}
                          placeholder={
                            errors.title
                              ? errors.title
                              : values.title
                              ? values.title
                              : 'for e.g. "Solve World Hunger"'
                          }
                          aria-describedby={
                            taskSet
                              ? "Edit name (optional)."
                              : "Name your task."
                          }
                          onChange={(e) => {
                            if (values.title !== undefined) {
                              setChanged({ ...changed, title: true });
                            }
                            handleChange(e);
                          }}
                          isInvalid={!!errors.title}
                        />
                        {/* <Form.Control.Feedback type='invalid'>
                          {errors.title}
                        </Form.Control.Feedback> */}
                      </InputGroup>
                    </Form.Group>
                    <Form.Group controlId='value' className='py-1'>
                      <Form.Label>
                        {taskSet
                          ? "Edit value (optional)."
                          : "What's its value?"}
                      </Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          as='select'
                          defaultValue={taskSet ? taskSet.value : 0}
                          aria-describedby={
                            taskSet
                              ? "Edit value (optional)."
                              : "What's its value?"
                          }
                          onChange={(e) => {
                            setChanged({ ...changed, value: true });
                            handleChange(e);
                          }}
                          isInvalid={!!errors.value}
                          // hasValidation
                        >
                          <option value={0} disabled>
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
                        {/* <Form.Control.Feedback type='invalid'>
                          {errors.value}
                        </Form.Control.Feedback> */}
                      </InputGroup>
                    </Form.Group>
                    {values.category !== "new" ||
                    (taskSet && values.category === "new") ? (
                      <Form.Group controlId='category' className='py-1'>
                        <Form.Label>
                          {taskSet
                            ? "Edit category (optional)."
                            : "Choose a category."}
                        </Form.Label>
                        <InputGroup hasValidation>
                          <Form.Control
                            as='select'
                            defaultValue={
                              taskSet ? taskSet.category : "DEFAULT"
                            }
                            aria-describedby={
                              taskSet
                                ? "Edit category (optional)."
                                : "Choose a category."
                            }
                            onChange={(e) => {
                              if (values.category !== undefined) {
                                setChanged({ ...changed, category: true });
                              }
                              handleChange(e);
                            }}
                            isInvalid={!!errors.category}
                            // hasValidation
                          >
                            <option value='DEFAULT' disabled>
                              Select a category
                            </option>
                            {categories.map((c, i) => {
                              return (
                                <option key={i} value={c}>
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
                                >
                                  create new category
                                </option>
                              </>
                            )}
                          </Form.Control>
                        </InputGroup>
                        {/* ENABLE ONCE SET UP IN B/E */}
                        {/* {taskSet && (
                          <Form.Text style={{ display: "inline-block" }}>
                            <Button
                              variant='link'
                              id='edit-categories'
                              className='p-0'
                              onClick={(e) => setShowEditCategories(true)}>
                              * Want to edit or delete the categories
                              themselves?
                            </Button>
                          </Form.Text>
                        )} */}
                      </Form.Group>
                    ) : (
                      <>
                        <Form.Group controlId='newCategory' className='py-1'>
                          <Form.Label>Create new category.</Form.Label>
                          <InputGroup hasValidation>
                            <Form.Control
                              type='text'
                              maxLength={15}
                              value={values.newCategory}
                              placeholder='for e.g. "Save the Pandas"'
                              aria-describedby='create new category'
                              // onChange={handleChange}
                              onChange={(e) => {
                                if (values.category !== undefined) {
                                  setChanged({ ...changed, category: true });
                                }
                                handleChange(e);
                              }}
                              isInvalid={!!errors.newCategory}
                            />
                            <Form.Control.Feedback type='invalid'>
                              {errors.newCategory}
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                        <Form.Group
                          // controlId='newCategoryColor'
                          className='py-1'>
                          <Form.Label>Choose category color.</Form.Label>
                          <CirclePicker
                            width='100%'
                            colors={customColors}
                            onChangeComplete={handleChangeColor}
                          />
                        </Form.Group>
                        <Form.Group
                          // controlId='sampleTaskBtn'
                          className='py-1'>
                          <TaskButton
                            i={0}
                            task={{
                              _id: my_user._id,
                              category: values.newCategory || "Sample Category",
                              title: values.title || "Sample Task",
                              image: "",
                              desc: values.desc,
                              repeats: NEVER,
                              type: SOLO,
                              value: values.value,
                              createdBy: my_user._id,
                              status: AWAITED,
                              _v: 0,
                            }}
                            bgColor={newCategoryColor || "#ccc"}
                          />
                        </Form.Group>
                      </>
                    )}
                    <Form.Group controlId='desc' className='py-1'>
                      <Form.Label>
                        {taskSet
                          ? "Edit description (optional)."
                          : "Describe your task (optional)."}
                      </Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          as='textarea'
                          rows={1}
                          value={values.desc}
                          placeholder={
                            taskSet
                              ? taskSet.desc
                              : 'for e.g. "Put food before trade, find balance with nature&apos;s systems"'
                          }
                          aria-describedby={
                            taskSet
                              ? "Edit description (optional)."
                              : "Describe your task (optional)."
                          }
                          onChange={handleChange}
                          isInvalid={!!errors.desc}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.desc}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    {!taskSet && (
                      <Form.Group controlId='deadline' className='py-1'>
                        <Form.Label>Give it a deadline (optional).</Form.Label>
                        <InputGroup hasValidation>
                          <Form.Control
                            type='date'
                            aria-describedby='Give it a deadline (optional)'
                            min={min}
                            max={max}
                            onChange={handleChange}
                            isInvalid={!!errors.deadline}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.deadline}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    )}
                    {taskSet ? (
                      <ul className='pt-2'>
                        {taskSet.sharedWith && taskSet.sharedWith.length > 1 ? (
                          <>
                            <li className='py-1'>
                              Any edits you make will be shared with
                            </li>
                            <div className='ml-3'>
                              {taskSet.sharedWith
                                .filter((id) => id !== my_user._id)
                                .map((id, i) => {
                                  const username = getUsernameById(
                                    followedUsers,
                                    id
                                  );
                                  return username ? (
                                    <div key={i}>
                                      <FiUser /> {username}
                                    </div>
                                  ) : (
                                    <></>
                                  );
                                })}
                            </div>
                            <li className='py-1'>
                              You will only accrue Bamboo Points if you complete
                              it.
                            </li>
                          </>
                        ) : taskSet.type === TEAM ? (
                          <li className='py-1'>
                            This task is no longer shared because other users
                            have removed themselves.
                          </li>
                        ) : (
                          <li className='py-1'>This task is not shared.</li>
                        )}
                        {taskSet.createdBy !== my_user._id ? (
                          <li className='py-1'>
                            You can remove yourself from this task.
                          </li>
                        ) : (
                          <li className='py-1'>
                            Only you can delete this task.
                          </li>
                        )}
                        {taskSet.repeats === NEVER ? (
                          <li className='py-1'>This task is never repeated.</li>
                        ) : (
                          <li className='py-1'>
                            This task is repeated {taskSet.repeats}.
                          </li>
                        )}
                      </ul>
                    ) : !values.repeatedRadio ? (
                      <Form.Group
                        controlId='repeated'
                        aria-describedby='does it repeat?'
                        className='py-1'>
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
                                handleChange(e);
                              }}
                            />
                            <Form.Check
                              inline
                              label='no'
                              name='repeatedRadio'
                              type='radio'
                              value='no'
                              onChange={handleChange}
                            />
                          </div>
                          <Form.Control.Feedback type='invalid'>
                            {errors.repeated}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    ) : values.repeatedRadio &&
                      values.repeatedRadio !== "no" &&
                      values.repeats !== "other" ? (
                      <Form.Group
                        controlId='repeats'
                        className='py-1'
                        aria-describedby='how often?'>
                        <Form.Label>How often?</Form.Label>
                        <InputGroup hasValidation>
                          <Form.Control
                            as='select'
                            defaultValue={
                              // taskSet ? taskSet.repeats :
                              "DEFAULT"
                            }
                            onChange={handleChange}
                            isInvalid={!!errors.repeats}
                            // hasValidation
                          >
                            <option value='DEFAULT' disabled>
                              Select a value
                            </option>
                            <option value='daily'>Daily*</option>
                            <option value='weekly'>Weekly*</option>
                            <option value='monthly'>Monthly*</option>
                            <option value='other'>Other</option>
                            <option value='never'>Never</option>
                          </Form.Control>
                          <Form.Text style={{ display: "inline-block" }}>
                            * Daily, weekly and monthly repetitions are preset
                            by default to 7, 4 and 2 reps respectively.
                            Alternatively, select 'Other' for full control.
                          </Form.Text>
                        </InputGroup>
                      </Form.Group>
                    ) : values.repeats === "other" ? (
                      <Row>
                        <Col sm={6}>
                          <Form.Group controlId='repeatsOther' className='py-1'>
                            Task Repeats...
                            <InputGroup hasValidation>
                              <Form.Control
                                as='select'
                                onChange={handleChange}
                                defaultValue='DEFAULT'
                                aria-describedby='task repeats'
                                isInvalid={!!errors.repeatsOther}>
                                <option value='DEFAULT' disabled>
                                  Select a value
                                </option>
                                <option value={1}>Daily</option>
                                <option value={7}>Weekly</option>
                                <option value={28}>Monthly</option>
                                <option value={2}>Every other day</option>
                                <option value={3}>Every third day</option>
                              </Form.Control>
                              <Form.Control.Feedback type='invalid'>
                                {errors.repeatsOther}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group
                            as={Row}
                            controlId='repetitions'
                            className='py-1'>
                            <Col>
                              For a total of ... reps
                              <InputGroup hasValidation>
                                <Form.Control
                                  type='text'
                                  onChange={handleChange}
                                  value={values.repetitions}
                                  isInvalid={!!errors.repetitions}
                                />
                                <Form.Control.Feedback type='invalid'>
                                  {errors.repetitions}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Col>
                          </Form.Group>
                        </Col>
                      </Row>
                    ) : !values.sharedRadio ? (
                      <Form.Group
                        controlId='shared'
                        aria-describedby='is it shared?'
                        className='py-1'>
                        <Form.Label>Is it shared?</Form.Label>
                        <div className='mb-3'>
                          <Form.Check
                            inline
                            label='yes'
                            name='sharedRadio'
                            type='radio'
                            value='yes'
                            onChange={handleChange}
                          />
                          <Form.Check
                            inline
                            label='no'
                            name='sharedRadio'
                            type='radio'
                            value='no'
                            onChange={handleChange}
                          />
                        </div>
                      </Form.Group>
                    ) : values.sharedRadio === "yes" ? (
                      <SelectInput
                        name='sharedWith'
                        label='Who would you like to share it with?'
                        setSharedUsers={setSharedUsers}>
                        {options.map((option: any) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </SelectInput>
                    ) : (
                      <></>
                    )}
                    <div className='pt-3 pb-1'>
                      {taskSet ? (
                        <Button
                          variant='primary'
                          className='mx-1'
                          type='submit'>
                          Edit task
                        </Button>
                      ) : !changed.title ||
                        !changed.category ||
                        !changed.value ? (
                        <Button variant='primary' type='submit' disabled>
                          Save task
                        </Button>
                      ) : (
                        <Button
                          variant='primary'
                          className='mx-1'
                          type='submit'>
                          Save task
                        </Button>
                      )}
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
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
}
