import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Data from "./dataModal.js";
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(
    `mongodb+srv://zainwaseem9371:zFRcKR1sYcB0Ubdi@cluster0.w1v7xzs.mongodb.net/`
  )
  .then(() => console.log(`Connected to MongoDB`))
  .catch((error) => console.log(error));
1;

app.post("/api/data", async (req, res) => {
  console.log(req.body);
  try {
    const { TokenId, Text, URL } = req.body;

    const newRecord = new Data({
      TokenId,
      Text,
      URL,
    });
    await newRecord.save();
    return res.status(200).json({ message: `Your Data Saved successfully` });
  } catch (error) {
    console.log(error);
  }
});
app.put("/api/data/:id", async (req, res) => {
  try {
    const { TokenId, Text, URL } = req.body;
    if (!URL || !Text || !TokenId) {
      return res.json({
        message: "Please fill out the fields.",
      });
    }
    await Data.findByIdAndUpdate(req.params.id, {
      TokenId,
      Text,
      URL,
    });
    res.status(200).json({ message: `Data Saved successfully` });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/data", async (req, res) => {
  try {
    const dataa = await Data.find();
    return res.json(dataa);
  } catch (error) {
    console.log(error);
  }
});
app.get("/api/data/:TokenId", async (req, res) => {
  try {
    const dataa = await Data.findOne({ TokenId: req.params.TokenId });
    if (dataa) res.json(dataa);
    else res.json(`No Records To Show`);
    console.log(dataa);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/data/:id", async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  try {
    await Data.findByIdAndDelete(id);
    return res.json({ message: `Record deleted` });
  } catch (error) {
    console.log(error);
  }
});

app.listen(8800, () => {
  console.log("Server is up an Running");
});
