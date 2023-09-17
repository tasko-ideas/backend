"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectResolvers = void 0;
const projectOperations_1 = require("../operations/projectOperations");
exports.projectResolvers = {
    Mutation: {
        createProject: (_, args, context) => {
            return (0, projectOperations_1.createProject)(args, context);
        },
    },
};
