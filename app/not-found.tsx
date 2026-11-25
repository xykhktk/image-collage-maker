"use client";

import { Link } from "@nextui-org/react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p className="text-7xl font-bold tracking-tight">404</p>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="max-w-md text-default-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="mt-2 text-primary underline underline-offset-4">
        Back to Home
      </Link>
    </div>
  );
}
