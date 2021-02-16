import { Schema, model } from "mongoose";
import { IUser } from "src/interfaces/user.interface";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    links: [{ type: Schema.Types.ObjectId, ref: "Link" }],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

UserSchema.pre<IUser>("save", function (next) {
  this.email = this.email.toLowerCase();
  next();
});

export default model<IUser>("User", UserSchema);
