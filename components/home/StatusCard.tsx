import { cn } from "@/lib/utils";

function StatusCard({ status, length }: { status: string; length: number }) {
  return (
    <div className="bg-white w-full lg:w-96 rounded-lg shadow-sm p-6 border">
      <div className="flex items-center">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{status}</p>
          <p
            className={cn(
              "text-2xl font-bold",
              status === "Pending"
                ? "text-yellow-600"
                : status === "Completed"
                ? "text-green-600"
                : "text-gray-900"
            )}
          >
            {length}
          </p>
        </div>
        <div>
          <div
            className={cn(
              "w-6 h-6 rounded",
              status === "Pending"
                ? "bg-yellow-500"
                : status === "Completed"
                ? "bg-green-500"
                : "bg-blue-600"
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default StatusCard;
