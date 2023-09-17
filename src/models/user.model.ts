import { Schema, model, Document, Types } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  passwordCheck: string | undefined;
  profileImageURL?: string,
  calendar: Types.ObjectId;
  projects: Types.ObjectId[];

  tasks: Types.ObjectId[];

  active: boolean;
  checkPassword: (
    typedPassword: string,
    originalPassword: string
  ) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      required: [true, "Please fill your fullname"],
    },
    email: {
      type: String,
      required: [true, "Please fill your email"],
      unique: true,
      lowercase: true,
      validate: {
        validator: (email: string) => {
          // eslint-disable-next-line no-useless-escape
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: "Please fill a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Please fill your password"],
      minlength: 8,
      //select: false
    },
    passwordCheck: {
      type: String,
      required: [true, "Please fill your password check"],
      validate: {
        validator: function (this: IUser, passwordCheck: string) {
          return passwordCheck === this.password;
        },
        message: "The password does not match",
      },
    },
    profileImageURL: { type: String, default: "" },
    calendar: { type: Schema.Types.ObjectId, ref: "Calendar", default: null },
    projects: [{ type: Schema.Types.ObjectId, ref: "Projects", default: [] }],

    tasks: [{ type: Schema.Types.ObjectId, ref: "Tasks", default: [] }],

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.checkPassword = async function (
  this: IUser,
  typedPassword: string,
  originalPassword: string
) {
  return await bcrypt.compare(typedPassword, originalPassword);
};

// Middleware de mongoose "pre" que se ejecuta antes del save
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordCheck = undefined;
  next();
});

export default model<IUser>("User", userSchema);
export { IUser };
