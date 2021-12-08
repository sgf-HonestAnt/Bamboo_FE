import { Form } from "react-bootstrap";
import { setTaskInt } from "../../../typings/interfaces";

type CategoryGroupProps = {
  form: setTaskInt;
  changeSettings: any;
};

const CategoryGroup = (props: CategoryGroupProps) => {
  const { form, changeSettings } = props;
  return (
    <Form.Group controlId='category'>
      <Form.Label>Name your category</Form.Label>
      <Form.Control
        required
        type='text'
        value={form.category}
        placeholder='Name the category'
        onChange={changeSettings}
        aria-describedby='newCategoryHelpBlock'
      />
      <Form.Text id='newCategoryHelpBlock' muted>
        Alternatively, you can create a new category.
      </Form.Text>
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    </Form.Group>
  );
};

export default CategoryGroup;
