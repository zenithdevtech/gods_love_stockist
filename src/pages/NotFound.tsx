import React from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-soft/30 flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <div className="rounded-md border border-secondary-dark/70 bg-white shadow-sm p-6 sm:p-10 text-center">
          <div className="mx-auto mb-6 h-1 w-12 rounded-md bg-primary" />

          <h1 className="font-display text-5xl font-extrabold text-primary leading-none">
            404
          </h1>

          <div className="mt-4">
            <h2 className="font-display text-xl font-bold text-neutral-dark">
              Page not found
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-soft max-w-md mx-auto">
              The page you’re looking for doesn’t exist or may have been moved.
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="btn-primary w-full sm:w-auto text-xs"
            >
              Go back home
              <HiArrowRight className="text-sm" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
