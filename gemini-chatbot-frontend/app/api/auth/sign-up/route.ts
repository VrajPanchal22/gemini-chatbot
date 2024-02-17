import { UserInfoDto } from "@/api-interface/userInfoDto";
import { signUpService } from "@/services/auth.service";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  res: Response
): Promise<void | Response> {
  const dto = await req.json();
  const data = await signUpService(dto);
  return NextResponse.json(data);
}
