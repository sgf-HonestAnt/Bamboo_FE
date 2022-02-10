import { History, Location } from "history";
import { Dispatch } from "redux";
import {
  EditTask,
  setNewCategory,
  setNewCategoryColors,
  setNewTask,
} from "../../redux/actions/tasks";
import {
  beautifulDnD,
  initialValuesInt,
  taskInt,
} from "../../typings/interfaces";
import { AWAITED, NEVER, NONE, POST, PUT, TASK_CATEGORIES } from "../const/str";
import { attemptPostOrEditTask } from "./f_tasks";

export default async function submitFormikTask(
  e: initialValuesInt,
  newCategoryColor: string | undefined,
  sharedUsers: { selectedOptions: any },
  setSharedUsers: any,
  taskSet: taskInt | null,
  categories: string[],
  categoriesColors: string[],
  awaited: taskInt[],
  in_progress: taskInt[],
  refreshToken: string | undefined,
  initialData: beautifulDnD | undefined,
  setInitialData: any,
  setChanged: any,
  handleClose: any,
  history: string[] | History<unknown>,
  location: Location<unknown> | undefined,
  dispatch: Dispatch<any>
) {
  // console.log("🙋Submitting Formik Task", e);
  // console.log("newCatcolor=>", newCategoryColor);
  // console.log(
  //   "sharedUsers=>",
  //   sharedUsers,
  //   "taskSet.sharedWith",
  //   taskSet?.sharedWith
  // );
  const {
    repeatedRadio,
    sharedRadio,
    repeats,
    // repetitions
  } = e;
  e.newCategoryColor = newCategoryColor;
  e.repeated = repeatedRadio;
  e.shared = sharedRadio;
  e.sharedWith = taskSet ? taskSet.sharedWith : sharedUsers?.selectedOptions;
  if (repeats === "other") {
    e.repeats = e.repeatsOther;
  }
  if (e.category === "") {
    e.category = NONE;
  }
  try {
    const method = taskSet ? PUT : POST;
    const taskId = taskSet ? taskSet._id : null;
    const newTask = await attemptPostOrEditTask(
      e,
      refreshToken,
      method,
      taskId,
      history,
      location
    );
    if (taskSet) {
      // "TASK WAS SET, SO I AM DISPATCHING AN EDIT."
      const editedStatus = taskSet.status;
      const listOfTasks = editedStatus === AWAITED ? awaited : in_progress;
      const editedListOfTasks = listOfTasks.filter(
        (t: any) => t._id !== taskSet._id
      );
      editedListOfTasks.push(newTask);
      dispatch(EditTask(editedStatus, editedListOfTasks));
      // } else if (repeats !== NEVER) {
      //   // console.log("TASK WAS REPEATED, SO I AM FIRING OFF A RELOAD.");
      //   // force reload when tasks are repeated
      //   const numOfRepetitions =
      //     repeats === DAILY
      //       ? 7
      //       : repeats === WEEKLY
      //       ? 4
      //       : repeats === MONTHLY
      //       ? 2
      //       : parseInt(repetitions);
      //   for (let i = 0; i < numOfRepetitions; i++) {
      //     dispatch(setNewTask(newTask));
      //   }
      //   setTimeout(() => history.push("/reload?pathname=tasks"), 500);
    } else {
      // "TASK WAS NOT SET, SO I AM DISPATCHING A NEW TASK."
      dispatch(setNewTask(newTask));
    }
    if (
      !TASK_CATEGORIES.includes(newTask.category.toLowerCase()) &&
      !categories.includes(newTask.category.toLowerCase())
    ) {
      // "THERE WAS A NEW CATEGORY, SO I AM DISPATCHING A NEW CATEGORY."
      categories.push(newTask.category.toLowerCase());
      categoriesColors.push(newCategoryColor || "#ccc");
      dispatch(setNewCategory(categories));
      dispatch(setNewCategoryColors(categoriesColors));
    }
    if (initialData) {
      // "THERE WAS INITIAL DATA (THIS CAME FROM TASKS PAGE) SO I AM SHUFFLING THAT TOO."
      if (taskSet) {
        const index = initialData.tasks.findIndex(
          (task: taskInt | undefined) => task?._id === taskSet._id
        );
        initialData.tasks[index] = newTask;
      } else {
        initialData.tasks.push(newTask); // push new task to list of tasks
        initialData.lists[0].taskIds.push(newTask._id); // push new id to awaited taskIds
      }
      const newData = {
        ...initialData,
        tasks: [...initialData.tasks!],
        lists: [...initialData.lists!],
      };
      setInitialData(newData);
    }
    if (repeats !== NEVER) {
      // "TASK WAS REPEATED, SO I AM FIRING OFF A RELOAD."
      // force reload when tasks are repeated
      setTimeout(() => history.push("/reload?pathname=tasks"), 500);
    } else {
      // "TASK WAS NOT REPEATED, SO I AM JUST SETTING MODAL TO !CHANGED AND CLOSING IT."
      setChanged({ title: false, value: false, category: false });
      setSharedUsers({ selectedOptions: [] });
      handleClose();
    }
  } catch (error) {
    console.log(error);
  }
}
