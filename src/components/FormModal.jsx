import React from "react";

const FormModal = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    assignedTo: "",
    status: "",
    DueDate: "",
    priority: "",
    comments: "",
  });

  function handleClick() {
    onCancel();
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData);
  };

  handleSubitForm(e) {
    e.preventDefault()
  }
  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">New Task</h1>
      <form>
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
              //               onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            rows="4"
          ></textarea>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={handleClick}
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
