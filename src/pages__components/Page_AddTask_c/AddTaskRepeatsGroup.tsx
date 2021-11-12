import { Form } from "react-bootstrap";

type RepeatsGroupProps = {
  changeHowOften: any;
};

const RepeatsGroup = (props: RepeatsGroupProps) => {
  const { changeHowOften } = props;
  return (
    <Form.Group controlId='repeats'>
      <Form.Label>How often?</Form.Label>
      <div className='mb-3'>
        <Form.Check
          inline
          label='daily*'
          name='group1'
          type='radio'
          value='daily'
          onChange={changeHowOften}
        />
        <Form.Check
          inline
          label='weekly*'
          name='group1'
          type='radio'
          value='weekly'
          onChange={changeHowOften}
        />
        <Form.Check
          inline
          label='monthly*'
          name='group1'
          type='radio'
          value='monthly'
          onChange={changeHowOften}
        />
        <Form.Check
          inline
          label='other'
          name='group1'
          type='radio'
          value='other'
          onChange={changeHowOften}
        />
      </div>
      <div>
        * If set to repeat daily, weekly, or monthly, tasks will be created for
        1 year. For example, if set to repeat weekly, the task will appear every week for
        52 weeks from date of creation).
      </div>
    </Form.Group>
  );
};

export default RepeatsGroup;
