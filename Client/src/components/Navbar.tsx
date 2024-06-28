import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

interface NavbarProps {
  dropDown: boolean;
  toggleDropdown: () => void;
  toggleModal: () => void;
  arrowDown: boolean;
  handleArrowDown: () => void;
  handleArrowUp: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  dropDown, 
  toggleDropdown, 
  toggleModal, 
  arrowDown, 
  handleArrowDown, 
  handleArrowUp 
}) => {
  return (
    <nav className="bg-white bg-opacity-40 px-8 py-2 flex justify-between lg:w-[30%] w-80 sm:w-[50%]">
      <div className="flex justify-between">
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
        {arrowDown ? (
          <IoIosArrowUp
            className="mr-1 text-gray-700 hover:cursor-pointer"
            onClick={handleArrowUp}
          />
        ) : (
          <IoIosArrowDown
            className="text-gray-700 hover:cursor-pointer"
            onClick={handleArrowDown}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
