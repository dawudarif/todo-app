const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Task {
    id: ID!
    text: String!
    category: String!
    createdBy: User
  }
  type User {
    id: ID!
    name: String
    email: String
    emailVerified: String
    image: String
    hashedPassword: String
  }

  type Query {
    tasks: [Task]
    task(id: ID!): Task
    users: [User]
    user(id: ID!): User
  }

  input CreateTask {
    text: String!
    createdBy: ID!
  }

  input UpdateTask {
    id: ID!
    text: String!
  }

  type Mutation {
    addTask(input: CreateTask!): Task
    updateTask(input: UpdateTask!): Task
    deleteTask(id: ID!): Task
  }
`;

module.exports = {
  typeDefs,
};
