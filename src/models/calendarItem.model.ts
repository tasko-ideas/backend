import mongoose from "mongoose";

const { Schema, model } = mongoose;

interface ICalendarItem {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string | undefined;
  startDate: string;
  endDate: string | undefined;
  items: mongoose.Schema.Types.ObjectId[];
}

const calendarItemSchema = new Schema<ICalendarItem>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: String,
    startDate: { type: String, required: true },
    endDate: String,
    items: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
      { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
    ],
  },
  { timestamps: true }
);

export default model<ICalendarItem>("CalendarItem", calendarItemSchema);
export { ICalendarItem };
