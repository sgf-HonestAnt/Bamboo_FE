import { Form } from "react-bootstrap";
import { setTaskInt } from "../../typings/interfaces";
import { TASK_VALUES } from "../../utils/constants";
import { PIE } from "../../utils/icons";

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
        required
        as='select'
        onChange={changeSettings}
        aria-describedby='valueHelpBlock'>
        <option value='' disabled selected>
          Select a value
        </option>
        {TASK_VALUES.map((script, i) => {
          let value = 10 * (i + 1);
          return (
            <option key={i} value={value} selected={form.value === value}>
              {value}XP: {script}
            </option>
          );
        })}
      </Form.Control>
      <Form.Text id='valueHelpBlock' muted>
        Alternatively, you can create a new category.
      </Form.Text>
    </Form.Group>
  );
};

export default ValueGroup;
