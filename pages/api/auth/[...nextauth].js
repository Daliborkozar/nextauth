// for all other routes
// https://next-auth.js.org/getting-started/rest-api
import NextAuth from "next-auth";
import { connectToDatabase } from "../../../lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { verifyPassword } from "../../../lib/auth";

//executes nextAuthhandler since it is an api route
//we can pass a config object to it to configure its behaviour
export default NextAuth({
  providers: [
    CredentialsProvider({
      session: {
        //to use json web tokens
        jwt: true,
      },
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.

      //   credentials: {
      //     username: { label: "Username", type: "text", placeholder: "jsmith" },
      //     password: {  label: "Password", type: "password" }
      //   },

      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const connect = await connectToDatabase();
        const res = await axios("/api/auth/login", credentials);

        //check if we have a user
        const userCollections = connect.db().collection("users");
        const user = await userCollections.findOne({
          email: credentials.email,
        });

        // we use close to avoid unnecesary connect to db not really needed
        connect.close();
        // If no error and we have user data, return it
        if (!user) {
          throw new Error("no user found");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        // Return null if user data could not be retrieved
        if (!isValid) {
          // we use close to avoid unnecesary connect to db not really needed
          connect.close();
          throw new Error("You are not allowed to login");
        }

        // return if authorized
        return { email: user.email };
      },
    }),
  ],
});
