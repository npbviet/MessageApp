type Props = {
  value: string;
  onChange: (value: string) => void;
  onDismiss: () => void;
  onSave: () => void;
};

export default function ReplyEditor({
  value,
  onChange,
  onDismiss,
  onSave,
}: Props) {
  const isDisabled = value.trim().length === 0;

  return (
    <div className="flex flex-col gap-2 rounded-md bg-sky-50 p-3">
      <div className="flex gap-3">
      <div className="h-10 w-10 rounded-full bg-sky-700" />
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[90px] w-full resize-vertical rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-sky-500 focus:outline-none"
          placeholder="[ Add new comments ]"
        />
      </div>
      <div className="flex justify-end gap-3 text-xs font-medium text-slate-600">
        <button
          type="button"
          className="hover:text-slate-900"
          onClick={onDismiss}
        >
          Dismiss
        </button>
        <button
          type="button"
          className="text-sky-700 hover:underline disabled:text-slate-400"
          disabled={isDisabled}
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}

