import React, { useState, useEffect } from 'react';
import '../index.css';
import api from '../axiosConfig';
import Navbar from '../components/Navbar';
import AddTaskModal from '../components/AddTaskModal';
import TaskItem from '../components/TaskItem';
//import myImg from '../assets/dp.png';

interface Task {
  task: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [taskInput, setTaskInput] = useState<string>('');
  const [list, setList] = useState<Task[]>([]);
  const [addClicked, setAddClicked] = useState<boolean>(false);
  const [deleteClick, setDeleteClick] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [arrowDown, setArrowDown] = useState<boolean>(false);

  const toggleDropdown = () => {
    setDropDown(!dropDown);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setDropDown(false);
  };

  const toggleDelete = (task: string) => {
    setTaskToDelete(task);
    setDeleteClick(!deleteClick);
  };

  const handleOptionChange = async (task: string) => {
    const updatedList = list.map((item) =>
      item.task === task ? { ...item, completed: !item.completed } : item
    );
    setList(updatedList);

    try {
      const response = await api.patch('/api/tasks/updateTasks', {
        task: task,
        completed: updatedList.find((item) => item.task === task)?.completed,
      });
      console.log('Task updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  const AddTask = async () => {
    if (taskInput.trim() !== '') {
      try {
        const response = await api.post('/api/tasks/createTasks', {
          task: taskInput,
          completed: false,
        });
        setList([...list, { task: taskInput, completed: false }]);
        fetchTasks();
        setTaskInput('');
        setAddClicked(true);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const deleteTask = async (taskToDelete: string) => {
    try {
      const response = await api.delete('/api/tasks/deleteTasks', {
        data: { task: taskToDelete },
      });
      const updatedList = list.filter((task) => task.task !== taskToDelete);
      fetchTasks();
      setList(updatedList);
      setDeleteClick(false);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await api.get('/api/tasks/getTasks');
      const tasksWithCompleted: Task[] = response.data.map((task: any) => ({
        task: task.task,
        completed: task.completed || false,
      }));
      setList(tasksWithCompleted);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleArrowDown = () => {
    setArrowDown(true);
    fetchTasks();
  };

  const handleArrowUp = () => {
    setArrowDown(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      AddTask();
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    setIsVisible(arrowDown);
  }, [arrowDown]);

  return (
    <div className="relative w-full h-screen">
      <div className="bg-hero-pattern bg-cover bg-center bg-fixed w-full h-screen">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10">
          <div className="flex justify-center items-center pt-40">
            {/**  <img src={myImg} alt="Image" className="w-40 h-30 rounded-full" /> */}
          </div>

          <div className="flex items-center justify-center h-40">
            <Navbar
              dropDown={dropDown}
              toggleDropdown={toggleDropdown}
              toggleModal={toggleModal}
              arrowDown={arrowDown}
              handleArrowDown={handleArrowDown}
              handleArrowUp={handleArrowUp}
            />
          </div>

          <AddTaskModal
            isModalOpen={isModalOpen}
            taskInput={taskInput}
            handleInputChange={handleInputChange}
            handleInputKeyDown={handleInputKeyDown}
            AddTask={AddTask}
            toggleModal={toggleModal}
          />

          {arrowDown && (
            <div className="flex flex-col items-center">
              {list.map((task, index) => (
                <TaskItem
                  key={index}
                  task={task}
                  handleOptionChange={handleOptionChange}
                  toggleDelete={toggleDelete}
                  deleteClick={deleteClick}
                  taskToDelete={taskToDelete}
                  deleteTask={deleteTask}
                  setDeleteClick={setDeleteClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;

