import express from "express";
import "./db/config.js";
import { studentsManager } from "./studentsManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.get("/", async (req, res) => {
  const students = await studentsManager.findAll();
  res.json({ message: "students", students });
});

app.get("/:idStudent", async (res, req) => {
  const { idStudent } = req.params;
  const student = await studentsManager.findById(idStudent);
  res.json({ message: "student", student });
});

app.post("/", async (req, res) => {
  const createdStudent = await studentsManager.createOne(req.body);
  res.json({ message: "student created", student: createdStudent });
});

app.delete("/:idStudent", async (req, res) => {
  const deletedStudent = await studentsManager.deleteOne(idStudent);
  res.json({ message: "student deleted", student: deletedStudent });
});

app.listen(8080, () => {
  console.log("Conectado al puerto 8080");
});
