import mongoose from "mongoose";

const URI =
  "mongodb+srv://marcosmartos:Escandinava@cluster0.4uhpvlo.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((error) => console.log(error));
