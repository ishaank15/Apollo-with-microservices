const { GraphQLServer } = require('graphql-yoga')

// 1

const data = [
	{ id: '1', name: 'Ishaank'},
	{ id: '2', name: 'Sapna'},
	{ id: '3', name: 'Vinay'}
];

const typeDefs = `
type Query {
  user(id: ID!): User
  users: [User!]!
}
type User {
  id: ID!
  name: String
}`

// RESOLVERS
const resolvers = {
	Query: {
		user: (root, args, context, info) => {
			return data.find(item => item.id == args.id);
    },
    users:()=> {
      return data;
    }
	},
}
// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
const options = {
  port: 8001,
  endpoint: '/graphql',
  // subscriptions: '/subscriptions',
  // playground: '/playground',
}

server.start(options, ({port}) => console.log(`Server is running on http://localhost:${port}`))