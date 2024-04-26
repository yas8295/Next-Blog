import mongo from "@/mongo/mongo";
import { ObjectId } from "mongodb";

const client = mongo();

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === "DELETE") {
    try {
      await client.connect();
    } catch (error) {
      throw new Error("failed try again!");
    }
    const database = client.db("events");
    const collection = database.collection("comments");
    try {
      await collection.deleteOne({ _id: new ObjectId(eventId) });
    } catch (error) {
      throw new Error("failed try again!");
    }
    client.close();
    return res.status(201).json({ message: "deleted comment successfully" });
  }

  if (req.method === "POST") {
    const comment = { ...req.body, id: eventId, time: new Date().getTime() };
    try {
      await client.connect();
    } catch (error) {
      throw new Error("failed try again!");
    }
    const database = client.db("events");
    const collection = database.collection("comments");
    try {
      await collection.insertOne(comment);
    } catch (error) {
      throw new Error("failed try again!");
    }
    client.close();
    return res.status(201).json({ message: "added comment successfully" });
  }

  if (req.method === "GET") {
    await client.connect();
    const database = client.db("events");
    const collection = database.collection("comments");
    const comments = await collection.find({ id: eventId }).toArray();
    client.close();
    return res.status(200).json(comments);
  }
}
