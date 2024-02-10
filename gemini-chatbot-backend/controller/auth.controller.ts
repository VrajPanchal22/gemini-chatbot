import { loginService, signUpService } from "../services/auth.service";

export const signUp = async (req, res) => {
  try {
    return await signUpService(req.body, res);
  } catch (error) {
    throw error;
  }
};

export const login = async (req, res) => {
  try {
    return await loginService(req.body, res);
  } catch (error) {
    throw error;
  }
};
