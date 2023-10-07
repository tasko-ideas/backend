"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const calendar_controller_1 = __importDefault(require("../controllers/calendar.controller"));
const passport_1 = __importDefault(require("passport"));
const calendarRouter = express_1.default.Router();
calendarRouter.post("/calendar/add", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    calendar_controller_1.default.createCalendarItem(req, res);
});
calendarRouter.get("/calendar", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    calendar_controller_1.default.getAllCalendar(req, res);
});
calendarRouter.get("/calendar/year/:year", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    calendar_controller_1.default.getCalendarByYear(req, res);
});
calendarRouter.get("/calendar/month/:year/:month", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    calendar_controller_1.default.getCalendarByMonth(req, res);
});
calendarRouter.get("/calendar/day/:year/:month/:day", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    calendar_controller_1.default.getCalendarByDay(req, res);
});
exports.default = calendarRouter;
