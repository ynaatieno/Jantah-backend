import mongoose from "mongoose";
import  express  from "express";
import dotenv from "dotenv"
import { router as authRoutes } from "./router/auth.js";
import { router as agencyRoutes } from "./router/agency.js";

import cors from "cors"


dotenv.config();
const PORT=process.env.PORT||4000;

const app = express();

mongoose
  .connect(process.env.MONGO_URI,{family: 4 })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`db is connected and server is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/auth",authRoutes);
app.use("/api/agency",agencyRoutes);




app.get("/", (req, res) => {
  res.send("welcome to Jantah API");
});
