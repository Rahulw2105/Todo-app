import axios from "axios";

const TASK_URL = "http://localhost:3000/api/tasks";

// to get all the todos
export const getTodos = async () => {
  try {
    const response = await axios.get(TASK_URL);
    return response.data;
  } catch (err) {
    throw new Error(`Error while fetching todos: ${err.message}`);
  }
};
//
export const deleteTodos = () => {};
