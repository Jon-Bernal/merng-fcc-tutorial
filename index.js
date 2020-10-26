require("dotenv").config(); // this must ALWAYS come first
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');



const startServer = async () => {

  // graphql setup
  const typeDefs = gql`
    type Query {
      sayHi: String!
    }
  `

  const resolvers = {
    Query: {
      sayHi: () => `hello hello`,
    }
  }

  // mongodb connection
  await mongoose.connect(process.env.MONGOSTRING, {useNewUrlParser: true, useUnifiedTopology: true});

  // create and start server
  const server = new ApolloServer({typeDefs, resolvers})
  const res = await server.listen({ port: 5000})
  
  // display server is running
  console.log(`Server running at ${res.url}`)
}

startServer();