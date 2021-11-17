import { currentAchievementsInt } from "../../typings/interfaces";

type DashAchievCardProps = {
  superlist: string[]
};

const DashAchievCard = (props: DashAchievCardProps) => {
  const { superlist } = props;
  return (
    <div className='dashboard__activities m-2 p-2'>
      {superlist?.length < 1 ? (
        <p>No achievements!</p>
      ) : ( 
        superlist.map((ach, i) => {
          return <p key={i}>{ach}</p>;
        })
      )}
    </div>
  );
};

export default DashAchievCard;
