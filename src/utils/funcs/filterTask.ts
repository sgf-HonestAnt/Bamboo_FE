import { taskInt } from "../../typings/interfaces";

const filterTasks = async (
  allTasks: taskInt[],
  firstStatus: string,
  secondStatus: string,
  thirdStatus: string
) => {
  const filtered =
    thirdStatus !== undefined
      ? // if all three statuses are defined don't filter, show all tasks
        allTasks
      : firstStatus !== undefined && secondStatus !== undefined
      ? // if the first and second status are defined show tasks from first or second status
        allTasks.filter((t) => t.status === firstStatus || secondStatus)
      : firstStatus !== undefined
      ? // if only the first status is defined show tasks from that status
      allTasks.filter((t) => t.status === firstStatus)
      : [];
  return filtered;
};

export default filterTasks;
