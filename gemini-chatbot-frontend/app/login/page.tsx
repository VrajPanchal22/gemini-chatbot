"use client";

import Login from "@/components/Login";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function LoginPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  );
}

export default LoginPage;
