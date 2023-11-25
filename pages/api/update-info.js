import User from "@/models/User";
import { verifyPassword, verifyToken } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

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
  const { name, lastName, password } = req.body;
  const { token } = req.cookies;
  const secretKey = process.env.SECRET_KEY;
  if (!token) {
    return res
      .status(401)
      .json({ status: "failed", message: "you are not loged in" });
  }

  const result =verifyToken(token,secretKey);
  if(!result){
    return res
      .status(401)
      .json({ status: "failed", message: "you are unathorize" });
  }

  const user=await User.findOne({email:result.email})
  if(!user){
    return res
    .status(404)
    .json({ status: "failed", message: "user dost not exist" });
  }

  const isValid=await verifyPassword(password,user.password);
  if(!isValid){
    return res
    .status(422)
    .json({ status: "failed", message: "password is incorrect" });
  }

user.name=name;
user.lastName=lastName;
user.save();
return res.status(200).json({status:'success',message:'update successfuly'})
}
export default handler;
