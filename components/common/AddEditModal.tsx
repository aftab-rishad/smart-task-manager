"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "Pending" | "Completed";
  subtasks: string[];
}

interface TaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
}

function AddEditModal({ open, onOpenChange, task }: TaskFormProps) {
  const [formData, setFormData] = useState(
    task ?? {
      title: "",
      description: "",
      dueDate: "",
      status: "Pending" as "Pending" | "Completed",
      subtasks: [],
    }
  );

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!task) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/task/add`,
          {
            method: "POST",
            body: JSON.stringify(formData),
          }
        );
        const createdData = await res.json();
        console.log(createdData);
      } else {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/task/update`,
          {
            method: "PUT",
            body: JSON.stringify(formData),
          }
        );
        const updatedData = await res.json();
        console.log(updatedData);
      }
    } catch (error) {
      console.log(error);
    }

    router.refresh();
    onOpenChange(false);
  };

  const handleChangeStatus = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Add New Task"}</DialogTitle>
          <DialogDescription>
            {task
              ? "Update the task details below."
              : "Create a new task by filling out the form below."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData?.title}
              onChange={handleChange}
              name="title"
              placeholder="Enter task title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData?.description}
              onChange={handleChange}
              name="description"
              placeholder="Enter task description"
              rows={3}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData?.dueDate}
              onChange={handleChange}
              name="dueDate"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData?.status}
              onValueChange={(value: string) =>
                handleChangeStatus("status", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {task ? "Update Task" : "Add Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddEditModal;
