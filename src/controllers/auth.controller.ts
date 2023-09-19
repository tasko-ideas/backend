import { Request, Response } from "express-serve-static-core";
import jwt from 'jsonwebtoken'

import userModel, { IUser } from "../models/user.model";
import { jwtSecret } from "../config/environment";
import AuthHelper from "../helpers/auth.helper";

const AuthController = {

  register: async (req: any, res: Response) => {
    try {
      const { fullname, email, password, passwordCheck } = req.body;
      const user = new userModel({
        fullname,
        email,
        password,
        passwordCheck,
      });

      // Add profile image to imgur <---- arreglar logica para que guarde usuario aunque no haya podido subir imagen
      if (req.files) {
        const uploadImage = await AuthHelper.uploadImage(req.files[0])
        if (!uploadImage) {
          return res.status(500).json({ error: "Error al subir la imagen a Imgur." });
        }
        user.profileImageURL = uploadImage;
      }

      // Create user
      const newUser = await user.save();
      if (!newUser) {
        return res.status(500).json({ error: "Error al crear el usuario." });
      }
      return res.status(200).json(newUser);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return res.status(403).json(error.message);
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user: IUser | null = await userModel.findOne({ email });
      if (!user) {
        return res.status(403).json("Email not Found!");
      }

      const comparePassword = await user.checkPassword(password, user.password)
      if (!comparePassword) {
        return res.status(403).json({ msg: 'Invalid Password' })
      }

      user.password = ''
      const token = jwt.sign({ user: user }, jwtSecret, { expiresIn: '1h' })
      return res.status(200).json({ user, token: token });
    } catch (error) {

      return res.status(403).json(error);
    }
  },

}

export default AuthController