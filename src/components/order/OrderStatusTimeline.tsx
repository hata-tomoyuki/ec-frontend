import type { OrderStatus } from "@/types";

interface OrderStatusTimelineProps {
  status: OrderStatus;
}

const steps: { key: OrderStatus; label: string }[] = [
  { key: "pending", label: "注文受付" },
  { key: "completed", label: "完了" },
];

const statusOrder: Record<OrderStatus, number> = {
  pending: 0,
  completed: 1,
  cancelled: -1,
};

export default function OrderStatusTimeline({
  status,
}: OrderStatusTimelineProps) {
  if (status === "cancelled") {
    return (
      <div className="flex items-center gap-2 p-4 bg-red-50 rounded-lg">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="text-sm font-medium text-red-700">
          この注文はキャンセルされました
        </span>
      </div>
    );
  }

  const currentIndex = statusOrder[status];

  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => {
        const isCompleted = i <= currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <div
            key={step.key}
            className="flex items-center flex-1 last:flex-none"
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isCompleted
                    ? "bg-teal-700 text-white"
                    : "bg-stone-200 text-stone-500"
                } ${isCurrent ? "ring-2 ring-teal-700/30" : ""}`}
              >
                {isCompleted ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`mt-2 text-xs ${
                  isCompleted ? "text-teal-700 font-medium" : "text-stone-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 mt-[-1rem] ${
                  i < currentIndex ? "bg-teal-700" : "bg-stone-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
