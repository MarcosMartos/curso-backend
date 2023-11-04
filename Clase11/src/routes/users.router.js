import { Router } from "express";
import { usersManager } from "../managers/usersManager.js";

const router = Router();

router.get("/:idUser", async (req, res) => {
  const { idUser } = req.params;

  try {
    const user = await usersManager.getById(idUser);
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const createdUser = await usersManager.createOne(req.body);
    res.status(200).json({ message: "User created", user: createdUser });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
