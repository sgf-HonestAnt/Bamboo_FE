import { Form } from "react-bootstrap";
import { setTaskInt } from "../../typings/interfaces";

type TitleGroupProps = {
  form: setTaskInt;
  changeSettings: any;
};

const TitleGroup = (props: TitleGroupProps) => {
  const { form, changeSettings } = props;
  return (
    <Form.Group controlId='title'>
      <Form.Label>What's the name of this task?</Form.Label>
      <Form.Control
        required
        type='text'
        value={form.title}
        placeholder='Name the task'
        onChange={changeSettings}
        aria-describedby='titleHelpBlock'
      />
      <Form.Text id='titleHelpBlock' muted>
        Alternatively, you can create a new category.
      </Form.Text>
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    </Form.Group>
  );
};

export default TitleGroup;
