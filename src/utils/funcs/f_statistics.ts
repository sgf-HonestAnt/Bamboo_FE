import {
  categoryTaskInt,
  currentTasksInt,
  genericTaskInt,
  taskInt,
} from "../../typings/interfaces";
import {
  AWAITED,
  COMPLETED,
  IN_PROGRESS,
  NONE,
  SOLO,
  TEAM,
} from "../const/str";

export const mapByStatus = async (tasks: currentTasksInt) => {
  const { awaited, in_progress, completed } = tasks;
  const tasksByStatus = [
    { title: AWAITED, tasks: awaited },
    { title: IN_PROGRESS, tasks: in_progress },
    { title: COMPLETED, tasks: completed },
  ];
  let allByStatus: genericTaskInt[] = [];
  // eslint-disable-next-line array-callback-return
  tasksByStatus.map((task, i) => {
    allByStatus.push({
      name: task.title,
      total: task.tasks.length,
      tasks: task.tasks,
    });
  });
  return allByStatus;
};

export const mapByCategory = async (
  allTasks: taskInt[],
  categories: string[]
) => {
  let allByCategory: categoryTaskInt[] = [];
  // eslint-disable-next-line array-callback-return
  const tasksWithNoCategory = allTasks.filter((task) => task.category === NONE);
  if (tasksWithNoCategory.length > 0) {
    // eslint-disable-next-line array-callback-return
    categories.map((category, i) => {
      allByCategory.push({
        category,
        total: 0,
        awaited: 0,
        in_progress: 0,
        completed: 0,
      });
    });
  } else {
    categories
      .filter((category) => category !== NONE)
      // eslint-disable-next-line array-callback-return
      .map((category, i) => {
        allByCategory.push({
          category,
          total: 0,
          awaited: 0,
          in_progress: 0,
          completed: 0,
        });
      });
  }
  for (let i = 0; i < allTasks.length; i++) {
    for (let j = 0; j < allByCategory.length; j++) {
      if (allTasks[i].category === allByCategory[j].category) {
        allByCategory[j].total++;
      }
      if (
        allTasks[i].category === allByCategory[j].category &&
        allTasks[i].status === AWAITED
      ) {
        allByCategory[j].awaited++;
      }
      if (
        allTasks[i].category === allByCategory[j].category &&
        allTasks[i].status === IN_PROGRESS
      ) {
        allByCategory[j].in_progress++;
      }
      if (
        allTasks[i].category === allByCategory[j].category &&
        allTasks[i].status === COMPLETED
      ) {
        allByCategory[j].completed++;
      }
    }
  }
  return allByCategory;
};

export const createDataForTagCloud = async (
  allByCategory: categoryTaskInt[]
) => {
  const newData = [];
  for (let i = 0; i < allByCategory.length; i++) {
    newData.push({
      value: allByCategory[i].category,
      count: allByCategory[i].total,
    });
  }
  return newData;
};

export const mapByValue = async (allTasks: taskInt[]) => {
  let allByValue: genericTaskInt[] = [
    { name: "10xp", total: 0, tasks: [] },
    { name: "20xp", total: 0, tasks: [] },
    { name: "30xp", total: 0, tasks: [] },
    { name: "40xp", total: 0, tasks: [] },
    { name: "50xp", total: 0, tasks: [] },
  ];
  // eslint-disable-next-line array-callback-return
  allTasks.map((task, i) => {
    if (allTasks[i].value === 10) {
      allByValue[0].total++;
      allByValue[0].tasks.push(allTasks[i]);
    } else if (allTasks[i].value === 20) {
      allByValue[1].total++;
      allByValue[1].tasks.push(allTasks[i]);
    } else if (allTasks[i].value === 30) {
      allByValue[2].total++;
      allByValue[2].tasks.push(allTasks[i]);
    } else if (allTasks[i].value === 40) {
      allByValue[3].total++;
      allByValue[3].tasks.push(allTasks[i]);
    } else {
      allByValue[4].total++;
      allByValue[4].tasks.push(allTasks[i]);
    }
  });
  return allByValue;
};

export const mapByType = async (allTasks: taskInt[]) => {
  let allByType: genericTaskInt[] = [
    {
      name: SOLO,
      total: 0,
      tasks: [],
    },
    {
      name: TEAM,
      total: 0,
      tasks: [],
    },
  ];
  for (let i = 0; i < allTasks.length; i++) {
    for (let j = 0; j < allByType.length; j++) {
      if (allTasks[i].type === allByType[j].name) {
        allByType[j].tasks.push(allTasks[i]);
        allByType[j].total++;
      }
    }
  }
  return allByType;
};

export const mapByDeadline = async (allTasks: taskInt[]) => {
  let allByDueDate: genericTaskInt[] = [
    {
      name: "with deadline",
      total: 0,
      tasks: [],
    },
    {
      name: "no deadline",
      total: 0,
      tasks: [],
    },
  ];
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].deadline) {
      allByDueDate[0].tasks.push(allTasks[i]);
      allByDueDate[0].total++;
    } else {
      allByDueDate[1].tasks.push(allTasks[i]);
      allByDueDate[1].total++;
    }
  }
  allByDueDate[0].tasks.sort(function (a, b) {
    return new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime();
  });
  return allByDueDate;
};

export const getUnusedCategories = async (allByCategory: categoryTaskInt[]) => {
  let unusedCategories = [];
  for (let i = 0; i < allByCategory.length; i++) {
    if (allByCategory[i].total === 0) {
      unusedCategories.push(allByCategory[i]);
    }
  }
  return unusedCategories;
};

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
  )[0]
    ? data.filter((data: genericTaskInt) => data.name === AWAITED)[0].total
    : 0;
  const progressingTasks = data.filter(
    (data: genericTaskInt) => data.name === IN_PROGRESS
  )[0]
    ? data.filter((data: genericTaskInt) => data.name === IN_PROGRESS)[0].total
    : 0;
  const completedTasks = data.filter(
    (data: genericTaskInt) => data.name === COMPLETED
  )[0]
    ? data.filter((data: genericTaskInt) => data.name === COMPLETED)[0].total
    : 0;
  if (
    awaitedTasks > progressingTasks &&
    awaitedTasks > completedTasks
  ) {
    return `Procrastinor|${Math.floor(
      (awaitedTasks / tasksTotal) * 100
    )}% of your tasks are marked 'Awaited'.`;
  } else if (
    progressingTasks > awaitedTasks &&
    progressingTasks > completedTasks
  ) {
    return `Powerhouse|${Math.floor(
      (progressingTasks / tasksTotal) * 100
    )}% of your tasks are marked 'In Progress' .`;
  } else if (
    completedTasks > awaitedTasks &&
    completedTasks > progressingTasks
  ) {
    return `Big Achiever|${Math.floor(
      (completedTasks / tasksTotal) * 100
    )}% of your tasks are marked 'Completed'.`;
  } else if (
    completedTasks === awaitedTasks &&
    completedTasks === progressingTasks
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
