import { dataInt } from "../typings/interfaces";

export const returnMessage = async (
  type: string,
  taskData: dataInt,
  timeSpecific: string,
  numberOfTasks: number
) => {
  const { allByType, allByStatus } = taskData;
  if (type === "type") {
    return allByType[0].value > allByType[1].value
      ? `You have mostly solo tasks ${timeSpecific}.`
      : allByType[0].value < allByType[1].value
      ? `You have mostly team tasks ${timeSpecific}.`
      : `Your tasks are evenly split between team and solo ${timeSpecific}.`;
  }
  if (type === "status") {
    const numberOfAwaited = allByStatus[0].tasks.length;
    const numberOfInProgress = allByStatus[1].tasks.length;
    const numberOfCompleted = allByStatus[2].tasks.length;
    return numberOfAwaited > numberOfInProgress &&
      numberOfAwaited > numberOfCompleted
      ? `Most (${numberOfAwaited}/${numberOfTasks}) of your tasks are marked 'Awaited'.`
      : numberOfInProgress > numberOfAwaited &&
        numberOfInProgress > numberOfCompleted
      ? `Most (${numberOfInProgress}/${numberOfTasks}) of your tasks are marked 'In Progress'.`
      : numberOfCompleted > numberOfAwaited &&
        numberOfCompleted > numberOfInProgress
      ? `Good work! You've completed most of your tasks.`
      : numberOfInProgress === numberOfAwaited &&
        numberOfAwaited === numberOfCompleted
      ? `Your ${numberOfTasks} tasks are perfectly balanced between 'Completed', 'Awaited' and 'In Progress.`
      : numberOfAwaited === numberOfInProgress
      ? "You have just as many 'Awaited' as 'In Progress' tasks."
      : numberOfAwaited === numberOfCompleted
      ? "You have just as many 'Awaited' as 'Completed' tasks."
      : "You have just as many 'In Progress' as 'Completed' tasks.";
  }
};
