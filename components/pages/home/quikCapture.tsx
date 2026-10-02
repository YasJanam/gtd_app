
import { useState } from "react";

const QuickCapture = ({ onCapture }: { onCapture: (text: string) => void }) => {
    const [text, setText] = useState("");

    const submit = () => {
        if (!text.trim()) return;
        onCapture(text.trim());
        setText("");
    };

    return (
        <div
            className="
                mb-5 flex items-center gap-2 rounded-2xl
                border border-purple-300/30
                bg-gradient-to-r from-purple-500/25 to-fuchsia-500/20
                p-2 pl-5 shadow-lg shadow-purple-950/30
                transition-all duration-300
                focus-within:border-purple-200/70 focus-within:shadow-purple-500/30
            "
        >
            <span className="text-lg text-purple-200">✦</span>

            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") submit();
                }}
                placeholder="What's on your mind? Capture it now, decide later."
                aria-label="Quick capture"
                className="
                    min-w-0 flex-1 bg-transparent py-3 text-base text-white
                    outline-none placeholder:text-purple-100/60
                "
            />

            <button
                onClick={submit}
                disabled={!text.trim()}
                className="
                    shrink-0 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold
                    text-purple-700 shadow-lg shadow-purple-950/30 transition-all
                    hover:-translate-y-0.5 hover:bg-purple-50
                    disabled:translate-y-0 disabled:opacity-40
                "
            >
                Capture
            </button>
        </div>
    );
};

export default QuickCapture;