import Api from "../api";
import { Task } from "../../types";

export const addTask = async (description: string): Promise<Task> => {
  return Api.post<unknown, Task>({ url: `/tasks`, body: { description } }).then(
    (response) => {
      return response;
    }
  );
};
