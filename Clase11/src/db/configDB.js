import mongoose from "mongoose";

const URI =
  "mongodb+srv://marcosmartos:escandinava@cluster0.4uhpvlo.mongodb.net/clase11?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => {
    console.log("Conectado a la db");
  })
  .catch((err) => console.log(err));
