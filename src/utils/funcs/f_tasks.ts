import { History, Location } from "history";
import { Dispatch } from "redux";
import {
  AddTaskToAwaited,
  AddTaskToCompleted,
  AddTaskToInProgress,
  RemTaskFromAwaited,
  RemTaskFromCompleted,
  RemTaskFromInProgress,
} from "../../redux/actions/tasks";
import {
  achievementInt,
  beautifulDnD,
  currentTasksInt,
  setTaskInt,
  taskInt,
  userInt,
} from "../../typings/interfaces";
import { taskUpdateType } from "../../typings/types";
import {
  GET,
  PUT,
  COMPLETED,
  DELETE,
  POST,
  ENDPOINT_TASKS,
} from "../const/str";
import checkToken from "./f_checkToken";
import { attemptPostAchievement } from "./f_achievements";
import { fillAchievementsAction } from "../../redux/actions/achievements";
import { refreshUserLevel, refreshUserPoints } from "./f_users";

export const getTask = async (id: string) => {
  // get single task belonging to the user
  // console.log("🙋Getting Single Task");
  const token = localStorage.getItem("token");
  try {
    const url = `${ENDPOINT_TASKS}/me/${id}`;
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
    const url = `${ENDPOINT_TASKS}/me`;
    // console.log("🙋Getting All My Tasks");
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
  // console.log("🙋Searching Task Belonging To User With Criteria");
  try {
    const url = `${ENDPOINT_TASKS}/query?createdBy=${_id}&${criteria}`;
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
  // console.log("🙋Getting Task By Deadline");
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
  // console.log("🙋Getting Tasks Created By User");
  try {
    const criteria = _id.length > 0 ? `?createdBy=${_id}` : "";
    const url = `${ENDPOINT_TASKS}/query${criteria}`;
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
  // console.log("🙋Getting Sorted, Queried Tasks");
  try {
    const url = `${ENDPOINT_TASKS}/query?${criteria}&sort=deadline&limit=25`;
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

export const attemptPostOrEditTask = async (
  // post new task
  form: setTaskInt,
  refreshToken: string | undefined,
  method: string,
  t_id: string | null,
  history: string[] | History<unknown>,
  location: Location<unknown> | undefined
) => {
  // console.log("✏️Posting or Editing New Task", form);
  try {
    const token = localStorage.getItem("token");
    // const username = await checkToken(refreshToken, history, location);
    // if (username) {
    const url =
      method === POST ? `${ENDPOINT_TASKS}/me` : `${ENDPOINT_TASKS}/me/${t_id}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const body = JSON.stringify(form); // if POST TASK includes newCategory, should also include newCategoryColor (both strings)
    const response = await fetch(url, { method, headers, body });
    const newTask = await response.json();
    return newTask;
    // }
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
    // console.log("🙋Marking Task Complete");
    const username = await checkToken(refreshToken, history, location);
    if (username) {
      for (let i = 0; i < taskIds.length; i++) {
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
  achievements: achievementInt[],
  initialData?: beautifulDnD,
  setInitialData?: any
) => {
  // console.log("🙋Updating Single Task");
  const token = localStorage.getItem("token");
  const { status } = taskUpdate;
  try {
    const url = `${ENDPOINT_TASKS}/me/${id}`;
    const method = PUT;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const body = JSON.stringify(taskUpdate);
    const response = await fetch(url, { method, headers, body });
    const responseAsJSON = await response.json();
    if (response.ok) {
      if (initialData) {
        setInitialData(initialData);
      }
      if (status === COMPLETED) {
        const { title, category, value } = responseAsJSON;
        // console.log(title, category, value)
        await attemptPostAchievement(title, category, dispatch, achievements);
        await refreshUserPoints(user, value, dispatch);
        refreshUserLevel(user, value, dispatch);
      }
      dispatch(fillAchievementsAction()); // 👈HERE!
    }
  } catch (error) {
    console.log(error);
  }
};

export const attemptDeleteTask = async (taskId: string) => {
  // delete single task
  // console.log("🙋Deleting Single Task");
  const token = localStorage.getItem("token");
  try {
    const url = `${ENDPOINT_TASKS}/me/${taskId}`;
    const method = DELETE;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(url, { method, headers });
    if (response.ok) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async (tasks: taskInt[]) => {
  // get all categories in use by the user
  // console.log("🙋Getting My Categories");
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
  // console.log("🙋Removing Me From Task");
  const token = localStorage.getItem("token");
  try {
    const url = `${ENDPOINT_TASKS}/remove/${taskId}`;
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
  destination: string | null, // awaited, in_progress, completed, null
  task: taskInt,
  currentTasks: currentTasksInt,
  // initialData: beautifulDnD,
  // setInitialData: any,
  dispatch: Dispatch<any>
) => {
  // console.log("🙋Changing Task Status / Deleting Completed Task");
  // Unhandled Rejection (TypeError): Cannot set properties of undefined (setting 'status')
  const { awaited, in_progress, completed } = currentTasks;
  if (destination) {
    task.status = destination;
  }
  if (destination === "awaited") {
    awaited.push(task!);
    dispatch(AddTaskToAwaited(awaited));
  }
  if (destination === "in_progress") {
    in_progress.push(task!);
    dispatch(AddTaskToInProgress(in_progress));
  }
  if (destination === "completed") {
    completed.push(task!);
    dispatch(AddTaskToCompleted(completed));
  }
  if (source === "awaited") {
    const index = awaited.indexOf(task!);
    awaited.splice(index, 1);
    dispatch(RemTaskFromAwaited(awaited));
  } else if (source === "in_progress") {
    const index = in_progress.indexOf(task!);
    in_progress.splice(index, 1);
    dispatch(RemTaskFromInProgress(in_progress));
  } else {
    const index = completed.indexOf(task!);
    completed.splice(index, 1);
    dispatch(RemTaskFromCompleted(completed));
  }
};
