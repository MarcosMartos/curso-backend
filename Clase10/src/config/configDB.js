import mongoose from "mongoose";

const URI =
  "mongodb+srv://marcosmartos:Escandinava@cluster0.4uhpvlo.mongodb.net/clase10?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err));
