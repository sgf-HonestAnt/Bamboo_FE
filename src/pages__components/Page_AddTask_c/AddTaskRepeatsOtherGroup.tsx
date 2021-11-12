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
        {/* <input type='number' min='2' max='100' onChange={changeOtherRep} /> */}
        repetitions
      </div>
      {/* NUMBER OF REPS */}
    </Form.Group>
  );
};

export default RepeatsOtherGroup;
