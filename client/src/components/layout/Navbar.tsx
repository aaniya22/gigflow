import React from 'react';
import { LogOut, Moon, Sun, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface NavbarProps { darkMode: boolean; toggleDark: () => void; }

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDark }) => {
  const { user, logout } = useAuthStore();
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">G</span>
        </div>
        <span className="font-bold text-gray-900 dark:text-white text-lg">GigFlow</span>
        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full ml-1">Smart Leads</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <User size={16} />
          <span>{user?.name}</span>
          <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full capitalize">{user?.role}</span>
        </div>
        <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button onClick={logout} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500">
          <LogOut size={18} />
        </button>
      </div>
    </nav>
  );
};