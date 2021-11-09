import { Form } from "react-bootstrap";

type RepeatsOtherGroupProps = {
  changeOtherRep: any;
};

const RepeatsOtherGroup = (props: RepeatsOtherGroupProps) => {
  const { changeOtherRep } = props;
  return (
    <Form.Group controlId='repeats-other'>
      <div>
        Task repeats every
        <input type='number' min='2' max='100' onChange={changeOtherRep} />
        days
      </div>
    </Form.Group>
  );
};

export default RepeatsOtherGroup;
