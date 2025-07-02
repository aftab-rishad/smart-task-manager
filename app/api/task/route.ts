import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const filePath = path.join(process.cwd(), "lib/task.json");
  const data = await fs.readFile(filePath, "utf-8");
  const tasks = JSON.parse(data);

  return NextResponse.json(tasks);
}
