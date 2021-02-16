"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LinkSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    from: { type: String, required: true, unique: true },
    to: { type: String, required: true },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
exports.default = mongoose_1.model("Link", LinkSchema);
//# sourceMappingURL=link.model.js.map