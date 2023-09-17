import { Schema, model, Document, Types } from "mongoose";

interface IColumn {
  title: string;
  tasks: Types.ObjectId[];
}

interface IBoard {
  title: string;
  columns: IColumn[];
}

export interface IProject extends Document {
  name: string;
  description: string | undefined;
  admins: Types.ObjectId;
  members: Types.ObjectId[];
  boards: IBoard[];
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: [true, "Please fill your project name"],
    },
    description: String,
    admins: [{ type: Types.ObjectId, ref: "User" }],
    members: [{ type: Types.ObjectId, ref: "User" }],
    boards: [
      {
        title: { type: String, required: true },
        columns: [
          {
            title: { type: String, required: true },
            tasks: [{ type: Types.ObjectId, ref: "Task" }],
          },
        ],
      },
    ],
  }
);


export default model<IProject>("Project", projectSchema);