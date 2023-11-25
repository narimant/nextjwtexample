import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

async function handler(req, res) {
  if (req.method !== "POST") return;

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

  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "email not found" });
  }

  const isValid = await verifyPassword(password, user.password);

  const expire=24 * 60 * 60;
  if (!isValid) {
    return res
      .status(422)
      .json({ status: "failed", message: "user or pass incorect" });
  }
  const token = sign({ email }, process.env.SECRET_KEY, {
    expiresIn:expire,
  });
  res
    .status(200)
    .setHeader("Set-Cookie",serialize('token',token,{httpOnly:true,maxAge:expire,path:'/'}))
    .json({
      status: "success",
      message: "logged in",
      data: { email: user.email },
    });
}
export default handler;
