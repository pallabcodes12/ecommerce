"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("error from the app / error ", error);
  }, [error]);

  function refreshAndReset() {
    // router.refresh returns a void not a Promise or Promise<void> so using await will have no effect
    // so to ensure that refresh is done and only then reset run, go with the `startTransition` as below => so here "startTransition" will wait until `router.refresh is done and server component's result updated` and then it will reset `Error boundary i.e. error.tsx`
    startTransition(() => {
      router.refresh();
      reset();
    });
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2>Something Went wrong</h2>
      <button
        type="button"
        className="rounded bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-900"
        onClick={refreshAndReset}
      >
        Try again
      </button>
    </div>
  );
}
