



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import convertRoutes from "./routes/convertRoutes.js";

dotenv.config();

const app = express();
app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use(express.json());

app.use("/api/convert", convertRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});

