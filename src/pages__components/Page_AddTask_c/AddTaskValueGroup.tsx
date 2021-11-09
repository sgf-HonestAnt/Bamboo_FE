import { Form } from "react-bootstrap";
import { setTaskInt } from "../../typings/interfaces";

type ValueGroupProps = {
  form: setTaskInt;
  changeSettings: any;
};

const ValueGroup = (props: ValueGroupProps) => {
  const { form, changeSettings } = props;
  return (
    <Form.Group controlId='value'>
      <Form.Label>How hard is it?</Form.Label>
      <Form.Control
        as='select'
        onChange={changeSettings}
        aria-describedby='valueHelpBlock'>
        <option value='' disabled selected>
          Select a value
        </option>
        <option value={10} selected={form.value === 10}>
          10XP: it's a piece of cake!
        </option>
        <option value={20} selected={form.value === 20}>
          20XP:
        </option>
        <option value={30} selected={form.value === 30}>
          30XP:
        </option>
        <option value={40} selected={form.value === 40}>
          40XP:
        </option>
        <option value={50} selected={form.value === 50}>
          50XP:
        </option>
      </Form.Control>
      <Form.Text id='valueHelpBlock' muted>
        Alternatively, you can create a new category.
      </Form.Text>
    </Form.Group>
  );
};

export default ValueGroup;
