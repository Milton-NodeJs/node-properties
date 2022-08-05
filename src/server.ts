import 'reflect-metadata'
import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import logging from './_commons/configs/logging';
import config from './_commons/configs/config';
import Routes from './_routes/index-routes';


import { ApolloServer } from 'apollo-server-express';
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault
  } from "apollo-server-core";
import Express from 'express';
import { buildSchema } from 'type-graphql';

import { TodoResolver } from './_resolvers/todoResolver';
import path from 'path';


async function main() {

    const schema = await buildSchema({
        resolvers: [TodoResolver],
        emitSchemaFile: true,
    })
    const NAMESPACE = 'Server';
    const app = Express()
    /** logging the request */

    app.use((req, res, next) => {

        logging.info(NAMESPACE, `METHOD - [${req.method}],URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            logging.info(NAMESPACE, `METHOD - [${req.method}],URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
        });

        next();

    });
    /**
     * if you see this 2 lines replace express configuration
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    */


    /** Parse the request */
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));



    /** Rules of our API */
    app.use((req, res, next) => {
        res.header('Acces-Control-Allow-Origin', '*');
        res.header('Acces-Control-Allow-Headers', 'Origin, XRequested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Acces-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
            return res.status(200).json({});
        }
        next();
    });




    /** ApolloServer */
    const server = new ApolloServer({
        schema,
        //typeDefs,
        //resolvers,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [
          // Install a landing page plugin based on NODE_ENV
          process.env.NODE_ENV === "production"
            ? ApolloServerPluginLandingPageProductionDefault({
                graphRef: "my-graph-id@my-graph-variant",
                footer: false,
              })
            : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
        ],
      });
    await server.start();
    server.applyMiddleware({ app })


    /** Routes */
    Routes.routes(app, config.api.route);
    /** Error Handling */
    
    app.use((req, res, next) => {

        const error = new Error('not found');
        return res.status(404).json({
            message: error.message
        })
    });

    /** DB Connection */
    const connectionString = `mongodb://${config.db.hostname}:${config.db.port}/${config.db.name}`;
    mongoose.connect(connectionString);
    const db = mongoose.connection;

    db.on('error', (err: any) => { console.log(err); });
    db.once('open', () => { console.log('Database Connection Established!'); });
    /** Create the Server */

    app.listen(config.api.port, () => logging.info(NAMESPACE, `Server running on ${config.api.url}:${config.api.port}`))
}

main();