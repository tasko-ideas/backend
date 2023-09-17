//import projectModel from "../models/projectModel";

export namespace ProjectHelper {
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
}