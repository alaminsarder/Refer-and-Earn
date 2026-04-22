const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const User = require("../models/User");
const Referral = require("../models/Referral");

// demo endpoint: mark current user as "paid first time"
router.post("/pay-first", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.isFirstPaid) {
    return res.json({ ok: true, message: "Already first paid", walletBalance: user.walletBalance });
  }

  user.isFirstPaid = true;
  await user.save();

  // reward logic: if referredBy exists, add fixed reward to referrer
  const REWARD_AMOUNT = 100; // change your amount

  if (user.referredBy) {
    // update referral status
    await Referral.findOneAndUpdate(
      { referrer: user.referredBy, referred: user._id },
      { status: "first_paid" }
    );

    // credit referrer wallet
    await User.findByIdAndUpdate(user.referredBy, { $inc: { walletBalance: REWARD_AMOUNT } });
  }

  res.json({ ok: true, message: "First subscription payment recorded" });
});

module.exports = router;