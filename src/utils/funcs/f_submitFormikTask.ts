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
import {
  AWAITED,
  DAILY,
  MONTHLY,
  NEVER,
  NONE,
  POST,
  PUT,
  TASK_CATEGORIES,
  WEEKLY,
} from "../const/str";
import { attemptPostOrEditTask } from "./f_tasks";

// B/E: Schema:
// {
//   category: { type: String, default: NONE, required: true },
//   title: { type: String, required: true },
//   desc: { type: String, required: true },
//   repeats: { type: String, required: true, enum: [NEVER, DAILY, WEEKLY, MONTHLY, STRING(NUMBER),] }, //
//   type: { type: String, default: SOLO, enum: [SOLO, TEAM], },
//   value: { type: Number, default: 0 },
//   createdBy: { type: Schema.Types.ObjectId, ref: "User" },
//   sharedWith: { default: [], type: [{ type: Schema.Types.ObjectId, ref: "User" }], },
//   status: { type: String, default: AWAITED, enum: [AWAITED, COMPLETED, IN_PROGRESS] },
//   deadline: { type: Date },
// },
// Formik adds:
// newCategory: "", // overrides category if defined
// repeated: "no", // "yes" or "no"
// repeatsOther: 0,
// repetitions: "1",
// shared: "no",
// repeatedRadio: null, // "yes" or "no" => show Repeated dropdown
// sharedRadio: null, // "yes" or "no" => show Shared dropdown
// Note, task cannot be sharedWith.length>1 AND repeats !== NEVER

export default async function submitFormikTask(
  e: initialValuesInt,
  newCategoryColor: string,
  sharedUsers: { selectedOptions: any },
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
  const { repeatedRadio, sharedRadio, repeats, repetitions } = e;
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
      // console.log("TASK WAS SET, SO I AM DISPATCHING AN EDIT.");
      const editedStatus = taskSet.status;
      const listOfTasks = editedStatus === AWAITED ? awaited : in_progress;
      const editedListOfTasks = listOfTasks.filter(
        (t: any) => t._id !== taskSet._id
      );
      editedListOfTasks.push(newTask);
      dispatch(EditTask(editedStatus, editedListOfTasks));
    } else if (repeats !== NEVER) {
      // console.log("TASK WAS REPEATED, SO I AM FIRING OFF A RELOAD.");
      // force reload when tasks are repeated
      const numOfRepetitions =
        repeats === DAILY
          ? 7
          : repeats === WEEKLY
          ? 4
          : repeats === MONTHLY
          ? 2
          : parseInt(repetitions);
      for (let i = 0; i < numOfRepetitions; i++) {
        dispatch(setNewTask(newTask));
      }
      setTimeout(() => history.push("/reload?pathname=tasks"), 500);
    } else {
      // console.log(
      //   "TASK WAS NOT SET OR REPEATED, SO I AM DISPATCHING A NEW TASK."
      // );
      dispatch(setNewTask(newTask));
    }
    if (
      !TASK_CATEGORIES.includes(newTask.category.toLowerCase()) &&
      !categories.includes(newTask.category.toLowerCase())
    ) {
      // console.log(
      //   "THERE WAS A NEW CATEGORY, SO I AM DISPATCHING A NEW CATEGORY."
      // );
      categories.push(newTask.category.toLowerCase());
      categoriesColors.push(newCategoryColor || "#ccc");
      dispatch(setNewCategory(categories));
      dispatch(setNewCategoryColors(categoriesColors));
    }
    if (initialData) {
      // console.log(
      //   "THERE WAS INITIAL DATA (THIS CAME FROM TASKS PAGE) SO I AM SHUFFLING THAT TOO."
      // );
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
    // console.log(
    //   "TASK WAS NOT REPEATED, SO AFTER SETTING INITIAL DATA, I AM JUST SETTING MODAL TO !CHANGED AND CLOSING IT."
    // );
    handleClose();
    setChanged({ title: false, value: false, category: false });
  } catch (error) {
    console.log(error);
  }
}
