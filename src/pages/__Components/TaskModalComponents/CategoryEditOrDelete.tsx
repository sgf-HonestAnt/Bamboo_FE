import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";
import { NONE, URGENT } from "../../../utils/const/str";

type CategoryEditOrDeleteProps = {};

export default function CategoryEditOrDelete(props: CategoryEditOrDeleteProps) {
  const dispatch = useDispatch();
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { currentTasks, currentUser } = state;
  const { my_user, followedUsers } = currentUser;
  const { categories, categoriesColors, awaited, in_progress, completed } =
    currentTasks;
  const allTasks = awaited.concat(in_progress, completed);
  // const {} = props;
  const [category, setCategory] = useState<string>("");
  const [deleteCat, setDeleteCat] = useState<string | boolean>(NONE);
  function handleChange(e: { target: { value: any } }) {
    setCategory(e.target.value);
  }
  function handleClick(value: string) {
    value === "edit" ? setDeleteCat(false) : setDeleteCat(true);
  }
  // fix this handleClick.
  function getAllTasksWithThisCategory(category: string) {
    return allTasks.filter((task) => task.category === category);
  }
  console.log(category, deleteCat);
  return (
    <>
      <Modal.Body>
        <Form className='px-2'>
          {" "}
          {/* onSubmit={} */}
          <h4 className='py-1'>Edit/delete a category</h4>
          {deleteCat && (
            <Form.Group controlId='existingCategories' className='py-1'>
              <Form.Label>Categories to edit or delete</Form.Label>
              <Form.Control
                as='select'
                defaultValue={"DEFAULT"}
                aria-describedby='Categories to edit or delete'
                onChange={handleChange}>
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
          )}
          {category && deleteCat === NONE && (
            <div className='py-2'>
              <Button variant='secondary' onClick={(e) => handleClick("edit")}>
                Edit "{category}" category
              </Button>{" "}
              <Button variant='primary' onClick={(e) => handleClick("delete")}>
                Delete "{category}" category
              </Button>
            </div>
          )}
          {category && !deleteCat ? (
            <Form.Group controlId='editCategory' className='py-1'>
              <Form.Label>Edit category name.</Form.Label>
              <Form.Control
                type='text'
                maxLength={15}
                // value={category}
                placeholder={category}
                aria-describedby='Edit category name.'
                // onChange={}
                // isInvalid={!!errors.newCategory}
              />
            </Form.Group>
          ) : category && deleteCat ? (
            <>
              <h4 className='py-1'>
                Are you sure you want to delete this category?
              </h4>
              <div>
                {getAllTasksWithThisCategory(category)} tasks will become
                category "none".
              </div>
            </>
          ) : (
            <></>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>&nbsp;</Modal.Footer>
    </>
  );
}
