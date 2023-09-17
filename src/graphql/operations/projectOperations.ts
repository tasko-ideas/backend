import projectModel from "../../models/project.model";
import userModel from "../../models/user.model"; // Asumiendo que tienes el modelo User definido

export const createProject = async (args: any, context: any) => {
  const { name, description } = args;
  const user = await userModel.findOne({ _id: context.req.user }); // Accede al usuario desde el contexto de GraphQL

  if (!user) {
    throw new Error("You don't have permission to do that");
  }

  const createProject = new projectModel({
    name,
    description,
    admins: [user._id],
  });

  try {
    const newProject = await createProject.save();
    user.projects.push(newProject._id);
    user.passwordCheck = user.password; // no me gusta esta solucion... buscar otra forma
    await user.save();
    return newProject;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};
