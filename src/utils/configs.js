const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
const compressionOptions = {
    level: 6,
    threshold: 100 * 1000,
};

module.exports = { corsOptions, compressionOptions };
