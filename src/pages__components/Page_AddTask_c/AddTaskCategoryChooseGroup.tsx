import { Form } from "react-bootstrap";
import { setTaskInt } from "../../typings/interfaces";

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
        as='select'
        onChange={changeCategory}
        aria-describedby='categoryHelpBlock'>
        <option value='' disabled selected>
          Select a category
        </option>
        <option value='household' selected={form.category === "household"}>
          household
        </option>
        <option value='work' selected={form.category === "work"}>
          work
        </option>
        <option
          value='relationships'
          selected={form.category === "relationships"}>
          relationships
        </option>
        <option value='well-being' selected={form.category === "well-being"}>
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
              <option key={i} value={c} selected={form.category === c}>
                {c}
              </option>
            );
          })}
        <option value='new' selected={form.category === "new"}>
          create new category
        </option>
      </Form.Control>
      <Form.Text id='categoryHelpBlock' muted>
        Alternatively, you can create a new category.
      </Form.Text>
    </Form.Group>
  );
};

export default CategoryChooseGroup;
