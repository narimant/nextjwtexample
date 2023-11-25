import { verifyToken } from "@/utils/auth";

async function handler(req, res) {
  if (req.method !== "GET") return;
  const {token} = req.cookies;
  if(!token){
    return res.status(401).json({status:"failed",message:"you are not login"})
  }

  const secretKey=process.env.SECRET_KEY;

  const result=verifyToken(token,secretKey);

  if(result){

    res.status(200).json({status:'success',message:'your ok'})
  }else
  {
    res.status(401).json({status:'failed',message:'your not ok'})
  }

}
export default handler;
