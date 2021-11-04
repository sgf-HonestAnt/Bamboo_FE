import { Dispatch } from "redux";
import updateTask from "./updateTask";

const completeTasks = async (taskIds: string[], dispatch: Dispatch<any>) => {
  for (let i = 0; i < taskIds.length; i++) {
    const update = { status: "completed" };
    updateTask(taskIds[i], update, dispatch);
    console.log("updating=>", taskIds[i]);
  }
};

export default completeTasks;
