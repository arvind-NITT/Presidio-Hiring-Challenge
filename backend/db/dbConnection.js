import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    console.log(process.env.MONGODB_URI);
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'presidioProperty', // Specify the database name here
    });
    console.log(`\nMongoDB connected!! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

export default dbConnection;
