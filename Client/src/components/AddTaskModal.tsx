import React from 'react';

interface AddTaskModalProps {
  isModalOpen: boolean;
  taskInput: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  AddTask: () => void;
  toggleModal: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isModalOpen,
  taskInput,
  handleInputChange,
  handleInputKeyDown,
  AddTask,
  toggleModal,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow">
        <input
          type="text"
          placeholder="Enter task"
          value={taskInput}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="border border-gray-500 p-2 mb-4 w-full"
        />
        <button
          className="bg-black text-white px-4 py-2 rounded hover:bg-red-300 hover:text-black"
          onClick={AddTask}
        >
          Add
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-red-300 hover:text-black ml-3"
          onClick={toggleModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddTaskModal;
