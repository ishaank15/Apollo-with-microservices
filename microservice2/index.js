const { GraphQLServer } = require('graphql-yoga')

// 1
const data = [
	{ id: '1', title: 'Server-less Micro-services on AWS w/NodeJS', url: 'https://medium.com/@novicki_david/server-less-micro-services-on-aws-c9b091510b24' },
	{ id: '2', title: 'ReactJS Isomorphic/Universal App w/NodeJS, Redux, and React Router V-4', url: 'https://codeburst.io/react-isomorphic-universal-app-w-nodejs-redux-react-router-v4-be80aa57dcaf' },
	{ id: '3', title: '"Work it" featuring Service Workers', url: 'https://codeburst.io/work-it-featuring-service-workers-de769bd4917b' },
	{ id: '4', title: 'Web Components, Web\'s Dirty Secret', url: 'https://codeburst.io/web-components-webs-dirty-secret-903cc85847dd' }
];

// SCHEMA DEFINITION
const typeDefs = `
type Query {
  article(id: ID!): Article
  articles: [Article!]!

}
type Article {
  id: ID!
  title: String
  url: String
}`

// RESOLVERS
const resolvers = {
	Query: {
		article: (root, args, context, info) => {
			return data.find(item => item.id == args.id);
    },
    articles:()=> {
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
  port: 8000,
  endpoint: '/graphql',
  // subscriptions: '/subscriptions',
  // playground: '/playground',
}

server.start(options, ({port}) => console.log(`Server is running on http://localhost:${port}`))