import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

async function handler(req, res) {
    //check request method is post and connect to database
  if (req.method !== "POST") {
    return;
  }
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "failed", message: "error in connect to database" });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "invalid data" });
  }

  //chek email on the database if exist
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res
      .status(422)
      .json({ status: "failed", message: "user exist already" });
  }
  //end check

  //inser new user to database
  const hashedPassword=await hashPassword(password);

  const newUser=await User.create({email:email,password:hashedPassword});
  console.log(newUser);
  res.status(201).json({status:'success',message:'user created succesfuly'})
}
export default handler;
