import { SignUpDto } from "@/api-interface/signUpRequestDto";
import axios from "axios";

export const signUpService = async (dto: SignUpDto) => {
  const url = `${process.env.BASE_URL}/auth/signup`;

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
