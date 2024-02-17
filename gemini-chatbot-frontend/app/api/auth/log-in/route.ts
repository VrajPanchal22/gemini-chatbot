import { logInService } from "@/services/auth.service";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  res: Response
): Promise<void | Response> {
  const dto = await req.json();
  const data = await logInService(dto);
  return NextResponse.json(data);
}
