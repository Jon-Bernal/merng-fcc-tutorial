require("dotenv").config(); // this must ALWAYS come first
const { ApolloServer, PubSub } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const pubsub = new PubSub();

const startServer = async () => {
  // graphql setup

  // mongodb connection
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASS}@learninggraphql.dvedm.mongodb.net/merng?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  // create and start server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub }),
  });
  const res = await server.listen({ port: 5000 });

  // display server is running
  console.log(`Server running at ${res.url}`);
};

startServer();
