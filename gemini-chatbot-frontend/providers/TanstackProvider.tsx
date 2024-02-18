"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

function TanstackProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default TanstackProvider;
