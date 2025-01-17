import React, { useState, useEffect } from "react";
import { saveTodos } from "../services/service";
import axios from "axios";

const FormModal = ({
  onCancel,
  onSave,
  taskToEdit = {},
  existingTodos,

  initialValues,
  editTaskId,
}) => {
  console.log(editTaskId);
  console.log(existingTodos);

  const [formData, setFormData] = useState({
    assignedTo: "",
    status: "",
    dueDate: "",
    priority: "",
    comments: "",
  });
  useEffect(() => {
    if (editTaskId) {
      const taskToEdit = existingTodos.find((task) => task._id === editTaskId);
      if (taskToEdit) {
        setFormData({
          _id: taskToEdit._id,
          assignedTo: taskToEdit.assignedTo || "",
          status: taskToEdit.status || "",
          dueDate: formatDate(taskToEdit.dueDate) || "",
          priority: taskToEdit.priority || "",
          comments: taskToEdit.comments || "",
        });
      }
    }
  }, [editTaskId, existingTodos]);
  const formatDate = (date) => {
    if (!date) return "";
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = ("0" + (newDate.getMonth() + 1)).slice(-2); // Adding leading zero
    const day = ("0" + newDate.getDate()).slice(-2); // Adding leading zero
    return `${year}-${month}-${day}`;
  };
  console.log(formData);
  function handleCancelClick() {
    onCancel();
  }
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {

  //       await saveTodos(formData);
  //       onSave(formData);
  //     } catch (error) {}
  //   };
  //   () => {
  //     if (editTaskId) {
  //       setFormData({
  //         assignedTo: existingTodos.assignedTo || "",
  //         status: existingTodos.status || "",
  //         dueDate: existingTodos.dueDate || "",
  //         priority: existingTodos.priority || "",
  //         comments: existingTodos.comments || "",
  //       });
  //       console.log(formData);
  //     }
  // }, [editTaskId]

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData);
  };

  async function handleSubmitForm() {
    // Check if editing an existing task
    if (editTaskId) {
      try {
        // Send a PUT request to update the task
        const response = await axios.put(
          `http://localhost:3000/api/tasks/${formData._id}`, // Correct the URL by removing the extra space
          formData // Send the updated data in the request body
        );
        console.log("Task updated successfully", response);
        // You can add logic to update the UI or close the modal here
      } catch (err) {
        console.log(`Failed to update task: ${err.message}`);
      }
    } else {
      // Creating a new task
      try {
        // Remove the _id from formData if it's a new task to avoid sending it in the POST request
        const { _id, ...taskData } = formData;

        const response = await axios.post(
          "http://localhost:3000/api/task", // URL for creating tasks
          taskData // Send the new task data without the _id
        );
        console.log("Task created successfully", response);
        // Handle the response, such as updating the UI or closing the modal
      } catch (err) {
        console.log(`Failed to create task: ${err.message}`);
      }
    }
  }
  //   async function handleSubmitForm() {
  //     if(editTaskId) {
  //     try {
  //       // Send a PUT request to update the task
  //       const response = await axios.put(
  //         `http://localhost:3000/api/tasks/${formData._id}`, // Correct the URL by removing the extra space
  //         formData // Send the updated data in the request body
  //       );
  //       console.log(response);
  //     } catch (err) {
  //       console.log(`Failed to update todo: ${err.message}`);
  //     }
  //   }}
  //   else {
  //      try {
  //         const {_id, ...todoData} = formData;
  //      const response = await axios.post("http://localhost:3000/api/task",todoData)
  //      }catch (err ){

  //      }
  //   }
  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">
        {initialValues ? "EditTask" : "New Task"}
      </h1>
      <form onSubmit={handleSubmitForm}>
        <div className="grid grid-cols-2 gap-4">
          {/* Assigned To */}
          <div>
            <label
              htmlFor="assignedTo"
              className="block text-sm font-medium text-gray-700"
            >
              Assigned To
            </label>
            <input
              type="text"
              name="assignedTo"
              id="assignedTo"
              value={formData.assignedTo}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            >
              <option value="">Select Status</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              id="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            />
          </div>

          {/* Priority */}
          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700"
            >
              Priority
            </label>
            <select
              name="priority"
              id="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* comments */}
        <div className="mt-4">
          <label
            htmlFor="comments"
            className="block text-sm font-medium text-gray-700"
          >
            comments
          </label>
          <textarea
            name="comments"
            id="comments"
            value={formData.comments}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            rows="4"
          ></textarea>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormModal;
// <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-2 gap-4">
//           {/* Assigned To */}
//           <div>
//             <label
//               htmlFor="assignedTo"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Assigned To
//             </label>
//             <input
//               type="text"
//               name="assignedTo"
//               id="assignedTo"
//               value={formData.assignedTo}
//               onChange={handleInputChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
//             />
//           </div>

//           {/* Status */}
//           <div>
//             <label
//               htmlFor="status"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Status
//             </label>
//             <select
//               name="status"
//               id="status"
//               value={formData.status}
//               onChange={handleInputChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
//             >
//               <option value="">Select Status</option>
//               <option value="Not Started">Not Started</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>

//           {/* Due Date */}
//           <div>
//             <label
//               htmlFor="dueDate"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Due Date
//             </label>
//             <input
//               type="date"
//               name="dueDate"
//               id="dueDate"
//               value={formData.dueDate}
//               onChange={handleInputChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
//             />
//           </div>

//           {/* Priority */}
//           <div>
//             <label
//               htmlFor="priority"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Priority
//             </label>
//             <select
//               name="priority"
//               id="priority"
//               value={formData.priority}
//               onChange={handleInputChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
//             >
//               <option value="">Select Priority</option>
//               <option value="Low">Low</option>
//               <option value="Normal">Normal</option>
//               <option value="High">High</option>
//             </select>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mt-4">
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Description
//           </label>
//           <textarea
//             name="description"
//             id="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
//             rows="4"
//           ></textarea>
//         </div>

//         <div className="mt-6 flex justify-end space-x-4">
//           <button
//             type="button"
//             className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
//           >
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   );
//};
