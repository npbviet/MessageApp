import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { RiArrowGoBackFill, RiArrowTurnBackFill } from "react-icons/ri";
import { IoLink } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { BsSend } from "react-icons/bs";

type Props = {
  show: boolean;
  onClose: () => void;
};

export default function Composer({ show, onClose }: Props) {
  if (!show) return null;

  const [body, setBody] = useState("");
  const isSendDisabled = body.trim().length === 0;

  return (
    <div className="mt-3 rounded-md border border-slate-200 bg-white shadow">
      <div className="flex items-center justify-between bg-sky-700 px-4 py-2 text-sm font-semibold text-white">
        <span>Compose: Re: Nutrition Counseling</span>
        <button
          className="text-xs font-semibold text-white hover:underline"
          onClick={onClose}
        >
          Hide
        </button>
      </div>

      <div className="space-y-3 px-4 py-3 text-sm text-slate-700">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <label className="w-16 text-right text-xs font-medium uppercase text-slate-500 md:text-left">
            To:
          </label>
          <div className="flex-1">
            <div className="flex items-center justify-between rounded border border-slate-300 px-3 py-2 text-sm text-slate-800">
              <span>Nguyen Van</span>
              <FiChevronDown className="h-4 w-4 text-slate-500" />
            </div>
          </div>
          <label className="w-16 text-right text-xs font-medium uppercase text-slate-500 md:text-left">
            From:
          </label>
          <div className="flex-1">
            <div className="flex items-center justify-between rounded border border-slate-300 px-3 py-2 text-sm text-slate-800">
              <span>Nguyen Trang</span>
              <FiChevronDown className="h-4 w-4 text-slate-500" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <label className="w-16 text-right text-xs font-medium uppercase text-slate-500 md:text-left">
            Subject:
          </label>
          <div className="flex-1">
            <input
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-sky-500 focus:outline-none"
              defaultValue="Re: Nutrition Counseling"
            />
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
          <div className="flex flex-wrap items-center gap-3">
            <button aria-label="Undo">
              <RiArrowGoBackFill />
            </button>
            <button aria-label="Redo" className="-rotate-90">
              <RiArrowTurnBackFill />
            </button>
            <button className="font-semibold">B</button>
            <button className="font-semibold italic">I</button>
            <button className="font-semibold underline">U</button>
            <button className="font-semibold">H1</button>
            <button className="font-semibold">H2</button>
            <button className="font-semibold">H3</button>
            <button aria-label="Insert link">
              <IoLink />
            </button>
            <button aria-label="Insert image">
              <CiImageOn className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* <div className="rounded border border-slate-300 bg-white px-3 py-3 text-sm text-slate-800">
          <p className="mb-2 text-base font-semibold">This is a heading</p>
          <p className="mb-2 font-semibold">Heading 2</p>
          <p className="mb-3 font-semibold">Heading 3</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea.
          </p>

        </div> */}
        <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="h-48 w-full resize-vertical rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-sky-500 focus:outline-none"
            placeholder="Write your message..."
          />
      </div>

      <div className="flex items-center justify-end gap-3 bg-slate-100 px-4 py-4">
        <button
          className="rounded bg-white border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-sky-200"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="flex items-center gap-2 rounded bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSendDisabled}
        >
          Send
          <BsSend />
        </button>
      </div>
    </div>
  );
}
