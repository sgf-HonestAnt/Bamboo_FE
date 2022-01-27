import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
// import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";
import {
  AWAITED,
  DELETE,
  NEVER,
  NONE,
  PUT,
  SOLO,
  URGENT,
} from "../../../utils/const/str";
import { TaskButton } from "../DashComponents/MapTasks";
import { CirclePicker } from "react-color";

const schema = yup.object().shape({
  // title: yup
  //   .string()
  //   .required("No title provided.")
  //   .min(1, "No title provided."),
  // repeatsOther: yup.number(),
  // repetitions: yup.string().matches(/^(?=.*[1-9])/, "Must be numbers."),
  // sharedWith: yup.array().of(yup.string()),
});

type CategoryEditOrDeleteProps = {
  handleCloseModal: any;
  // categories: string[];
  // history: History<unknown> | string[];
  // location: Location<unknown>;
  // initialData?: beautifulDnD;
  // setInitialData?: any;
};

export default function CategoryEditOrDelete(props: CategoryEditOrDeleteProps) {
  // const dispatch = useDispatch();
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { currentTasks, currentUser } = state;
  const { my_user } = currentUser;
  const { categories, categoriesColors, awaited, in_progress, completed } =
    currentTasks;
  const allTasks = awaited.concat(in_progress, completed);
  const { customColors } = state.currentSettings; // comes from redux (f/e) ONLY. f/e has full control over color choice, b/e merely stores choices once made.
  const { handleCloseModal } = props;
  const [newCategoryColor, setNewCategoryColor] = useState<string>("#ccc");
  function handleChangeColor(color: any) {
    const sAsNum = parseFloat(color.hsl.s);
    const lAsNum = parseFloat(color.hsl.l);
    const parseS = 100 * sAsNum;
    const parseL = 100 * lAsNum;
    const hsla = `hsla(${color.hsl.h}, ${parseS}%, ${parseL}%, 0.8)`;
    setNewCategoryColor(hsla);
  }
  function handleEditCategory() {
    console.log("HEY");
  }
  function handleDeleteCategory() {
    console.log("HEY YOU");
  }
  function getAllTasksWithThisCategory(category: string) {
    return allTasks.filter((task) => task.category === category).length;
  }
  console.log(newCategoryColor);
  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // submitFormikTask(
            //   values,
            //   handleClose,
            //   history,
            //   location,
            //   dispatch
            // );
            setSubmitting(false);
          }, 400);
        }}
        initialValues={{
          category: "",
          method: "",
          newCategoryName: "",
        }}>
        {({ handleSubmit, handleChange, values, touched, isValid, errors }) => (
          <>
            <Modal.Body>
              <Form className='px-2'>
                {values.method !== DELETE ? (
                  <>
                    <h4 className='py-1'>Edit/delete a category</h4>
                    <Form.Group controlId='category' className='py-1'>
                      <Form.Label>Choose a category.</Form.Label>
                      <Form.Control
                        as='select'
                        defaultValue={"DEFAULT"}
                        aria-describedby='Choose a category.'
                        onChange={(e) => {
                          if (values.category !== undefined) {
                            const catColor =
                              categoriesColors[
                                categories.findIndex(
                                  (cat) => cat === values.category
                                )
                              ];
                            setNewCategoryColor(catColor);
                          }
                          console.log(values);
                          handleChange(e);
                        }}>
                        {" "}
                        <option value={"DEFAULT"} disabled>
                          Select a category
                        </option>
                        {categories
                          .filter((c) => c !== NONE && c !== URGENT)
                          .map((c, i) => (
                            <option key={i} value={c}>
                              {c}
                            </option>
                          ))}
                      </Form.Control>
                    </Form.Group>
                    {values.category && (
                      <>
                        <Form.Group controlId='method' className='py-1'>
                          <Form.Label>Choose a method.</Form.Label>
                          <Form.Control
                            as='select'
                            defaultValue={"DEFAULT"}
                            aria-describedby='Choose a method.'
                            onChange={(e) => {
                              console.log(values);
                              handleChange(e);
                            }}>
                            <option value={"DEFAULT"} disabled>
                              Select a method.
                            </option>
                            <option value={PUT}>Edit</option>
                            <option value={DELETE}>Delete</option>
                          </Form.Control>
                        </Form.Group>
                        {values.category && values.method === PUT && (
                          <>
                            <Form.Group
                              controlId='newCategoryName'
                              className='py-1'>
                              <Form.Label>
                                Edit category name (optional).
                              </Form.Label>
                              <Form.Control
                                type='text'
                                maxLength={15}
                                value={values.newCategoryName}
                                placeholder={values.category}
                                aria-describedby='Edit category name.'
                                onChange={(e) => {
                                  console.log(values);
                                  handleChange(e);
                                }}
                                // isInvalid={!!errors.newCategory}
                              />
                            </Form.Group>
                            <Form.Group
                              // controlId='newCategoryColor'
                              className='py-1'>
                              <Form.Label>
                                Edit category color (optional).
                              </Form.Label>
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
                                  category:
                                    values.newCategoryName || values.category,
                                  title: "Sample Task",
                                  image: "",
                                  desc: "Sample Description",
                                  repeats: NEVER,
                                  type: SOLO,
                                  value: 10,
                                  createdBy: my_user._id,
                                  status: AWAITED,
                                  _v: 0,
                                }}
                                bgColor={newCategoryColor || "#ccc"}
                              />
                            </Form.Group>
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <h4 className='py-1'>
                      Are you sure you want to delete{" "}
                      {`"${values.category}"` || "this category"}?
                    </h4>
                    <div>
                      {getAllTasksWithThisCategory(values.category) || 0} task
                      {getAllTasksWithThisCategory(values.category) === 1
                        ? ""
                        : "s"}{" "}
                      will become category "none".
                    </div>
                  </>
                )}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              {values.method === DELETE ? (
                <Button variant='primary' onClick={handleDeleteCategory}>
                  Yes, delete
                </Button>
              ) : values.method === PUT &&
                ((values.newCategoryName &&
                  values.newCategoryName !== values.category) ||
                  (newCategoryColor && newCategoryColor !== "#ccc")) ? (
                <Button variant='primary' onClick={handleEditCategory}>
                  Edit category?
                </Button>
              ) : values.method === PUT &&
                (!values.newCategoryName ||
                  values.newCategoryName === values.category ||
                  !newCategoryColor ||
                  newCategoryColor === "#ccc") ? (
                <Button variant='primary' disabled>
                  Edit category?
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
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
