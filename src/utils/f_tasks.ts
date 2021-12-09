import { History, Location } from "history";
import { Dispatch } from "redux";
import {
  AddTaskToAwaited,
  AddTaskToCompleted,
  AddTaskToInProgress,
  loadTasksAction,
  RemTaskFromAwaited,
  RemTaskFromCompleted,
  RemTaskFromInProgress,
} from "../redux/actions/tasks";
import {
  achievementInt,
  currentTasksInt,
  setTaskInt,
  taskInt,
  userInt,
} from "../typings/interfaces";
import { taskUpdateType } from "../typings/types";
import {
  BE_URL,
  GET,
  POST,
  PUT,
  TASKS,
  COMPLETED,
  ME,
  DELETE,
} from "./appConstants";
import checkToken from "./f_checkToken";
import { attemptPostAchievement } from "./f_achievements";
import {
  fillAchievementsAction,
  setNewAchievement,
} from "../redux/actions/achievements";
import { refreshUserLevel } from "./f_users";
import { setUserPoints, setUserTotalPoints } from "../redux/actions/user";

export const getTask = async (id: string) => {
  // get single task belonging to the user
  const token = localStorage.getItem("token");
  try {
    const url = `${BE_URL}/${TASKS}/me/${id}`;
    const method = GET;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      const task = await response.json();
      return task;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getTasks = async () => {
  // get multiple tasks belonging to the user
  const token = localStorage.getItem("token");
  try {
    const url = `${BE_URL}/${TASKS}/me`;
    const method = GET;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getTaskByQuery = async (criteria: string, _id: string) => {
  // query task created by specific user
  try {
    const url = `${BE_URL}/${TASKS}/query?createdBy=${_id}&${criteria}`;
    const method = GET;
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getTaskByDeadline = async (par: string | null) => {
  // get multiple, deadline-filtered tasks belonging to the user
  const tasks = await getTasks();
  const { awaited, in_progress } = tasks;
  const allTasks = awaited.concat(in_progress);
  const filtered = allTasks.filter(
    (t: { deadline: string | null }) => t.deadline === par
  );
  return filtered;
};
export const getAllTasks = async (_id: string) => {
  // get all tasks or all tasks created by one user
  try {
    const criteria = _id.length > 0 ? `?createdBy=${_id}` : "";
    const url = `${BE_URL}/${TASKS}/query${criteria}`;
    const method = GET;
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getTasksPageTasksQuery = async (criteria: string) => {
  // get tasks for the tasks page, sorted by deadline and limited by criteria
  try {
    const url = `${BE_URL}/${TASKS}/query?${criteria}&sort=deadline&limit=25`;
    const method = GET;
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      const tasks = await response.json();
      return tasks;
    }
  } catch (error) {
    console.log(error);
  }
};
export const attemptPostTask = async (
  // post new task
  form: setTaskInt,
  refreshToken: string | undefined,
  history: string[] | History<unknown>,
  location: Location<unknown> | undefined
) => {
  try {
    const token = localStorage.getItem("token");
    const username = await checkToken(refreshToken, history, location);
    if (username) {
      console.log("✏️attempt post task!");
      const url = `${BE_URL}/${TASKS}/${ME}`;
      const method = POST;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const body = JSON.stringify(form);
      console.log(body);
      const response = await fetch(url, { method, headers, body });
      const newTask = await response.json();
      return newTask;
    }
  } catch (error) {
    console.log("😥TROUBLE POSTING TASK", error);
    history.push("/login");
  }
};
export const attemptCompleteTasks = async (
  // mark task as complete
  user: userInt,
  taskIds: string[],
  refreshToken: string | undefined,
  achievements: achievementInt[],
  history: string[] | History<unknown>,
  location: Location<unknown> | undefined,
  dispatch: Dispatch<any>
) => {
  try {
    const username = await checkToken(refreshToken, history, location);
    if (username) {
      for (let i = 0; i < taskIds.length; i++) {
        console.log("ATTEMPTING TO COMPLETE TASK", i);
        const update = { status: "completed" };
        attemptUpdateTask(taskIds[i], update, user, dispatch, achievements);
      }
    }
  } catch (error) {
    console.log("😥TROUBLE MARKING TASK COMPLETE", error);
    history.push("/login");
  }
};
export const attemptUpdateTask = async (
  // update task status
  id: string,
  taskUpdate: taskUpdateType,
  user: userInt,
  dispatch: Dispatch<any>,
  achievements: achievementInt[]
) => {
  const token = localStorage.getItem("token");
  const { status } = taskUpdate;
  console.log(taskUpdate);
  try {
    console.log("ATTEMPTING TO UPDATE TASK STATUS", id);
    const url = `${BE_URL}/${TASKS}/me/${id}`;
    const method = PUT;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const body = JSON.stringify(taskUpdate);
    console.log(body);
    const response = await fetch(url, { method, headers, body });
    const responseAsJSON = await response.json();
    if (response.ok) {
      if (status === COMPLETED) {
        console.log("STATUS WAS COMPLETED, LET US POST ACHIEVEMENT FOR", id);
        const { title, category, value } = responseAsJSON;
        await attemptPostAchievement(title, category, dispatch, achievements);
        setUserPoints(user.xp + value);
        setUserTotalPoints(user.total_xp + value);
        refreshUserLevel(user);
      }
      dispatch(fillAchievementsAction()); // 👈HERE!
    }
  } catch (error) {
    console.log(error);
  }
};
export const getCategories = async (tasks: taskInt[]) => {
  // get all categories in use by the user
  let array: string[] = [];
  for (let i = 0; i < tasks.length; i++) {
    !array.includes(tasks[i].category) && array.push(tasks[i].category);
  }
  return array;
};
export const removeSelfFromTask = async (
  taskId: string,
  currentTasks: currentTasksInt,
  dispatch: Dispatch<any>
) => {
  const token = localStorage.getItem("token");
  try {
    console.log("ATTEMPTING TO DELETE SELF FROM TASK", taskId);
    const url = `${BE_URL}/${TASKS}/remove/${taskId}`;
    const method = DELETE;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      const { awaited, in_progress, completed } = currentTasks;
      const allTasks = awaited.concat(in_progress, completed);
      const task = allTasks.find((t) => t._id === taskId);
      if (task?.status === "awaited") {
        const index = awaited.indexOf(task);
        awaited.splice(index, 1);
        dispatch(RemTaskFromAwaited(awaited));
      } else if (task?.status === "in_progress") {
        const index = in_progress.indexOf(task);
        in_progress.splice(index, 1);
        dispatch(RemTaskFromInProgress(in_progress));
      } else if (task?.status === "completed") {
        const index = completed.indexOf(task);
        completed.splice(index, 1);
        dispatch(RemTaskFromCompleted(completed));
      } else {
        return;
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export const moveTaskBetweenStatus = async (
  source: string,
  destination: string,
  task: taskInt | undefined,
  currentTasks: currentTasksInt,
  dispatch: Dispatch<any>
) => {
  const { awaited, in_progress, completed } = currentTasks;
  if (destination === "awaited") {
    awaited.push(task!);
    dispatch(AddTaskToAwaited(awaited));
  } else if (destination === "in_progress") {
    in_progress.push(task!);
    dispatch(AddTaskToInProgress(in_progress));
  } else {
    completed.push(task!);
    dispatch(AddTaskToCompleted(completed));
  }
  if (source === "awaited") {
    const index = awaited.indexOf(task!);
    awaited.splice(index, 1);
    dispatch(RemTaskFromAwaited(awaited));
  } else {
    const index = in_progress.indexOf(task!);
    in_progress.splice(index, 1);
    dispatch(RemTaskFromInProgress(in_progress));
  }
  // Cannot move Completed Tasks back.
};
