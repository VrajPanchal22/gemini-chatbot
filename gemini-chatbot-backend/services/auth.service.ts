import dataSource from "../database/ormconfig";
import { encrypt } from "../helpers/helpers";
import { User } from "../entities/User";
import { ILike } from "typeorm";

const userRepository = dataSource.getRepository(User);

export const signUpService = async (req, res) => {
  const { firstName, lastName, email, password } = req;

  const userExists = await userRepository.findOne({
    where: { email: ILike(email) },
  });

  if (userExists) {
    return await res.status(200).json({
      status: true,
      msg: "Email Already Exists. Please try other Email.",
    });
  }

  const encryptedPassword = await encrypt.encryptpass(password);
  const user = {
    firstName,
    lastName,
    email,
    password: encryptedPassword,
  };

  const response = await userRepository.save(user);
  if (response) {
    return await res.status(200).json({
      status: true,
      msg: "SignUp Successfully",
    });
  }
};

export const loginService = async (req, res) => {
  const { email, password } = req;

  const userDetails = await userRepository.findOne({
    where: { email: ILike(email) },
  });

  if (!userDetails) {
    return await res.status(404).json({
      status: false,
      msg: "Wrong Email/Password",
    });
  }

  const passwordVerify = encrypt.comparepassword(
    userDetails.password,
    password
  );

  if (userDetails && passwordVerify) {
    const token = encrypt.generateToken({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
    });

    res.cookie("token", token, {
      httpOnly: true,
      signed: true,
    });

    return await res.status(200).json({
      status: true,
      msg: "Login Successfully",
    });
  }
};
