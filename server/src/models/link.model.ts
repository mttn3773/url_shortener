import { ILink } from "./../interfaces/link.interface";
import { Schema, model } from "mongoose";

const LinkSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    from: { type: String, required: true, unique: true },
    to: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    code: { type: String, unique: true, required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default model<ILink>("Link", LinkSchema);
