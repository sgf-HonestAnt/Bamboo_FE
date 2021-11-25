import { Form } from "react-bootstrap";

type DescripGroupProps = {
  changeSettings: any;
};
const DescripGroup = (props: DescripGroupProps) => {
  const { changeSettings } = props;
  return (
    <Form.Group controlId='desc' className="py-2">
      <Form.Label>Description</Form.Label>
      <Form.Control
        required
        as='textarea'
        rows={3}
        placeholder='for e.g. "Put food before trade, find balance with nature&apos;s systems"'
        onChange={changeSettings}
        // aria-describedby='descripHelpBlock'
      />
      {/* <Form.Text id='descripHelpBlock' muted>
        Alternatively, you can create a new category.
      </Form.Text> */}
    </Form.Group>
  );
};

export default DescripGroup;
