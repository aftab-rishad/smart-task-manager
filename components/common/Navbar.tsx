"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddEditModal from "./AddEditModal";

function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Smart Task Manager AI
            </h1>
          </div>
          <Button
            onClick={() => setIsOpen((prev: boolean) => !prev)}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
          <AddEditModal onOpenChange={setIsOpen} open={isOpen} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
