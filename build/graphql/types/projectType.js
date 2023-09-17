"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectType = void 0;
const graphql_1 = require("graphql");
exports.ProjectType = new graphql_1.GraphQLObjectType({
    name: "Project",
    fields: () => ({
        name: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
    }),
});
