"use client";

// we have to name it "error.tsx" because next.js will automatically render this component when an error occurs in the app
import { FC, useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title="Uh Oh"
      subtitle="An error occurred. Please try again later."
    />
  );
};

export default ErrorState;
