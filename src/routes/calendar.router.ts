import express from "express";
import {
  createCalendarItem,
  getAllCalendar,
  getCalendarByYear,
  getCalendarByMonth,
  getCalendarByDay,
} from "../controllers/calendar.controller";
import passport from "passport";

const calendarRouter = express.Router();

calendarRouter.post(
  "/calendar/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    createCalendarItem(req, res);
  }
);

calendarRouter.get(
  "/calendar",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    getAllCalendar(req, res);
  }
);

calendarRouter.get(
  "/calendar/year/:year",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    getCalendarByYear(req, res);
  }
);

calendarRouter.get(
  "/calendar/month/:year/:month",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    getCalendarByMonth(req, res);
  }
);

calendarRouter.get(
  "/calendar/day/:year/:month/:day",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    getCalendarByDay(req, res);
  }
);

export default calendarRouter;
