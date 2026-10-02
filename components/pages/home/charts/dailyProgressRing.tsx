


const ProgressRing = ({ done, total }: { done: number; total: number }) => {
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const ratio = total > 0 ? done / total : 0;
    const complete = total > 0 && done === total;

    return (
        <div className="relative flex h-32 w-32 items-center justify-center">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <defs>
                    <linearGradient id="ring-purple" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#f472b6" />
                    </linearGradient>
                    <linearGradient id="ring-green" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#6ee7b7" />
                        <stop offset="100%" stopColor="#2dd4bf" />
                    </linearGradient>
                </defs>

                <circle cx="50" cy="50" r={radius} fill="none" strokeWidth="9" className="stroke-white/15" />
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - ratio)}
                    stroke={complete ? "url(#ring-green)" : "url(#ring-purple)"}
                    className="transition-all duration-700"
                />
            </svg>

            <div className="absolute text-center">
                <p className="text-3xl font-bold leading-none text-white">{done}</p>
                <p className="mt-1 text-[11px] font-medium text-purple-100/80">of {total} done</p>
            </div>
        </div>
    );
};


export default ProgressRing;