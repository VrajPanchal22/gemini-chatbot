import { getChatHistoryService } from "@/services/message.service";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: any
): Promise<void | Response> {
  const data = await getChatHistoryService(context.params.userId);
  return NextResponse.json(data);
}
