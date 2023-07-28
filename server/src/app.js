const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { typeDefs } = require('./schema/typeDefs');
const { resolvers } = require('./schema/resolvers');
const cors = require('cors');
require('dotenv').config();
const { mongoose } = require('mongoose');
const express = require('express');
const colors = require('colors');
const connectDB = require('./config/db');
const { getSession } = require('next-auth/react');

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000',
};

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors(corsOptions));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  credentials: true,
});

const main = async () => {
  await connectDB();

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async ({ req }) => {
      const session = await getSession(req);
      console.log(session);
      return { session };
    },
  });

  console.log(`🚀 Server ready at: ${url}graphql`);
};

main();
