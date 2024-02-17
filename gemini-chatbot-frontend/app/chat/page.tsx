"use client";

import Chat from "@/components/Chat";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function ChatPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Chat />
    </QueryClientProvider>
  );
}

export default ChatPage;
