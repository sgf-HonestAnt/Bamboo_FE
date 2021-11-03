import { achievementInt } from "../../typings/interfaces";

type DashActivCardProps = {
  list: achievementInt[];
  username: string;
};

const DashActivCard = (props: DashActivCardProps) => {
  const { list, username } = props;
  return (
    <div className='dashboard__activities m-2 p-2'>
      {list?.length < 1 && <p>No achievements!</p>}
      {list?.map((l, i) => (
        <p key={i}>
          {username} completed task: "{l.item}"
        </p>
        // find a way to display followed users achievements items too
      ))}
    </div>
  );
};

export default DashActivCard;
