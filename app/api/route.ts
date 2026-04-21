import { signup } from "../lib/servicefirebase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await signup(req.body, (result: any) => {
      if (result.status === "success") {
        res.status(200).json({ status: true, message: result.message });
      } else {
        res.status(400).json({ status: false, message: result.message });
      }
    });
  } else {
    res.status(405).json({ status: false, message: "Method not allowed" });
  }
}