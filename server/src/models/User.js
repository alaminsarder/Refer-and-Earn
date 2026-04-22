const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },

    role: { type: String, enum: ["user", "admin"], default: "user" },

    referralCode: { type: String, unique: true, index: true },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

    isFirstPaid: { type: Boolean, default: false },

    walletBalance: { type: Number, default: 0 }, // simple wallet
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);