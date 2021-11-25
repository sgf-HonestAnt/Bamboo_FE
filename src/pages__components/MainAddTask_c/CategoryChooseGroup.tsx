import { Form } from "react-bootstrap";
import { setTaskInt } from "../../typings/interfaces";
import { TASK_CATEGORIES } from "../../utils/appConstants";

type CategoryChooseGroupProps = {
  form: setTaskInt;
  changeCategory: any;
  categories: string[];
};
const CategoryChooseGroup = (props: CategoryChooseGroupProps) => {
  const { form, changeCategory, categories } = props;
  return (
    <Form.Group controlId='category-choose'>
      <Form.Label>What's the category?</Form.Label>
      <Form.Control
        required
        as='select'
        onChange={changeCategory}
        // aria-describedby='categoryHelpBlock'
        >
        <option value='' disabled selected>
          Select a category
        </option>
        {TASK_CATEGORIES.map((c) => (
          <option key={c} selected={form.category === c}>
            {c}
          </option>
        ))}
        <option value='' disabled>
          -------
        </option>
        {categories
          .filter((c) => c !== "none" && TASK_CATEGORIES.includes(c))
          .sort()
          .map((c, i) => {
            return (
              <option key={i} value={c} selected={form.category === c}>
                {c}
              </option>
            );
          })}
        <option value='new' selected={form.category === "new"}>
          create new category
        </option>
      </Form.Control>
      {/* <Form.Text id='categoryHelpBlock' muted>
        Alternatively, you can create a new category.
      </Form.Text> */}
    </Form.Group>
  );
};

export default CategoryChooseGroup;
