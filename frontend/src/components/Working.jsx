import React from "react";
import { FaGear } from "react-icons/fa6";

const Working = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      {/* Sleek, minimal card container */}
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300 rounded-xl">
        <div className="card-body items-center text-center p-10 md:p-14">
          {/* Smooth, slow-spinning Gear Icon */}
          <div className="relative flex items-center justify-center w-20 h-20 text-primary mb-8">
            <FaGear
              className="w-12 h-12 animate-spin"
              style={{ animationDuration: "10s" }}
            />
          </div>

          {/* Status Badge */}
          <span className="text-xs uppercase tracking-[0.25em] text-warning font-bold mb-3">
            System Notice
          </span>

          {/* Main Title */}
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-[0.15em] text-base-content mb-4">
            Under Development
          </h1>

          {/* Main Message */}
          <p className="text-xs uppercase tracking-[0.12em] text-base-content/60 max-w-xs leading-loose mb-8">
            We are optimizing this page to improve your experience. Access will
            be restored shortly.
          </p>

          {/* Minimalist Divider */}
          <div className="divider opacity-30 my-0"></div>

          {/* Patience Note */}
          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-base-content/40 font-semibold">
              Please keep patient • Thank you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Working;
