import { loginService, signUpService } from "../services/auth.service";

export const signUp = async (req, res) => {
  try {
    return await signUpService(req.body, res);
  } catch (error) {
    return await res.status(500).json({
      status: false,
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    return await loginService(req.body, res);
  } catch (error) {
    return await res.status(500).json({
      status: false,
      error,
    });
  }
};
