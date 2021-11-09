import { Form } from "react-bootstrap";

type SharedWithChooseGroupProps = {
  changeShared: any;
};

const SharedWithChooseGroup = (props: SharedWithChooseGroupProps) => {
  const { changeShared } = props;
  return (
    <Form.Group controlId='sharedWith-choose'>
      <Form.Label>Is it shared?</Form.Label>
      <div className='mb-3'>
        <Form.Check
          inline
          label='yes'
          name='group1'
          type='radio'
          value='yes'
          onChange={changeShared}
        />
        <Form.Check
          inline
          label='no'
          name='group1'
          type='radio'
          value='no'
          onChange={changeShared}
        />
      </div>
    </Form.Group>
  );
};

export default SharedWithChooseGroup;
