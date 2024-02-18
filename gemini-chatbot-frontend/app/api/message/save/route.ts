import { saveUserMessage } from "@/services/message.service";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  res: Response
): Promise<void | Response> {
  const dto = await req.json();
  const data = await saveUserMessage(dto);
  return NextResponse.json(data);
}
