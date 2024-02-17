import { LogInDto } from "@/api-interface/logInRequestDto";
import { SignUpDto } from "@/api-interface/signUpRequestDto";
import axios from "axios";
import { cookies } from "next/headers";

export const signUpService = async (dto: SignUpDto) => {
  const url = `${process.env.API_BASE_URL}/auth/signup`;

  const { data } = await axios(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: dto,
  });

  return data;
};

export const logInService = async (dto: LogInDto) => {
  "use server";
  const url = `${process.env.API_BASE_URL}/auth/login`;

  let { data } = await axios(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: dto,
  });

  cookies().set("token", data.token);

  return data;
};
