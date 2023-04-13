const mongoose = require('mongoose');
const colors = require('colors');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            connectTimeoutMS: 1000,
            serverSelectionTimeoutMS: 5000,
            autoIndex: false,
        });
        console.log(colors.green('Connected to MongoDB successfully!'));
    } catch (error) {
        console.log(colors.red('Connected to MongoDB failed'));
        process.exit(1);
    }
};
process.on('SIGINT', async () => {
    console.log(colors.red('Killed server'));
    await mongoose.connection.close();
    process.exit(0);
});
module.exports = connectDB;
