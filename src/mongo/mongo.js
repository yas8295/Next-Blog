import { MongoClient } from "mongodb";

export default function mongo() {
  const uri =
    "mongodb+srv://mohamedyas8295:dKb432rDbxboAHi7@nextjs.am9b355.mongodb.net/?retryWrites=true&w=majority&appName=NextJS";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client;
}
