import React from "react";
import { Outlet } from "react-router-dom";
export interface DashboardLayoutProps {
  title: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ title }) => {
  return (
    <div id="dashboard-layout" className="h-screen flex flex-col">
      <div
        id="dashboard-header"
        className="w-full bg-gray-800 text-white p-4 flex justify-center"
      >
        <h1>{title}</h1>
      </div>
      <div id="dashboard-body" className="h-full flex flex-1">
        <div id="dashboard-nav" className="w-1/4 bg-gray-200 p-4">
          <nav id="dashboard-nav-links">
            <ul id="dashboard-nav-links-list">
              <li id="dashboard-nav-home-link" className="mb-2">
                <a href="/" className="text-blue-500 hover:underline">
                  Home
                </a>
              </li>
              <li id="dashboard-nav-tasks-link" className="mb-2">
                <a href="/tasks" className="text-blue-500 hover:underline">
                  Tasks
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail" className="flex flex-1 bg-white p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
