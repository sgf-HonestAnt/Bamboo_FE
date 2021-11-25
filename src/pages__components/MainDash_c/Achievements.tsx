import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import {
  achievementInt,
  currentAchievementsInt,
  followedUserInt,
} from "../../typings/interfaces";
import createSuperlist from "../../utils/f_superlist";
import { LinkButton } from "../Buttons";
import { attemptPostAchievement } from "../../utils/f_achievements";

type DashAchievCardProps = {
  followedUsers: followedUserInt[];
  achievements: currentAchievementsInt;
  username: string;
};
const DashAchievCard = (props: DashAchievCardProps) => {
  const { followedUsers, achievements, username } = props;
  const { list, superlist } = achievements;
  const dispatch = useDispatch();
  const loadAchievementCard = async () => {
    let super_list: achievementInt[] = [];
    followedUsers.map((user, i) => {
      return user.achievements.map((ach, i) => {
        return super_list.push(ach);
      });
    });
    list.map((ach, i) => {
      return super_list.push(ach);
    });
    super_list.sort(function (a, b) {
      const date_a = new Date(a.createdAt).getTime();
      const date_b = new Date(b.createdAt).getTime();
      return date_b - date_a;
    });
    await createSuperlist(super_list, username, dispatch);
    // 🖐️ in future make only last x achievements display for each user, and get achievements sorted by date
  };
  const handleClick = async (e: {
    preventDefault: () => void;
    target: { value: any };
  }) => {
    e.preventDefault();
    const ach = e.target.value;
    const congrats = `${username} sent you a ${ach.split("|")[1]}`;
    await attemptPostAchievement(congrats, "congrats", dispatch);
    console.log(congrats);
  };
  useEffect(() => {
    loadAchievementCard();
  }, []);
  return (
    <div className='dashboard__activities m-2 p-2'>
      <div className='dashboard__card-header'>Achievements</div>
      {superlist?.length < 1 ? (
        <p>
          You have no achievements yet! Complete a task or follow a friend to
          view achievements.
        </p>
      ) : (
        superlist.map((ach, i) => {
          return (
            <div key={i}>
              {ach.includes("sent you a") || !ach.includes("Send") ? (
                <>
                  <span>{ach.split("|")[0]}</span>
                  <span>{ach.split("|")[1]}</span>
                </>
              ) : (
                <>
                  <span>{ach.split("|")[0]}</span>
                  <LinkButton
                    value={ach}
                    handleClick={handleClick}
                    label={ach.split("|")[1]}
                  />
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default DashAchievCard;
