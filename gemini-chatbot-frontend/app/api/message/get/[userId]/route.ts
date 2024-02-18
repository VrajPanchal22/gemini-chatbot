import { getChatHistoryService } from "@/services/message.service";
import { NextResponse } from "next/server";

export async function GET({
  userId,
}: {
  userId: string;
}): Promise<void | Response> {
  const data = await getChatHistoryService(userId );
  return NextResponse.json(data);
}
