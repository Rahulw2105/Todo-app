import React, { useEffect, useState } from "react";
import { getTodos } from "../services/service";
import { FaListOl } from "react-icons/fa";
const TableTask = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const fetchedTodos = await getTodos();
      setTasks(fetchedTodos);
      console.log(fetchedTodos);
    }
    fetchData();
  }, []);
  if (tasks.length === 0) {
    <h1> Loading....</h1>;
  }
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <FaListOl />
          <h1 className="text-xl font-bold">tasks</h1>
        </div>
        <div>
          <button className="bg-yellow-500 text-white p-2 rounded-md">
            {" "}
            New task
          </button>
          <button className="bg-yellow-500 text-white ml-5 rounded-md p-2">
            {" "}
            Refresh{" "}
          </button>
        </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Assigned To"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-200"
        />
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Assigned To"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-200"
          />
        </div>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">Assigned To</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Due Date</th>
              <th className="py-2 px-4 border-b">Priority</th>
              <th className="py-2 px-4 border-b">Comments</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{task.assignedTo}</td>
                <td className="py-2 px-4 border-b">{task.status}</td>
                <td className="py-2 px-4 border-b">{task.dueDate}</td>
                <td className="py-2 px-4 border-b">{task.priority}</td>
                <td className="py-2 px-4 border-b">{task.comments}</td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableTask;
