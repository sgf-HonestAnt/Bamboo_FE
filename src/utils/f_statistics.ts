import { dataInt } from "../typings/interfaces";

export const returnMessage = (taskData: dataInt, timeSpecific: string) => {
    const {allByType} = taskData
    return allByType[0].value > allByType[1].value
    ? `You have mostly ${allByType[0].name} tasks ${timeSpecific}`
    : allByType[0].value < allByType[1].value
    ? `You have mostly ${allByType[1].name} tasks ${timeSpecific}`
    : `Your tasks are evenly split between team and solo ${timeSpecific}`;
}