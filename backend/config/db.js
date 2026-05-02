const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://ishamishrak:89i0rDtoLbG3nu7c@ac-bhvhudu-shard-00-00.x5grkyh.mongodb.net:27017,ac-bhvhudu-shard-00-01.x5grkyh.mongodb.net:27017,ac-bhvhudu-shard-00-02.x5grkyh.mongodb.net:27017/caremate?ssl=true&replicaSet=atlas-kh01wk-shard-0&authSource=admin&appName=Cluster0");

        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
