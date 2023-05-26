import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    TokenId: { type: String },
    Text: { type: String },
    URL: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Data", dataSchema);
