"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronRight,
  Edit,
  Trash2,
  Lightbulb,
} from "lucide-react";
import AddEditModal from "../common/AddEditModal";
import { DeleteTaskModal } from "./DeleteTaskModal";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "Pending" | "Completed";
  subtasks: string[];
}

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  const [isSubtasksOpen, setIsSubtasksOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleSuggestSubtasks = () => {
    setIsSubtasksOpen(true);
  };

  const onEdit = () => setIsModalOpen((prev: boolean) => !prev);
  const onDelete = () => setIsDeleteModalOpen((prev: boolean) => !prev);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="w-full lg:w-[43vw] shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <h3 className="font-semibold text-lg text-gray-900">
              {task.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {task.description}
            </p>
          </div>
          <Badge
            variant={task.status === "Completed" ? "default" : "secondary"}
            className={
              task.status === "Completed"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
            }
          >
            {task.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Due: {formatDate(task.dueDate)}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="flex items-center gap-1"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Button>
          <AddEditModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            task={task}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
          <DeleteTaskModal
            open={isDeleteModalOpen}
            onOpenChange={setIsDeleteModalOpen}
            id={task.id}
            taskTitle={task.title}
          />
          <Button
            size="sm"
            onClick={handleSuggestSubtasks}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
          >
            <Lightbulb className="w-4 h-4" />
            Suggest Subtasks
          </Button>
        </div>

        {task?.subtasks?.length >= 1 && (
          <Collapsible open={isSubtasksOpen} onOpenChange={setIsSubtasksOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 p-0 h-auto"
              >
                {isSubtasksOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  Subtasks ({task.subtasks?.length || 0})
                </span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="space-y-2 pl-4 border-l-2 border-blue-100">
                {task?.subtasks?.map((subtask, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                    <span className="text-sm text-gray-700">{subtask}</span>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}

export default TaskCard;
