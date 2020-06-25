const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = graphql;
const axios = require("axios");
const { response } = require("express");

// The GraphQLObjectType is used to define the data and their properties

const dataUrl = "http:\\\\localhost:3000";

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValues, args) {
        return axios
          .get(`${dataUrl}\\companies\\${parentValues.id}\\users`)
          .then((response) => response.data);
      },
    },
  }),
});
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValues, args) {
        return axios
          .get(`${dataUrl}\\companies\\${parentValues.companyId}`)
          .then((response) => response.data);
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`${dataUrl}\\users\\${args.id}`)
          .then((response) => response.data);
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`${dataUrl}\\companies\\${args.id}`)
          .then((response) => response.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
});
