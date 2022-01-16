import { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import { useAppSelector } from "../../redux/hooks";
import { reduxStateInt, rewardsInt } from "../../typings/interfaces";
import returnIco from "../../utils/funcs/f_ico";
import BambooPoints from "./XP";

type RewardsDropdownProps = {
  rewards: rewardsInt[];
  formType: string;
  label: string;
};

export default function RewardsDropdown(props: RewardsDropdownProps) {
  const { rewards, formType, label } = props;
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { xp } = state.currentUser.my_user;
  const [loading, setLoading] = useState(false);
  const [reward, setReward] = useState<rewardsInt | undefined>();
  function handleReset(e: any) {
    setReward(undefined);
    setLoading(true);
  }
  function handleChange(e: { target: { id: any; value: any } }) {
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
  useEffect(() => {
    setLoading(false);
  }, [loading]);
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
          {reward && (
            <>
              <Button
                variant='secondary'
                className='ml-2'
                onClick={handleSubmit}>
                Yes
              </Button>
              <Button variant='secondary' className='ml-2'>
                No, go back
              </Button>
            </>
          )}
        </div>
      </Form>
    </Card>
  ) : formType === "select" ? (
    <Form className='pt-1'>
      <Form.Label>{label}</Form.Label>
      <Form.Group controlId='rewards' className='row'>
        {!loading &&
          rewards.map((item, i) => (
            <div className='col col-6 col-lg-3 pb-3'>
              <Form.Check
                key={i}
                type='radio'
                name='rewards_group'
                onChange={handleChange}
                value={item._id}
                label={`${item.reward.split("||")[0]} (${item.value}xp)`}
                disabled={item.value > xp}
              />
              <Image
                roundedCircle
                src={returnIco(item.reward)}
                alt={item.reward}
                className='p-1'
                style={{ backgroundColor: "white" }}
                height='40px'
              />
              {item.value > xp ? (
                <Badge bg='light' className='m-1' style={{ color: "red" }}>
                  {item.value - xp}XP NEEDED
                </Badge>
              ) : item.reward.includes("SPECIAL") ? (
                <Badge bg='light' className='m-1'>
                  {item.reward.split(" ").splice(-1)} ONLY
                </Badge>
              ) : (
                <></>
              )}
              {reward && reward._id === item._id && (
                <>
                  <Button
                    onClick={handleSubmit}
                    variant='secondary'
                    className='mr-1'>
                    Purchase
                  </Button>
                  <Button onClick={handleReset}>Reset</Button>
                </>
              )}
            </div>
          ))}
      </Form.Group>
    </Form>
  ) : (
    <></>
  );
}
