import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";

type DashTipsCardProps = {};
const DashTipsCard = (props: DashTipsCardProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { followedUsers, my_user } = state.currentUser;
  const { level, total_xp } = my_user;
  const tasks = state.currentTasks;
  const { awaited, in_progress } = tasks;
  const userHasFollows = followedUsers.length > 0;
  const userIsAhead = followedUsers.find((u) => u.level > level!);
  const newLevelApproaching = (total_xp! + 50) / 250 >= level! + 1;
  console.log(
    "NEW LEVEL APPROACHING",
    newLevelApproaching,
    total_xp! + 50,
    (total_xp! + 50) / 250
  );
  const whyNoTasks = awaited.length + in_progress.length === 0;
  return (
    <div className='dashboard__tips-card m-2'>
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
          <strong>Gooo, team!</strong> You're just a task or two away from
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
        <div>
          <strong>Uh-oh.</strong> Here's where we would normally offer a FAQ
          link...but unfortunately the Bamboo coding elf hasn't got around to it
          yet. Hang tight, we're sure she'll to it eventually!
        </div>
      )}
    </div>
  );
};

export default DashTipsCard;
