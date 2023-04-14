import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import colors from 'colors';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import { notFound, errorHandler } from './utils/errorHandler.js';
import { compressionOptions, corsOptions } from './utils/configs.js';
import viewEngine from './configs/viewEngine.js';
import connectDB from './configs/db.js';
import socket from './sockets/index.js';
import limitRequest from './middlewares/limitRequest.js';
import routes from './routes/index.js';
import typeDefs from './schemas/schemas.js';
import resolvers from './resolvers/resolvers.js';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
const port = process.env.PORT || 4000;
const app = express();
const httpServer = http.createServer(app);
app.use(helmet());
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(compression(compressionOptions));
app.use(limitRequest);
app.use(morgan('combined'));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(cors(corsOptions));
viewEngine(app);
routes(app);
const sv = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginLandingPageLocalDefault(),
    ],
});
await sv.start();
await connectDB();
app.use(cors(corsOptions), express.json(), expressMiddleware(sv));
await new Promise((resolve) => httpServer.listen({ port }, resolve));
console.log(colors.green(`🚀 Server ready at http://localhost:${port}`));
app.use(notFound);
app.use(errorHandler);
socket(sv);
