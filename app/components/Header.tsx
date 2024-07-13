import React, { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none"> {/* Added mb-4 for margin-bottom */}
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-white text-lg">Record Management System</h1>
        <button className="text-white">Login</button>
      </div>
    </header>
  );
};

export default Header;
