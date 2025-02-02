import React, { useEffect, useState } from "react";
import { getTodos, deleteTodos, saveTodos } from "../services/service";
import { FaListOl } from "react-icons/fa";
import { Modal } from "antd";
import DeleteModal from "./DeleteModal";
import FormModal from "./FormModal";
const TableTask = () => {
  const [tasks, setTasks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState();
  const [showFormModal, setShowFormModal] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  useEffect(() => {
    async function fetchData() {
      const fetchedTodos = await getTodos();
      setTasks(fetchedTodos);
      console.log(fetchedTodos);
    }
    fetchData();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedTaskId(id);
    console.log(id);

    setShowDeleteModal(true);
  };
  function handleDeleteModal() {
    setShowDeleteModal(false);
  }
  //   function handleFormModal() {
  //     setShowFormModal(false);
  //   }
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodos(id);
      console.log(`Task with ID ${id} deleted successfully`);

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));

      // Close modal and reset selected task ID
      setSelectedTaskId(null);
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  //edit
  function handleEditClick(id) {
    // const taskToEdit = tasks.find((task) => task._id === id);
    // setInitialValues(taskToEdit); // Pass the task as initial values
    setShowFormModal(true);
    console.log(id);
    setSelectedTaskId(id);
  }

  async function handleEditSave(updatedTask) {
    try {
      if (initialValues) {
        // Editing existing task
        await saveTodos(updatedTask);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
      } else {
        // Creating new task
        const newTask = await saveTodos(updatedTask);
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }
      setShowFormModal(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  }

  // new task
  function handleNewTask() {
    setShowFormModal(true);
  }
  // refresh Button
  async function handleRefresh() {
    await window.location.reload();
  }
  const indexOfLastTask = currentPage * recordsPerPage;
  const indexOfFirstTask = indexOfLastTask - recordsPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <FaListOl />
          <h1 className="text-xl  text-red-600 font-bold">tasks</h1>
          {tasks.length}Records
        </div>
        <div>
          <button
            className="bg-yellow-500 text-white p-2 rounded-md"
            onClick={handleNewTask}
          >
            {" "}
            New task
          </button>
          <button
            className="bg-yellow-500 text-white ml-5 rounded-md p-2"
            onClick={handleRefresh}
          >
            {" "}
            Refresh{" "}
          </button>
        </div>
      </div>
      <div className="mb-4">
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
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleEditClick(task._id)}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDeleteClick(task._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-4">
          <button
            className="px-3 py-1 border border-gray-300 rounded-l disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            First
          </button>
          <button
            className="px-3 py-1 border border-gray-300 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </button>
          <span className="px-3 py-1 border border-gray-300 bg-gray-100">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-3 py-1 border border-gray-300 disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
          <button
            className="px-3 py-1 border border-gray-300 rounded-r disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            Last
          </button>
        </div>
      </div>
      {showFormModal && (
        <FormModal
          editTaskId={selectedTaskId}
          //   onCancel={handleFormModal}
          onSave={handleEditSave}
          existingTodos={tasks}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          taskId={selectedTaskId}
          onDelete={handleDeleteTodo}
          onClose={handleDeleteModal}
        />
      )}
    </div>
  );
};

export default TableTask;
