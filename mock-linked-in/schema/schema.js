const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;
const _ = require("lodash");

const users = [
  { id: "u001", firstName: "Raj", age: 55 },
  { id: "u002", firstName: "Hari", age: 32 },
  { id: "u003", firstName: "Ameer", age: 88 },
];

// The GraphQLObjectType is used to define the data and their properties

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return _.find(users, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
});
