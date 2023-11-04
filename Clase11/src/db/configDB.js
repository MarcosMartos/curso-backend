import mongoose from "mongoose";

const URI =
  "mongodb+srv://marcosmartos:clase11@cluster0.4uhpvlo.mongodb.net/clase11backend?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => {
    console.log("Conectado a la db");
  })
  .catch((err) => console.log(err));
