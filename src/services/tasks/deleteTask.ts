import Api from "../api";

export const deleteTask = async (id: number): Promise<boolean> => {
  return Api.delete({ url: `/tasks/${id}` })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};
