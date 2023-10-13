import mongoose from "mongoose";

const URI =
  "mongodb+srv://marcosmartos:Escandinava@cluster0.4uhpvlo.mongodb.net/miprimerbasededatos?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) => console.log(error));
