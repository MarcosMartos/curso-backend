import express from "express";
import usersRouter from "./routes/users.router.js";
import "./db/configDB.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", usersRouter);

app.listen(8080, () => {
  console.log("Escuchando al puerto 8080");
});
