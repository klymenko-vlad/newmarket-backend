import mongoose from "mongoose";
async function connectDb() {
    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL must be defined");
    }
    try {
        await mongoose.connect(process.env.MONGO_URL, {});
        console.warn("Mongodb connected");
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}
export default connectDb;
//# sourceMappingURL=connectDB.func.js.map