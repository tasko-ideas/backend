import sharp from "sharp";
import FormData from "form-data";
import axios from "axios";

import userModel, { IUser } from "../models/user.model";
import { Schema } from "mongoose";
import { imgurClientId } from "../config/environment";


export namespace AuthHelper {

  export const uploadImage = async (file: any): Promise<string | null> => {
    try {
      if (!validateImage(file)) {
        return null;
      }
      const data = new FormData();
      data.append('image', file.buffer);
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.imgur.com/3/image',
        headers: {
          'Authorization': `Client-ID ${imgurClientId}`,
          ...data.getHeaders(),
        },
        data: data,
      }
      const imgurResponse = await axios(config);
      return imgurResponse.data.data.link;
    } catch (imgurError) {
      console.error('Imgur Error:', imgurError);
      return null
    }
  }

  export const validateImage = async (imageFile: any): Promise<boolean> => {
    if (!imageFile || !imageFile.mimetype.startsWith('image/')) {
      return false
    }
    const imageBuffer = imageFile.data;
    const imageDimensions: any = await sharp(imageBuffer).metadata();
    if (imageDimensions.width > 300 || imageDimensions.height > 300) {
      return false
    }
    return true;
  }


  export const calendarItemSave = async (
    userId: Schema.Types.ObjectId,
    //calendarItemId: mongoose.Types.ObjectId,
    //savedTaskId: mongoose.Types.ObjectId,
    //year: string,
    //month: string,
    //day: string
  ): Promise<IUser | null> => {
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return null;
      }
      /*
      if (!user.calendar[year]) {
        user.calendar[year] = {};
      }
      if (!user.calendar[year][month]) {
        user.calendar[year][month] = {};
      }
      if (!user.calendar[year][month][day]) {
        user.calendar[year][month][day] = [];
      }
      user.calendar[year][month][day].push(calendarItemId);
      user.tasks.push(savedTaskId);
      await userModel.updateOne(
        { _id: userId },
        { $set: { calendar: user.calendar, tasks: user.tasks } }
      );
        */
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}