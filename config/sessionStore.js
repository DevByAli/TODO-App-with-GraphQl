import connectMongoDBSession from "connect-mongodb-session";
import session from "express-session";
import { configDotenv } from "dotenv";
configDotenv();


const MongoDBStore = connectMongoDBSession(session);
const SessionStore = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: process.env.SESSION_COLLECTION,
  databaseName: process.env.DB_NAME,
});

export default SessionStore