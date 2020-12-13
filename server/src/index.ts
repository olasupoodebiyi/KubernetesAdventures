import "reflect-metadata";
import express from 'express'
import {createConnection} from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";


const main = async () => {
    await createConnection();
    const PORT = process.env.PORT || 4000
    const app = express()    

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: true
        })
    })

    apolloServer.applyMiddleware({app})

    app.listen(PORT, () => {
        console.log('Server started on localhost:' + PORT)
    })
}

main().catch((err) => {
    console.error(err)
});