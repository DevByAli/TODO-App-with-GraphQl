import express from "express";
import session from "express-session";
import { configDotenv } from "dotenv";

import * as swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };

import SessionStore from "./config/sessionStore.js";
import connectDB from "./db/connectDB.js";
import router from "./routers/index.js";
import { ErrorMiddleware } from "./middlewares/error.middleware.js";

// Graphql Imports
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./graphql/typedef.js";
import resolvers from "./graphql/resolver.js";
import AuthMiddleware from "./middlewares/auth.middleware.js";

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: SessionStore,
    cookie: {
      maxAge: +process.env.SESSION_EXPIRY,
    },
    rolling: true,
  })
);

const GraphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
});
await GraphqlServer.start();

// Graphql Server and Endpoint
app.use(
  "/graphql",
  express.json(),
  expressMiddleware(
    GraphqlServer,
    {
      context: async ({ req, res }) => {
        return {
          request: req,
          response: res,
          user: req.session.user,
        };
      },
    },
    ErrorMiddleware
  )
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// REST API Endpoints
app.use("/api/v1", router);

app.use(ErrorMiddleware);
app.use("*", (req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
