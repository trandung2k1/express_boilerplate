const whitelist = [
    'http://localhost:3000',
    '*',
    'https://studio.apollographql.com',
];
export const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
export const compressionOptions = {
    level: 6,
    threshold: 100 * 1000,
};
