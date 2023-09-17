import mongoose from "mongoose";

const { Schema, model } = mongoose;

interface ITask extends Document {
  UserId: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  members: mongoose.Schema.Types.ObjectId[];
  date: string;
  calendarId: mongoose.Schema.Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
  {
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    description: { type: String },
    members: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
    calendarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CalendarItem",
      default: null,
    },
  },
  { timestamps: true }
);

export default model<ITask>("Tasks", taskSchema);
export { ITask };