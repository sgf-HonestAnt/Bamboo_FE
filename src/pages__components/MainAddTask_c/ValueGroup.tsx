import { Form } from "react-bootstrap";
import { setTaskInt } from "../../typings/interfaces";
import { TASK_VALUES } from "../../utils/appConstants";
import BambooPoints from "../XP";

type ValueGroupProps = {
  form: setTaskInt;
  changeSettings: any;
};
const ValueGroup = (props: ValueGroupProps) => {
  const { form, changeSettings } = props;
  return (
    <Form.Group controlId='value' className="py-2">
      <Form.Label>
        How many Bamboo Points <BambooPoints /> is it worth?
      </Form.Label>
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
        Bamboo Points can be spent on future rewards.
      </Form.Text>
    </Form.Group>
  );
};

export default ValueGroup;
