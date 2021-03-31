import { ApolloServer, PubSub } from 'apollo-server'
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'

const pubsub = new PubSub()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        pubsub
    } 
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`🚀  Server ready at ${url}`)
    console.log(`🚀Subscriptions ready at ${subscriptionsUrl}`)
})