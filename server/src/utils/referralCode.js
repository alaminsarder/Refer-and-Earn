function makeReferralCode(prefix = "REF") {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix}-${rand}`;
}

module.exports = { makeReferralCode };