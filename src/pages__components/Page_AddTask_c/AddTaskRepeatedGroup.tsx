import { Form } from "react-bootstrap";

type RepeatedGroupProps = {
  changeRepeated: any;
};

const RepeatedGroup = (props: RepeatedGroupProps) => {
  const { changeRepeated } = props;
  return (
    <Form.Group controlId='repeated'>
      <Form.Label>Does it repeat?</Form.Label>
      <div className='mb-3'>
        <Form.Check
          inline
          label='yes'
          name='group1'
          type='radio'
          value='yes'
          onChange={changeRepeated}
        />
        <Form.Check
          inline
          label='no'
          name='group1'
          type='radio'
          value='no'
          onChange={changeRepeated}
        />
      </div>
    </Form.Group>
  );
};

export default RepeatedGroup;
