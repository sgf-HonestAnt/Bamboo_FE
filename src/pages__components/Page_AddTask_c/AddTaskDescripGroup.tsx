import { Form } from "react-bootstrap";

type DescripGroupProps = {
  changeSettings: any;
};

const DescripGroup = (props: DescripGroupProps) => {
  const { changeSettings } = props;
  return (
    <Form.Group controlId='desc'>
      <Form.Label>Description</Form.Label>
      <Form.Control
        required
        as='textarea'
        rows={3}
        placeholder='Provide more details'
        onChange={changeSettings}
        aria-describedby='descripHelpBlock'
      />
      <Form.Text id='descripHelpBlock' muted>
        Alternatively, you can create a new category.
      </Form.Text>
    </Form.Group>
  );
};

export default DescripGroup;
