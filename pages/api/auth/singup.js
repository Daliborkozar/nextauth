import { connectToDatabase } from "../../../lib/db";
import { hashpassword } from "../../../lib/auth";


const handler = async (req, res) => {
  const data = req.body;

  const { email, password } = data;
  //validate email and pass
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: "invalid input - password 7 chars min" });
  }

  const hashpass = hashpassword(password)
  // Connect to database
  const client = await connectToDatabase();
  const db = client.db();
  // create new user and store in collection(db)
  // never store the password unencrypted
  const result = await db.collection("users").insertOne({
      email: email,
      password: hashpass
  })

  res.status(201).json({
      message: 'Created user'
  })
};

export default handler;
