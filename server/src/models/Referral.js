const mongoose = require("mongoose");

const ReferralSchema = new mongoose.Schema(
  {
    referrer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    referred: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    status: { type: String, enum: ["joined", "first_paid"], default: "joined" },
  },
  { timestamps: true }
);

ReferralSchema.index({ referrer: 1, referred: 1 }, { unique: true });

module.exports = mongoose.model("Referral", ReferralSchema);