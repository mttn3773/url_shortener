"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    links: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Link" }],
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
UserSchema.pre("save", function (next) {
    this.email = this.email.toLowerCase();
    next();
});
exports.default = mongoose_1.model("User", UserSchema);
//# sourceMappingURL=user.model.js.map