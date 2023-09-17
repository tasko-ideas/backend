import { createProject } from "../operations/projectOperations";

export const projectResolvers = {
  Mutation: {
    createProject: (_: any, args: any, context: any) => {
      return createProject(args, context);
    },
  },
};
