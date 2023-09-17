import { GraphQLObjectType, GraphQLString } from "graphql";

export const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});
