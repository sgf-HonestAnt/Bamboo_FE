import { Card, Button } from "react-bootstrap";

type DashProfileCardProps = {
  avatar: string;
  username: string;
  bio: string;
}; 

const DashProfileCard = (props: DashProfileCardProps) => {
  const { avatar, username, bio } = props;
  return (
    <div className='dashboard__profile-card m-1'>
      <Card.Img variant='top' src={avatar} />
      <Card.Title>{username}</Card.Title>
      <Card.Text>{bio}</Card.Text>
      <Button variant='primary'>Go somewhere</Button>
    </div>
  );
};

export default DashProfileCard;
