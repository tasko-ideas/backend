"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_mid_1 = __importDefault(require("./middlewares/passport.mid"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("./config/db"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const calendar_router_1 = __importDefault(require("./routes/calendar.router"));
const project_router_1 = __importDefault(require("./routes/project.router"));
const environment_1 = require("./config/environment");
const task_router_1 = __importDefault(require("./routes/task.router"));
const app = (0, express_1.default)();
// -------------- Middelewares
app.use(passport_1.default.initialize());
passport_1.default.use(passport_mid_1.default);
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
// ---------------- Routes
app.use('/api', calendar_router_1.default);
app.use('/api', auth_router_1.default);
app.use('/api', task_router_1.default);
app.use('/api', project_router_1.default);
app.listen(environment_1.PORT, () => {
    console.log(`Server listening on port ${environment_1.PORT}`);
    (0, db_1.default)();
});
