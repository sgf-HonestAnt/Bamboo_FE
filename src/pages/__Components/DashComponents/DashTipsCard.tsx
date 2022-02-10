import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";

type DashTipsCardProps = {}; // NOT IN USE
const DashTipsCard = (props: DashTipsCardProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { followedUsers, my_user } = state.currentUser;
  const { username, level, total_xp, total_completed } = my_user;
  const tasks = state.currentTasks;
  const { awaited, in_progress } = tasks;
  const userHasFollows = followedUsers.length > 0;
  const userIsAhead = followedUsers.find((u) => u.level > level!);
  const newLevelApproaching = (total_xp! + 50) / 250 >= level! + 1;
  const whyNoTasks =
    awaited.length + in_progress.length === 0 && total_completed === 0;
  return (
    <div className='bamboo-card-mid dashboard__tips-card'>
      <div className='dashboard__card-header'>Hints</div>
      {!userHasFollows ? (
        <div>
          <strong>Did you know?</strong> You can follow your friends by
          searching for their email or username at the 'Find a User' or
          'Following' sections!
        </div>
      ) : whyNoTasks ? (
        <div>
          <strong>Hmmm...</strong> Your task list is looking kind of empty.
          Perhaps you should give yourself something to do.
        </div>
      ) : newLevelApproaching ? (
        <div>
          <strong>{username},</strong> you're just a task or two away from
          levelling up. Check your lists and find a task to complete now!
        </div>
      ) : userIsAhead ? (
        <div>
          <strong>Heads up!</strong> {userIsAhead.username} is{" "}
          {userIsAhead.level - level!}{" "}
          {userIsAhead.level - level! > 1 ? "levels" : "level"} and{" "}
          {userIsAhead.total_xp - total_xp!} Bamboo Points ahead of you. Catch
          them up by completing some more tasks!
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DashTipsCard;
