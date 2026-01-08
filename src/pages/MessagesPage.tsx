import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown, FiRefreshCw } from "react-icons/fi";
import type { Message, LoadState } from "../dummyData/types";
import { INITIAL_MESSAGES } from "../dummyData/types";
import MessageList from "../components/messages/MessageList";
import MessageDetail from "../components/messages/MessageDetail";
import Sidebar from "../components/messages/Sidebar";
import Composer from "../components/messages/Composer";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null
  );
  const [showComposer, setShowComposer] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    const timerId = window.setTimeout(() => {
      if (!isMounted) return;

      const sorted = [...INITIAL_MESSAGES].sort(
        (a, b) => b.createdAt - a.createdAt
      );

      setMessages(sorted);
      setLoadState(sorted.length === 0 ? "empty" : "ready");
    }, 500);

    return () => {
      isMounted = false;
      window.clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    if (!messagesContainerRef.current) return;
    messagesContainerRef.current.scrollTop = 0;
  }, [messages.length]);

  const orderedMessages = useMemo(
    () => [...messages].sort((a, b) => b.createdAt - a.createdAt),
    [messages]
  );

  const selectedMessage =
    messages.find((m) => m.id === selectedMessageId) ?? null;

  return (
    <main className="grid bg-white p-0 shadow w-full md:grid-cols-[16rem_3fr_2fr]">
      <Sidebar />

      <section className="flex flex-col grow">
        <div className="flex items-center justify-between border-b border-slate-200 bg-sky-50 px-4 py-3">
          <div className="flex items-center gap-3 text-lg font-semibold text-sky-700">
            <span>{`INBOX (1-${orderedMessages.length}/${orderedMessages.length || 1})`}</span>
            <FiRefreshCw className="h-4 w-4 text-slate-500 cursor-pointer transition hover:text-sky-700 hover:rotate-180" />
          </div>
          <button
            className="flex items-center gap-1 text-sm font-semibold text-sky-700 hover:underline"
            onClick={() => setShowComposer(true)}
          >
            Compose
            <FiChevronDown className="h-4 w-4" />
          </button>
        </div>

        <MessageList
          messages={orderedMessages}
          loadState={loadState}
          containerRef={messagesContainerRef}
          onSelect={(id) => setSelectedMessageId(id)}
          selectedId={selectedMessageId ?? undefined}
        />

        <Composer show={showComposer} onClose={() => setShowComposer(false)} />
      </section>

      <aside className="flex flex-col border-l border-slate-200 bg-white">
        <MessageDetail message={selectedMessage} />
      </aside>
    </main>
  );
}
