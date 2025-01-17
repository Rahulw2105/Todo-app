import axios from "axios";

const TASK_URL = "http://localhost:3000/api/tasks";
const DELETE_URL = "http://localhost:3000/api/task";

// edit todo and create new todo
export const saveTodos = async (task) => {
  if (task.Id) {
    try {
      const response = await axios.put(`${TASK_URL}/${task.Id}`);
      return response.data;
    } catch (err) {
      throw new Error(`Error while updating todos: ${err.message}`);
    }
  } else {
    try {
      const response = await axios.post(TASK_URL, task);
      return response.data;
    } catch (err) {
      throw new Error(`Error while saving new todo: ${err.message}`);
    }
  }
};
// to get all the todos
export const getTodos = async () => {
  try {
    const response = await axios.get(TASK_URL);
    return response.data;
  } catch (err) {
    throw new Error(`Error while fetching todos: ${err.message}`);
  }
};
// delete todo
export const deleteTodos = async (taskId) => {
  try {
    const response = await axios.delete(`${DELETE_URL}/${taskId}`);
    return response.data;
  } catch (err) {
    throw new Error(`Error while Deleting Task: ${err.message}`);
  }
};
