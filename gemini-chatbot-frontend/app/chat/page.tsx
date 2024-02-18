import Chat from "@/components/Chat";
import React from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { TokenData } from "@/api-interface/userInfoDto";

async function ChatPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const data = jwt.decode(token?.value as string) as TokenData;
  return <Chat userData={data} />;
}

export default ChatPage;
