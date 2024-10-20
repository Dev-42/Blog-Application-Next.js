import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://devbhattacharya42:QlRaP2PkOa9joguy@blogcluster.trrmu.mongodb.net/";

  try {
    // Include recommended options for enhanced connection robustness
    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Blog Database");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
