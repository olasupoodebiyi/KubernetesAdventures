import "reflect-metadata";
import express from 'express'
import {createConnection} from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver, ByeResolver } from "./resolvers/hello";


const main = async () => {
    await createConnection({
        type: "postgres",
        host: process.env.PGHOST,
        port: parseInt(process.env.PGPORT!),
        username: process.env.PGUSER,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,

    });
    const PORT = process.env.PORT || 4001
    const app = express()    

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, ByeResolver],
            validate: true,
            
        })
    })

    apolloServer.applyMiddleware({app})

    const graphqlPath = apolloServer.graphqlPath

    app.get('/api/last', (_, res) => {
        res.send('Welcome to the Project')
    })

    app.listen({port: PORT}, () => {
        console.log('Server started on http://testing.dev' + graphqlPath )
    })
}

main().catch((err) => {
    console.error(err)
});