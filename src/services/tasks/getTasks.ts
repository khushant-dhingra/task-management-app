import Api from "../api";
import { Task } from "../../types";

export const getTasks = (): Promise<Task[]> => {
  return Api.get<Task[]>({ url: `/tasks` }).then((response) => {
    return response;
  });
};
