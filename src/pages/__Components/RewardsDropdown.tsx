import { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { reduxStateInt, rewardsInt } from "../../typings/interfaces";
import returnIco from "../../utils/funcs/f_ico";
import { purchaseReward } from "../../utils/funcs/f_rewards";
import { History } from "history";
// import BambooPoints from "./XP";

type RewardsDropdownProps = {
  rewards: rewardsInt[];
  formType: string;
  label: string;
  history: History<unknown> | string[];
};

export default function RewardsDropdown(props: RewardsDropdownProps) {
  const dispatch = useDispatch();
  const { rewards, formType, label, history } = props;
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { xp } = state.currentUser.my_user;
  const allRewards = state.currentUser.my_user.rewards;
  const [loading, setLoading] = useState(false);
  const [reward, setReward] = useState<rewardsInt | null>(null);
  function handleReset(e: any) {
    setReward(null);
    setLoading(true);
  }
  function handleChange(e: { target: { id: any; value: any } }) {
    const value = e.target.value;
    const foundReward = rewards.filter((item) => item._id === value)[0];
    if (foundReward) {
      setReward(foundReward);
    }
  }
  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (reward && xp >= reward.value) {
      const remainingXp = await purchaseReward(
        allRewards,
        reward,
        xp,
        dispatch
      );
      if (remainingXp) {
        setReward(null);
        history.push("/reload?pathname=dash");
      }
    }
  }
  useEffect(() => {
    setLoading(false);
  }, [loading]);
  return formType === "dropdown" ? ( // not currently in use
    <Card className='col col-8 mt-2 py-2 px-3'>
      {/* <Form>
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
      </Form> */}
    </Card>
  ) : formType === "select" ? (
    <>
      {!loading && rewards.length > 0 && <hr />}
      <Form className='py-1 px-2'>
        <Form.Label>{label}</Form.Label>
        {!loading && rewards.length > 0 && <hr />}
        <Form.Group controlId='rewards' className='row'>
          <Row className='d-flex align-items-center justify-content-start mr-auto mx-5'>
            {!loading &&
              rewards.map((item, i) => (
                <Col
                  className='col-12 col-lg-6 align-content-start m-0 pt-1'
                  key={item._id}>
                  <Form.Check
                    type='radio'
                    name='rewards_group'
                    onChange={handleChange}
                    value={item._id}
                    label={`${item.reward.split("||")[0]} (${item.value}xp)`}
                    disabled={item.value > xp}
                  />
                  {item.value > xp && (
                    <Badge bg='light' className='m-1' style={{ color: "red" }}>
                      {item.value - xp}XP NEEDED
                    </Badge>
                  )}
                  {item.reward.includes("SPECIAL") && (
                    <Badge bg='light' className='m-1'>
                      {item.reward.split(" ").splice(-1)} ONLY
                    </Badge>
                  )}
                  <div>
                    <Image
                      roundedCircle
                      src={returnIco(item.reward)}
                      alt={item.reward}
                      className='m-1 p-1'
                      style={{ backgroundColor: "white" }}
                      height='38px'
                    />
                    {reward && reward._id === item._id && (
                      <>
                        <Button
                          onClick={handleSubmit}
                          variant='secondary'
                          size='sm'
                          className='mr-1'>
                          Buy
                        </Button>
                        <Button size='sm' onClick={handleReset}>
                          Reset
                        </Button>
                      </>
                    )}
                  </div>
                </Col>
              ))}
          </Row>
        </Form.Group>
      </Form>
      {!loading && rewards.length > 0 && <hr />}
    </>
  ) : (
    <></>
  );
}
