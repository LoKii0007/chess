import { db } from "../db";
import { Request, Response } from "express";

const addUser = async (req: Request, res: Response) => {
  const { email, name, image, provider } = req.body;
  try {
    const newUser = await db.user.create({
      data: {
        email: email,
        provider: provider,
        createdAt: new Date() ,
        name: name,
      },
    })
    console.log("addeduser", newUser);
    res.status(200).json(newUser)
  } catch (error) {
    res.status(400).json({error : 'failed to add user'})
  }
}

module.exports = addUser
