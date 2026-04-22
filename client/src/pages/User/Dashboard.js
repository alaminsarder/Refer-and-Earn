import React, { useEffect, useMemo, useState } from "react";
import { getMe, myReferrals, payFirst } from "../../services/auth.api";

export default function Dashboard() {
  const [me, setMe] = useState(null);
  const [refs, setRefs] = useState([]);
  const [msg, setMsg] = useState("");

  const referralLink = useMemo(() => {
    if (!me?.referralCode) return "";
    return `${window.location.origin}/register?ref=${me.referralCode}`;
  }, [me]);

  const load = async () => {
    const a = await getMe();
    setMe(a.data.user);

    const b = await myReferrals();
    setRefs(b.data.referrals || []);
  };

  useEffect(() => {
    load().catch(() => setMsg("Failed to load dashboard"));
  }, []);

  const simulateFirstPay = async () => {
    setMsg("");
    try {
      await payFirst();
      setMsg("First subscription payment done (demo). Now referrer will get reward if exists.");
      await load();
    } catch (e) {
      setMsg(e?.response?.data?.message || "Payment demo failed");
    }
  };

  if (!me) return <div style={{ padding: 24 }}>Loading...</div>;

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h2>Dashboard</h2>
      {msg ? <p>{msg}</p> : null}

      <div style={{ display: "grid", gap: 8, marginBottom: 18 }}>
        <div><b>Name:</b> {me.name}</div>
        <div><b>Email:</b> {me.email}</div>
        <div><b>Referral Code:</b> {me.referralCode}</div>
        <div><b>Wallet:</b> {me.walletBalance}</div>
        <div><b>First Paid:</b> {String(me.isFirstPaid)}</div>
        <div>
          <b>My Referral Link:</b>{" "}
          <input style={{ width: "100%" }} readOnly value={referralLink} />
        </div>
      </div>

      <button onClick={simulateFirstPay}>Simulate First Subscription Payment</button>

      <hr style={{ margin: "20px 0" }} />
      <h3>My Referrals</h3>

      <div style={{ display: "grid", gap: 10 }}>
        {refs.map((r) => (
          <div key={r._id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
            <div><b>Status:</b> {r.status}</div>
            <div><b>User:</b> {r.referred?.name} ({r.referred?.email})</div>
            <div><b>Joined:</b> {new Date(r.createdAt).toLocaleString()}</div>
          </div>
        ))}
        {!refs.length ? <p>No referrals yet.</p> : null}
      </div>
    </div>
  );
}