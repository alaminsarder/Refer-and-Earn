const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const User = require("../models/User");
const Referral = require("../models/Referral");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-passwordHash");
  res.json({ user });
});

router.get("/my-referrals", auth, async (req, res) => {
  const refs = await Referral.find({ referrer: req.user.id })
    .populate("referred", "name email isFirstPaid createdAt")
    .sort({ createdAt: -1 });

  res.json({ referrals: refs });
});

module.exports = router;