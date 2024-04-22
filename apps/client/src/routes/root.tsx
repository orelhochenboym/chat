import React from 'react';
import { Outlet } from 'react-router-dom';

export const Root: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <p>Hello Chat</p>
      <Outlet />
    </div>
  );
};
