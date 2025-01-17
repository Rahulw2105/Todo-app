import React from "react";

const DeleteModal = ({ onClose, onDelete, taskId }) => {
  function handleClose() {
    onClose();
  }
  function handleDelete() {
    onDelete(taskId);
    onClose();
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96">
        <div className="bg-red-500 text-white text-lg font-bold py-2 px-4 flex justify-between items-center">
          <span>Delete</span>
          <button className="text-white hover:text-gray-200">&times;</button>
        </div>
        <div className="p-4 text-center">
          <p>Do you want to delete the task ?</p>
        </div>
        <div className="flex justify-center space-x-4 p-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 "
            onClick={handleClose}
          >
            No
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleDelete}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
