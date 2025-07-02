"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteTaskModalProps {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskTitle: string;
}

export function DeleteTaskModal({
  id,
  open,
  onOpenChange,
  taskTitle,
}: DeleteTaskModalProps) {
  const router = useRouter();

  const handleConfirm = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/task/delete`,
        {
          method: "DELETE",
          body: JSON.stringify({ id }),
        }
      );
      const deletedData = await res.json();
      console.log(deletedData);
    } catch (error) {
      console.log(error);
    }
    router.refresh();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Delete Task
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 mt-1">
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-gray-700">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900">{taskTitle}</span>?
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This will permanently remove the task and all its associated data.
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 focus:ring-red-500"
          >
            Delete Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
