import { Row, Card, Button } from "react-bootstrap";
import { followedUserInt } from "../../typings/interfaces";
import "./styles.css";

type FollowingProps = {
  followedUsers: followedUserInt[];
};

const Following = ({ followedUsers }: FollowingProps) => {
  return (
    <Row className='following-page p-1'>
      {followedUsers?.length < 1 && <p>NO FOLLOWED USERS!</p>}
      {followedUsers?.map((u, i) => (
        <Card key={i} className='following-page__profile-card col-3 m-1'>
          <Card.Img variant='top' src={u.avatar} />
          <Card.Title>{u.username}</Card.Title>
          <Card.Text>{u.bio}</Card.Text>
          <Button variant='primary'>Go somewhere</Button>
        </Card>
      ))}
    </Row>
  );
};

export default Following;
