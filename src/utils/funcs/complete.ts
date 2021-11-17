import { History, Location } from "history";
import { Dispatch } from "redux";
import checkToken from "../funcCheckToken";
import updateTask from "./updateTask";

const attemptCompleteTasks = async (
  taskIds: string[],
  refreshToken: string | undefined,
  history: string[] | History<unknown>,
  location: Location<unknown> | undefined,
  dispatch: Dispatch<any> 
) => {
  try { 
    const username = await checkToken(refreshToken, history, location);
    if (username) {
      for (let i = 0; i < taskIds.length; i++) {
        console.log("ATTEMPTING TO COMPLETE TASK", i)
        const update = { status: "completed" };
        updateTask(taskIds[i], update, dispatch);
      }
    }
  } catch (error) {
    console.log("😥TROUBLE MARKING TASK COMPLETE", error)
    history.push("/login");
  }
};

export default attemptCompleteTasks;
