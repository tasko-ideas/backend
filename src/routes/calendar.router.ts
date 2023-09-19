import express from "express";
import CalendarController from "../controllers/calendar.controller";
import passport from "passport";

const calendarRouter = express.Router();

calendarRouter.post(
  "/calendar/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    CalendarController.createCalendarItem(req, res);
  }
);

calendarRouter.get(
  "/calendar",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    CalendarController.getAllCalendar(req, res);
  }
);

calendarRouter.get(
  "/calendar/year/:year",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    CalendarController.getCalendarByYear(req, res);
  }
);

calendarRouter.get(
  "/calendar/month/:year/:month",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    CalendarController.getCalendarByMonth(req, res);
  }
);

calendarRouter.get(
  "/calendar/day/:year/:month/:day",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    CalendarController.getCalendarByDay(req, res);
  }
);

export default calendarRouter;
