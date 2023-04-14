export const supportHandler = (io, socket) => {
    console.log(socket.id);
    socket.on('hello', (msg) => {
        console.log(msg);
    });
};
