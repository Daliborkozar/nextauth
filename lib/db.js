import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://think:KiseliKrastavac123@cluster0.mmi6y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );

  return client
}
