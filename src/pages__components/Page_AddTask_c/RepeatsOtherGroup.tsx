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
        days to a total of 
        <input type='number' min='1' max='50' />
        repetitions
      </div>
      <span className="red">FIX STYLE AND NUM OF REPEATS SET</span>
    </Form.Group>
  );
};

export default RepeatsOtherGroup;
