import { Search } from "lucide-react";
import React from "react";

function EmptyTasks() {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
      <p className="text-gray-500 mb-4">
        Get started by adding your first task
      </p>
    </div>
  );
}

export default EmptyTasks;
