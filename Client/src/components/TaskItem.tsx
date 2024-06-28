import React from 'react';
import { RxDragHandleDots2 } from 'react-icons/rx';

interface Task {
  task: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  handleOptionChange: (task: string) => void;
  toggleDelete: (task: string) => void;
  deleteClick: boolean;
  taskToDelete: string | null;
  deleteTask: (task: string) => void;
  setDeleteClick: (value: boolean) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  handleOptionChange,
  toggleDelete,
  deleteClick,
  taskToDelete,
  deleteTask,
  setDeleteClick,
}) => {
  return (
    <div
      className={`flex justify-between items-start bg-white py-3 px-3 border border-gray-400 lg:w-[30%] w-80 sm:w-[50%]
      ${task.task === taskToDelete ? 'rounded-t-lg' : ''}
      ${task.task === taskToDelete ? 'rounded-b-lg' : ''}`}
      style={{ wordBreak: 'break-all' }}
    >
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleOptionChange(task.task)}
            className="h-4 w-4"
          />
          <p className="ml-3">{task.task}</p>
        </label>
      </div>
      <div>
        <RxDragHandleDots2
          size={20}
          className="hover:cursor-pointer"
          onClick={() => toggleDelete(task.task)}
        />
        {deleteClick && taskToDelete === task.task && (
          <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow">
              <p className="mb-3">Are you sure you want to delete?</p>
              <div className="flex items-center justify-center">
                <button
                  className="bg-black text-white px-4 py-2 rounded hover:bg-red-300 hover:text-black"
                  onClick={() => deleteTask(task.task)}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-red-300 hover:text-black ml-3"
                  onClick={() => setDeleteClick(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
