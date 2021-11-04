import { Card, Button } from "react-bootstrap";

type DashProfileCardProps = {
  avatar: string;
  username: string;
  bio: string;
  level: number | null;
  xp: number | null;
};

const DashProfileCard = (props: DashProfileCardProps) => {
  const { avatar, username, bio, level, xp } = props;
  return (
    <div className='dashboard__profile-card m-1'>
      <Card.Img className="dashboard__profile-card__img" variant='top' src={avatar} />
      <Card.Title className="dashboard__profile-card__username">{username} {xp}XP</Card.Title>
      <div className="dashboard__profile-card__level">{level}</div>
      <Card.Text>{bio}</Card.Text>
      <Button variant='primary'>Go somewhere</Button>
    </div>
  );
};

export default DashProfileCard;
