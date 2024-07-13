import React, { FC, useState } from 'react';
import {
  Dashboard,
  InsertDriveFile,
  ViewList,
  Scanner,
  Print,
  Menu,
} from '@mui/icons-material';

interface SidebarProps {
  onSelectView: (view: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ onSelectView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormsOpen, setIsFormsOpen] = useState(false);
  const [isTablesOpen, setIsTablesOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleFormsDropdown = () => {
    setIsFormsOpen(!isFormsOpen);
  };

  const toggleTablesDropdown = () => {
    setIsTablesOpen(!isTablesOpen);
  };

  return (
    <div className="fixed left-0 top-0 h-full w-72 bg-gray-900 text-gray-100 shadow-lg z-50">
      {/* Small screen navigation button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 bg-gray-800 rounded-lg shadow-lg absolute top-4 left-4 z-10"
      >
        <Menu className="w-6 h-6 text-gray-100" />
      </button>

      {/* Sidebar content */}
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-4 py-6 bg-gray-800">
          <h2 className="text-2xl font-semibold text-gray-100">RMY</h2>
        </div>

        {/* Sidebar items */}
        <div className="flex-1 overflow-y-auto">
          <ul className="mt-6 space-y-2">
            {/* Dashboard item */}
            <li>
              <a
                href="#"
                className="flex items-center p-4 text-gray-200 rounded-lg hover:bg-gray-800"
                onClick={() => onSelectView('Dashboard')}
              >
                <Dashboard className="w-6 h-6 mr-2" />
                <span>Dashboard</span>
              </a>
            </li>

            {/* Forms dropdown */}
            <li>
              <div
                className="flex items-center justify-between p-4 text-gray-200 rounded-lg hover:bg-gray-800 cursor-pointer"
                onClick={toggleFormsDropdown}
              >
                <div className="flex items-center">
                  <InsertDriveFile className="w-6 h-6 mr-2" />
                  <span>Forms</span>
                </div>
                {isFormsOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-.707.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-.707.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              {isFormsOpen && (
                <ul className="pl-8 space-y-2">
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-800"
                      onClick={() => onSelectView('FormLayout')}
                    >
                      <InsertDriveFile className="w-6 h-6 mr-2" />
                      <span>Form Layout</span>
                    </a>
                  </li>
                </ul>
              )}
            </li>

            {/* Tables dropdown */}
            <li>
              <div
                className="flex items-center justify-between p-4 text-gray-200 rounded-lg hover:bg-gray-800 cursor-pointer"
                onClick={toggleTablesDropdown}
              >
                <div className="flex items-center">
                  <ViewList className="w-6 h-6 mr-2" />
                  <span>Tables</span>
                </div>
                {isTablesOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-.707.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-.707.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              {isTablesOpen && (
                <ul className="pl-8 space-y-2">
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-800"
                      onClick={() => onSelectView('Incoming')}
                    >
                      <ViewList className="w-6 h-6 mr-2" />
                      <span>Incoming</span>
                    </a>
                  </li>
                </ul>
              )}
            </li>

            {/* Scan Document item */}
            <li>
              <a
                href="#"
                className="flex items-center p-4 text-gray-200 rounded-lg hover:bg-gray-800"
                onClick={() => onSelectView('ScanDocument')}
              >
                <Scanner className="w-6 h-6 mr-2" />
                <span>Scan Document</span>
              </a>
            </li>

            {/* Print Document item */}
            <li>
              <a
                href="#"
                className="flex items-center p-4 text-gray-200 rounded-lg hover:bg-gray-800"
                onClick={() => onSelectView('PrintDocument')}
              >
                <Print className="w-6 h-6 mr-2" />
                <span>Print Document</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
