import type { Message } from "../../dummyData/types";
import { FiChevronDown } from "react-icons/fi";

type Props = {
  message?: Message | null;
};

export default function MessageDetail({ message }: Props) {
  if (!message) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-slate-500">
          Select a message to see details.
        </p>
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div>
        <div className="mb-3 flex items-start justify-between">
          <div className="flex flex-1 items-center justify-between gap-3 px-4 py-3">
            <h2 className="text-lg font-semibold text-sky-700">
              Appointment Confirmation
            </h2>
            <button className="flex items-center gap-1 px-1 text-lg font-semibold text-sky-700">
              Reply
              <FiChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-1 bg-slate-50 px-3 py-2 text-sm text-slate-700 md:grid md:grid-cols-2 md:gap-x-6">
          <div>
            <span className="font-medium text-slate-600">From:</span>{" "}
            <span className="text-slate-900">{message.author}</span>
          </div>
          <div>
            <span className="font-medium text-slate-600">To:</span>{" "}
            <span className="text-slate-900">{message.recipients}</span>
          </div>
          <div>
            <span className="font-medium text-slate-600">Date:</span>{" "}
            <span className="text-slate-900">{formatDate(message.createdAt)}</span>
          </div>
          <div>
            <span className="font-medium text-slate-600">Category:</span>{" "}
            <span className="text-slate-900">user-management</span>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 px-6 py-4 text-sm text-slate-700">
        <div>
          <p className="mb-3">Hi [First Name],</p>
          <p className="mb-4">Your appointment is confirmed.</p>

          <div className="mb-4">
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <span className="font-medium">Date:</span> [Day, Month Date, Year]
              </li>
              <li>
                <span className="font-medium">Time:</span> [Time] ([Time Zone])
              </li>
              <li>
                <span className="font-medium">Host:</span> [Name]
              </li>
              <li>
                <span className="font-medium">Meeting type:</span> Video meeting
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <p className="mb-2 font-medium">Join your meeting</p>
            <p>Please use this link at the scheduled time: [Meeting Link]</p>
          </div>

          <div className="mb-4">
            <p className="mb-2 font-medium">Before the meeting (2-5 minutes)</p>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Join from a quiet, distraction-free place</li>
              <li>Check your internet connection</li>
              <li>Have any relevant documents or notes ready</li>
            </ol>
          </div>

          <p className="mb-4">
            Need to reschedule or cancel? Please contact us at [Phone] or reply to
            this email at least 2 hours in advance.
          </p>

          <p className="mb-2">We look forward to speaking with you.</p>
          <p>Best regards,</p>
          <p className="font-medium">{message.author}</p>
        </div>
      </div>

      <div className="border-t-2 border-dotted border-slate-200 pt-4 pb-8">
        <div className="space-y-4 px-4">
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">
                Re: In-Person Consultation
              </p>
              <p className="text-xs text-slate-500">2025-01-03</p>
            </div>
            <p className="text-sm text-slate-600 line-clamp-2">
              This is a friendly reminder that you have a scheduled meeting
              tomorro...
            </p>
          </div>

          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">
                Re: Re: In-Person Consultation
              </p>
              <p className="text-xs text-slate-500">2025-01-01</p>
            </div>
            <p className="text-sm text-slate-600 line-clamp-2">
              This is a friendly reminder that you have a scheduled meeting
              tomorro...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
