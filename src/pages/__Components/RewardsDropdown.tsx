import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useAppSelector } from "../../redux/hooks";
import { reduxStateInt, rewardsInt } from "../../typings/interfaces";
import BambooPoints from "./XP";

type RewardsDropdownProps = {
  formType: string;
  label: string;
};

export default function RewardsDropdown(props: RewardsDropdownProps) {
  const { formType, label } = props;
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user } = state.currentUser;
  const { rewards } = my_user;
  const [reward, setReward] = useState<rewardsInt | undefined>();
  function handleChange(e: { target: { value: any } }) {
    const value = e.target.value;
    const foundReward = rewards.filter((item) => item._id === value)[0];
    if (foundReward) {
      setReward(foundReward);
    }
  }
  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log("HANDLE SUBMIT");
  }
  console.log(reward);
  return formType === "dropdown" ? (
    <Card className='col col-8 mt-2 py-2 px-3'>
      <Form>
        <Form.Group as={Row} controlId='rewards'>
          <Form.Label column sm={12}>
            {label}
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              as='select'
              // defaultValue='DEFAULT'
              onChange={handleChange}>
              {rewards.map((item, i) => (
                <option key={i} value={item._id}>
                  {item.reward} ({item.value}xp)
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
        <div className='py-2'>
          {reward && `Confirm "purchase" for ${reward.value}`}
          {reward && <BambooPoints />}
          {reward && "?"}
          {reward && 
          <>
          <Button variant="secondary" className="ml-2" onClick={handleSubmit}>Yes</Button>
          <Button variant="secondary" className="ml-2" >No, go back</Button>
          </>
          }
        </div>
      </Form>
    </Card>
  ) : formType === "select" ? (
    <Form>
      <Form.Group controlId='rewards'>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          as='select'
          defaultValue='DEFAULT'
          onChange={handleChange}>
          <option value='DEFAULT' disabled>
            Use a reward
          </option>
          {rewards.map((item, i) => (
            <option key={i} value={item._id}>
              {item.reward} ({item.value}xp): {item.available} available
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button onClick={handleSubmit}>Submit</Button>
    </Form>
  ) : (
    <></>
  );
}
