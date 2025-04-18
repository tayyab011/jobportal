import mongoose from "mongoose";
const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    website: { type: String },
    location: { type: String },
    logo: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const companyModel = mongoose.model("Companies", companySchema);