const { GraphQLServer } = require('graphql-yoga'),
	{ mergeSchemas } = require('graphql-tools'),
	{ getIntrospectSchema } = require('./introspection');

const endpoints = [
	'http://localhost:8000/graphql',
	'http://localhost:8001/graphql'
];
(async function () {
	try {
		allSchemas = await Promise.all(endpoints.map(ep => getIntrospectSchema(ep)));
		const server = new GraphQLServer({
      schema: mergeSchemas({ schemas: allSchemas }) 
    })
    const options = {
      port: 5000,
      endpoint: '/graphql',
      // subscriptions: '/subscriptions',
      // playground: '/playground',
    }
    
    server.start(options, ({port}) => console.log(`Server is running on http://localhost:${port}`))

	} catch (error) {
		console.log('ERROR: Failed to grab introspection queries', error);
	}
})();



