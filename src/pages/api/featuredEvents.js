import mongo from "@/mongo/mongo";

const client = mongo();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await client.connect();
      const database = client.db("events");
      const collection = database.collection("events");
      const data = await collection.find({}).toArray();
      res.status(200).json(data);
    } finally {
      await client.close();
    }
  }
}
