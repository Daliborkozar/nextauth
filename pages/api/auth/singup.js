import { connectToDatabase } from "../../../lib/db";
import { hashpassword } from "../../../lib/auth";

const handler = async (req, res) => {
  const data = req.body;

  const { email, password } = data;
  if (password)
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      //validate email and pass
      res.status(422).json({ message: "invalid input - password 7 chars min" });
    }

  // Connect to database

  const client = await connectToDatabase();
  const db = client.db();
  const existingUser = await db.collection("users").findOne({ email: email });
  if (existingUser) {
    res.status(422).json({
      message: "User already registered",
    });
    // we use close to avoid unnecesary connect to db not really needed
    client.close();
    return;
  }
  //check if user exist in db
  // create new user and store in collection(db)
  const hashpass = await hashpassword(password);
  // never store the password unencrypted
  const result = await db.collection("users").insertOne({
    email: email,
    password: hashpass,
  });

  res.status(201).json({
    message: "Created user",
  });
};

export default handler;
