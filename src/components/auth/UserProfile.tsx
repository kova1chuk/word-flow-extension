import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export const UserProfile: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            {user?.user_metadata?.full_name || "User"}
          </p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
      </div>

      <button
        onClick={handleSignOut}
        className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-md transition-colors duration-200"
      >
        Sign out
      </button>
    </div>
  );
};
