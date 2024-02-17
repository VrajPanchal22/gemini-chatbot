"use client";

import Signup from "@/components/Signup";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function SignUpPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Signup />
    </QueryClientProvider>
  );
}

export default SignUpPage;
