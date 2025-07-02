import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const { title, description, dueDate, status } = await req.json();
    if (!title || !description || !dueDate || !status) {
      return NextResponse.json(
        {
          error: {
            message: "Missing required data.",
          },
        },
        { status: 400 }
      );
    } else {
      const id = crypto.randomUUID();
      const createTask = {
        id,
        title,
        description,
        dueDate,
        status,
        subtasks: [],
      };

      const filePath = path.join(process.cwd(), "lib/task.json");
      const file = await fs.readFile(filePath, "utf-8");
      const taskList = JSON.parse(file);
      taskList.push(createTask);
      await fs.writeFile(filePath, JSON.stringify(taskList, null, 2));

      revalidatePath("/", "page");
      revalidatePath("/api/task");
      return NextResponse.json(createTask, { status: 201 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: {
          message: "Missing required data.",
        },
      },
      { status: 400 }
    );
  }
}
