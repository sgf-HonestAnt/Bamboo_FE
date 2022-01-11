import { genericTaskInt } from "../typings/interfaces";
import { AWAITED, COMPLETED, IN_PROGRESS, SOLO, TEAM } from "./appConstants";

// genericTaskInt {
//     name: string;
//     total: number;
//     tasks: taskInt[];
// }

export function findMostUsedValue(data: genericTaskInt[], tasksTotal: number) {
  const array = data.map((data: genericTaskInt) => data.total);
  const highestUsed = Math.max(...array);
  const arrayOfHighestUsed = array.filter(
    (value: number) => value === highestUsed
  );
  const index = array.findIndex((value: number) => value === highestUsed);
  //   const howMany = arrayOfHighestUsed.filter(
  //     (value: number) => value === highestUsed
  //   ).length;
  return arrayOfHighestUsed.length < 2
    ? `${
        data[index].name === "10xp" || data[index].name === "20xp"
          ? "Real Big Saver| "
          : data[index].name === "30xp"
          ? "Budget Balancer| "
          : "High-Roller| "
      }|${Math.floor(
        (data[index].total / tasksTotal) * 100
      )}% of your tasks have a value of ${data[index].name}.`
    : `REWRITE|You create tasks with a range of values.`;
}

export function findMostCommonStatus(
  data: genericTaskInt[],
  tasksTotal: number
) {
  const awaitedTasks = data.filter(
    (data: genericTaskInt) => data.name === AWAITED
  )[0];
  const progressingTasks = data.filter(
    (data: genericTaskInt) => data.name === IN_PROGRESS
  )[0];
  const completedTasks = data.filter(
    (data: genericTaskInt) => data.name === COMPLETED
  )[0];
  if (
    awaitedTasks.total > progressingTasks.total &&
    awaitedTasks.total > completedTasks.total
  ) {
    return `Procrastinor|${Math.floor(
      (awaitedTasks.total / tasksTotal) * 100
    )}% of your tasks are marked 'Awaited'.`;
  } else if (
    progressingTasks.total > awaitedTasks.total &&
    progressingTasks.total > completedTasks.total
  ) {
    return `Powerhouse|${Math.floor(
      (progressingTasks.total / tasksTotal) * 100
    )}% of your tasks are marked 'In Progress' .`;
  } else if (
    completedTasks.total > awaitedTasks.total &&
    completedTasks.total > progressingTasks.total
  ) {
    return `Big Achiever|${Math.floor(
      (completedTasks.total / tasksTotal) * 100
    )}% of your tasks are marked 'Completed'.`;
  } else if (
    completedTasks.total === awaitedTasks.total &&
    completedTasks.total === progressingTasks.total
  ) {
    return `Perfect Balance|Your tasks are split evenly between 'Awaited', 'In Progress' and 'Completed.`;
  } else {
    return `?|?`;
  }
}

export function findMostUsedType(data: genericTaskInt[], tasksTotal: number) {
  const soloTasks = data.filter(
    (data: genericTaskInt) => data.name === SOLO
  )[0];
  const teamTasks = data.filter(
    (data: genericTaskInt) => data.name === TEAM
  )[0];
  if (soloTasks.total > teamTasks.total) {
    return `Lone Wolf|${Math.floor(
      (soloTasks.total / tasksTotal) * 100
    )}% of your tasks are solo tasks.`;
  } else if (teamTasks.total > soloTasks.total) {
    return `Team Player|${Math.floor(
      (teamTasks.total / tasksTotal) * 100
    )}% of your tasks are team tasks.`;
  } else {
    return `Co-Worker|Your tasks were split evenly between solo and team effort.`;
  }
}

export function findMostUsedDeadline(
  data: genericTaskInt[],
  tasksTotal: number
) {
  const tasksWithDeadline = data.filter(
    (data: genericTaskInt) => data.name === "with deadline"
  )[0];
  const tasksWithoutDeadline = data.filter(
    (data: genericTaskInt) => data.name === "no deadline"
  )[0];
  if (tasksWithDeadline.total > tasksWithoutDeadline.total) {
    return `REWRITE Planner|${Math.floor(
      (tasksWithDeadline.total / tasksTotal) * 100
    )}% of your tasks have deadlines.`;
  } else if (tasksWithoutDeadline.total > tasksWithDeadline.total) {
    return `Free Spirit|${Math.floor(
      (tasksWithoutDeadline.total / tasksTotal) * 100
    )}% of your tasks can be finished anytime.`;
  } else {
    return `REWRITE Time Mapper|Your tasks were split evenly between those with deadlines and those without.`;
  }
}
