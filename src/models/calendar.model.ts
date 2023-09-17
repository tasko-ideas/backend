import { Schema, model, Document, Types } from "mongoose";

export interface ICalendarItem {
  type: string;
  title: string;
  description: string | undefined;
  startDate: Date;
  endDate: Date | undefined;
  reminder: Date | undefined;
}

export interface ICalendar extends Document {
  userId: Types.ObjectId;
  calendar: {
    [year: string]: {
      [month: string]: {
        [day: string]: ICalendarItem[];
      };
    };
  }
}

const calendarSchema = new Schema<ICalendar>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  calendar: { type: Schema.Types.Mixed, default: {} }
})

export default model<ICalendar>("Calendar", calendarSchema);