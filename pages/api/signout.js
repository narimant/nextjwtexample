import { serialize } from "cookie";

async function handler(req, res) {
  if (req.method !== "GET") return;
  const serilized = serialize("token", "", { path: "/", maxAge: 0 });
  res
    .status(200)
    .setHeader("Set-Cookie", serilized)
    .json({ status: "success", message: "logout" });
}

export default handler;
