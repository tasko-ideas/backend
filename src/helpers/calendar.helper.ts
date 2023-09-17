import calendarItemModel, { ICalendarItem } from "../models/calendarItem.model";
import { ObjectId } from "mongoose";

export const getCalendarItemById = async (listOfItems: ObjectId[]) => {
  const items: ICalendarItem[] = []; // Inicializamos el array

  try {
    for (const itemId of listOfItems) {
      const calendarItem: ICalendarItem | null = await calendarItemModel.findById(itemId);
      if (calendarItem) {
        items.push(calendarItem);
      }
    }
    return items;
  } catch (error) {
    console.log(error);
    return [];
  }
};
