import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "Pending" | "Completed";
  subtasks: string[];
}

export async function PUT(req: NextRequest) {
  try {
    const { id, title, description, dueDate, status, subtasks } =
      await req.json();
    if (!title || !description || !dueDate || !status || !id) {
      return NextResponse.json(
        {
          error: {
            message: "Missing required data.",
          },
        },
        { status: 400 }
      );
    } else {
      const filePath = path.join(process.cwd(), "lib/task.json");
      const file = await fs.readFile(filePath, "utf-8");
      const taskList = JSON.parse(file);
      const findTaskIndex = taskList?.findIndex(
        (task: Task) => id === task?.id
      );
      if (findTaskIndex !== -1) {
        const updatedTask = {
          id,
          title,
          description,
          dueDate,
          status,
          subtasks,
        };

        taskList[findTaskIndex] = updatedTask;
        await fs.writeFile(filePath, JSON.stringify(taskList, null, 2));

        revalidatePath("/", "page");
        revalidatePath("/api/task");
        return NextResponse.json(updatedTask, { status: 201 });
      } else {
        return NextResponse.json(
          {
            error: {
              message: "Task not found!",
            },
          },
          { status: 404 }
        );
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: {
          message: "Something went wrong.",
        },
      },
      { status: 500 }
    );
  }
}
