import React, { useState, useEffect } from 'react';
import './index.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import { RxDragHandleDots2 } from 'react-icons/rx';
import myImg from './assets/dp.png';
import api from './axiosConfig';

const TodoApp = () => {
    const [dropDown, setDropDown] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [taskInput, setTaskInput] = useState('');
    const [list, setList] = useState([]);
    const [addClicked, setAddClicked] = useState(false);
    const [deleteClick, setDeleteClick] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null); 
    const [arrowDown, setArrowDown] = useState(false);
  

    const toggleDropdown = () => {
      setDropDown(!dropDown);
    };
  
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
      setDropDown(!dropDown);
    };
  
    const toggleDelete = (task) => {
      setTaskToDelete(task); 
      setDeleteClick(!deleteClick);
    };
  
    const handleOptionChange = async (task) => {
     
        const updatedList = list.map((item) =>
          item.task === task ? { ...item, completed: !item.completed } : item
        );
        setList(updatedList);
    
      try {
        const response = await api.post('/api/tasks/updateTasks', {
          task: task,
          completed: updatedList.find((item) => item.task === task).completed, 
        });
        console.log('Task updated successfully:', response.data);

      } catch (error) {
        console.error('Error updating task:', error);
      }
    };
    
  
    const handleInputChange = (e) => {
      setTaskInput(e.target.value);
    };
  
    const AddTask = async() => {
      if (taskInput.trim() !== '') {
        try {
          const response = await api.post('/api/tasks/createTasks', {
            task: taskInput,
            completed: false,
          });
          setList([...list, { task: taskInput, completed: false }]);
         // setList([...list, taskInput]);
          fetchTasks();
          setTaskInput('');
          setAddClicked(true);
          setIsModalOpen(false);
        } catch (error) {
          console.error('Error adding task:', error);
        }
      }
    };
  
    const deleteTask = async(taskToDelete) => {
      try {
        const response = await api.post('/api/tasks/deleteTasks', {
          task: taskToDelete,
        
        });
        const updatedList = list.filter(task => task !== taskToDelete);
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
        const tasksWithCompleted = response.data.map((task) => ({
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
  }

  const handleArrowUp = () => {
    setArrowDown(false);
  }
  

  const handleInputKeyDown = (e) => {
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
        <img src={myImg} alt="Image" className="w-40 h-30 rounded-full" />
      </div>

      <div className="flex items-center justify-center h-40">
        <nav className="bg-white bg-opacity-40 px-8 py-2 flex justify-between lg:w-[30%] w-80 sm:w-[50%]">
          <div className='flex justify-between'>
          <div className="flex items-center">
            <GiHamburgerMenu
              size={30}
              className="text-gray-700 hover:cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropDown && (
              <div className="absolute bg-white mt-[90px] lg:px-15 md:px-5 xl:px-15 px-20 sm:px-6 py-2 rounded shadow lg:w-[15%] sm:w-[30%] hover:bg-gray-200">
                <button className="hover:cursor-pointer" onClick={toggleModal}>
                  Add Task
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center ml-3">To do today</div>
          </div>
          <div className="flex items-center">
            {arrowDown && (
              
               <IoIosArrowUp className="mr-1 text-gray-700 hover:cursor-pointer" onClick={handleArrowUp} />

            )}
            {!arrowDown && (
            <IoIosArrowDown className="text-gray-700 hover:cursor-pointer" onClick={handleArrowDown}/>
          )}
          </div>
        </nav>

        {isModalOpen && (
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
        )}
      </div>

      {arrowDown && (
     <div
     className={'flex flex-col items-center'}
   >
        {list.map((task, index) => (
          <div
            key={index}
            className={`flex justify-between items-start bg-white py-3 px-3 border border-gray-400 lg:w-[30%] w-80 sm:w-[50%] 
              ${index === 0 ? 'rounded-t-lg' : ''} 
              ${index === list.length - 1 ? 'rounded-b-lg' : ''}`}
              style={{wordBreak: 'break-all'}}
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
          
        ))}
      </div>

      
    )}
     </div>
    </div>
    
  </div>
);
};

export default TodoApp;




         