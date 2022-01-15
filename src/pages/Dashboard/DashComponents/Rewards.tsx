import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";

export default function Rewards() {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user } = state.currentUser;
  const { rewards } = my_user;
  const [rewardId, setRewardId] = useState("");
  function handleChange(e: { target: { value: any } }) {
    const value = e.target.value;
    setRewardId(value);
  }
  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log("HANDLE SUBMIT");
  }
  console.log(rewardId);
  return (
    <Form>
      <Form.Group controlId='rewards'>
        {/* <Form.Label>Your Rewards</Form.Label> */}
        <Form.Control
          as='select'
          defaultValue='DEFAULT'
          onChange={handleChange}>
          <option value='DEFAULT' disabled>
            Select a reward
          </option>
          {rewards.map((item, i) => (
            <option key={i} value={item._id}>
              {item.reward} ({item.value}xp)
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button onClick={handleSubmit}>Submit</Button>
    </Form>
  );
}
