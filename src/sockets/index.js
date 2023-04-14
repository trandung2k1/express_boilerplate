import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { supportHandler } from './support.js';
import dotenv from 'dotenv';
dotenv.config();
const socket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.headers['authorization'];
            if (token) {
                //check token
                jwt.verify(
                    token,
                    process.env.ACCESS_TOKEN_SECRET,
                    (error, user) => {
                        if (error?.name === 'TokenExpiredError') {
                            return next(new Error('Token is expired!'));
                        } else if (error) {
                            return next(new Error('Token is not valid!'));
                        }
                        next();
                    },
                );
            } else {
                return next(new Error("You're not authenticated"));
            }
        } catch (err) {
            console.log(err);
        }
    });
    const onConnection = (socket) => {
        supportHandler(io, socket);
    };
    // io.on('connection', (socket) => {
    //     console.log(socket.id);
    //     socket.on('hello', (msg) => {
    //         console.log(msg);
    //     });
    // });
    io.on('connection', onConnection);
};

export default socket;
