"use client";

const AlertMarquee = () => {
  return (
    <div className="w-full overflow-hidden bg-red-600 text-white py-2 text-sm font-semibold">
      <div className="flex whitespace-nowrap animate-[marquee_15s_linear_infinite]">
        <span className="mx-8">
          ⚠️ We do not charge any advance payment. Any fraudulent activity is beyond our responsibility.
        </span>
        <span className="mx-8">
          ⚠️ We do not charge any advance payment. Any fraudulent activity is beyond our responsibility.
        </span>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default AlertMarquee;