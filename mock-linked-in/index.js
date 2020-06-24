const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to GraphQL Demo! Visit /graphql");
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
