import {
  FiInbox,
  FiSend,
  FiArchive,
  FiTrash2,
  FiFileText,
  FiTag,
} from "react-icons/fi";

export default function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col gap-6 bg-white p-6 text-sm text-slate-700 md:flex border-r border-slate-200">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">
          MESSAGES
        </h3>
        <ul className="mt-2 space-y-2">
          <li className="flex items-center justify-between rounded-md px-2 py-2 hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <FiInbox className="h-4 w-4 text-slate-600" />
              <span className="font-medium">Inbox</span>
            </div>
            <span className="text-xs text-slate-500">1 unread</span>
          </li>

          <li className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-slate-50 cursor-pointer">
            <FiSend className="h-4 w-4 text-slate-600" />
            <span>Outbox</span>
          </li>

          <li className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-slate-50 cursor-pointer">
            <FiArchive className="h-4 w-4 text-slate-600" />
            <span>Archive</span>
          </li>

          <li className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-slate-50 cursor-pointer">
            <FiTrash2 className="h-4 w-4 text-slate-600" />
            <span>Trash</span>
          </li>
        </ul>
      </div>

      <div className="border-t pt-3">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">
          CATEGORIES
        </h3>
        <ul className="mt-2 space-y-2">
          <li className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-slate-50 cursor-pointer">
            <FiFileText className="h-4 w-4 text-slate-600" />
            <span>Important</span>
          </li>
          <li className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-slate-50 cursor-pointer">
            <FiFileText className="h-4 w-4 text-slate-600" />
            <span>Urgent</span>
          </li>
          <li className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-slate-50 cursor-pointer">
            <FiFileText className="h-4 w-4 text-slate-600" />
            <span>Informational</span>
          </li>
        </ul>
      </div>

      <div className="border-t pt-3">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">
          TAGS
        </h3>
        <ul className="mt-2 space-y-2">
          <li className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-slate-50 cursor-pointer">
            <FiTag className="h-4 w-4 text-slate-600" />
            <span>user-management</span>
          </li>
          <li className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-slate-50 cursor-pointer">
            <FiTag className="h-4 w-4 text-slate-600" />
            <span>meeting-reminder</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
