"use strict";
//import projectModel from "../models/projectModel";
Object.defineProperty(exports, "__esModule", { value: true });
const ProjectHelper = {
/*
  export const isInProject = async (userId: string, projectId: string, type: string): Promise<boolean> => {
    const project = await projectModel.findOne({ _id: projectId });
    if (!project) {
      return false;
    }
    if (type === "admin") {
      return project.admins.some(adminId => adminId.toString() === userId);
    } else if (type === "member") {
      return project.members.some(memberId => memberId.toString() === userId);
    }

    return false;
  }

*/
};
exports.default = ProjectHelper;
