import { MongoClient } from "mongodb";

export async function getStaticProps() {

  const client = await MongoClient.connect(`${process.env.MONGO_DB_URL}`);

  const db = client.db();

  const yourCollection = db.collection("yourCollection");


  const yourData = await yourCollection.find().toArray();

  client.close();

  return {
    props: yourData
  };
}