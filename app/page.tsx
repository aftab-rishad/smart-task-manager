import EmptyTasks from "@/components/home/EmptyTasks";
import StatusCard from "@/components/home/StatusCard";
import TaskCard from "@/components/home/TaskCard";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "Pending" | "Completed";
  subtasks: string[];
}

export default async function Home() {
  let allTesks = [];
  let pendingTasks = [];
  let completedTasks = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/task`, {
      cache: "no-store",
    });
    allTesks = await res.json();
    pendingTasks = allTesks?.filter((task: Task) => task?.status === "Pending");
    completedTasks = allTesks?.filter(
      (task: Task) => task?.status === "Completed"
    );
  } catch (error) {
    console.log(error);
    allTesks = [];
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center flex-wrap gap-6 mb-8">
          <StatusCard status="Total Tasks" length={allTesks.length} />
          <StatusCard status="Pending" length={pendingTasks.length} />
          <StatusCard status="Completed" length={completedTasks.length} />
        </div>
        {allTesks?.length === 0 ? (
          <EmptyTasks />
        ) : (
          <div className="flex justify-center flex-wrap gap-4">
            {allTesks?.map((task: Task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
