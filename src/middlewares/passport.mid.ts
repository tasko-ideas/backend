import dotenv from "dotenv";
dotenv.config();
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import usersModel from "../models/user.model";


const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export default new Strategy(options, async (payload, done) => {
  const user = await usersModel.findById(payload.user._id);
  if (!user) {
    return done(null, false);
  }

  return done(null, user._id);
});

