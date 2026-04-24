import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const h = React.createElement;

/* --- Icons --- */
const Icons = {
  Home: () => h("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, h("path", { d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" })),
  Wallet: () => h("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, h("rect", { x: "2", y: "5", width: "20", height: "14", rx: "2" }), h("path", { d: "M12 12h.01" })),
  Network: () => h("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, h("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }), h("circle", { cx: "9", cy: "7", r: "4" }), h("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }), h("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })),
  Logout: () => h("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, h("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }), h("polyline", { points: "16 17 21 12 16 7" }), h("line", { x1: "21", x2: "9", y1: "12", y2: "12" }))
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // overview, payout, network
  const [payoutType, setPayoutType] = useState("withdraw"); // withdraw or deposit

  // Mock Referral Data (পরে API থেকে আসবে)
  const referrals = [
    { id: 1, name: "Sabbir Hossain", email: "sabbir@example.com", status: "Active", reward: "$10.00" },
    { id: 2, name: "Tanvir Ahmed", email: "tanvir@example.com", status: "Pending", reward: "$0.00" },
    { id: 3, name: "Rakibul Islam", email: "rakib@example.com", status: "Active", reward: "$10.00" },
  ];

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) navigate("/login");
    else setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => { localStorage.clear(); navigate("/login"); };

  if (!user) return h("div", { className: "loader" }, "Connecting to Secure Server...");

  return h("div", { className: "app-container" },
    
    // --- SIDEBAR ---
    h("aside", { className: "sidebar-pro" },
      h("div", { className: "brand-area" }, "Refer", h("span", null, "Earn")),
      h("nav", { className: "side-nav" },
        h("button", { className: activeTab === "overview" ? "active" : "", onClick: () => setActiveTab("overview") }, Icons.Home(), h("span", null, "Dashboard")),
        h("button", { className: activeTab === "payout" ? "active" : "", onClick: () => setActiveTab("payout") }, Icons.Wallet(), h("span", null, "Payouts")),
        h("button", { className: activeTab === "network" ? "active" : "", onClick: () => setActiveTab("network") }, Icons.Network(), h("span", null, "My Network"))
      ),
      h("button", { className: "signout-btn", onClick: handleLogout }, Icons.Logout(), h("span", null, "Logout"))
    ),

    // --- MAIN ---
    h("main", { className: "main-panel" },
      h("header", { className: "dash-top" },
        h("div", null, h("h2", null, "Welcome, " + user.name), h("p", null, "Manage your referral empire")),
        h("div", { className: "profile-icon" }, user.name[0])
      ),

      // --- OVERVIEW ---
      activeTab === "overview" && h("div", { className: "view-container" },
        h("div", { className: "balance-row" },
          h("div", { className: "card-stat blue" }, h("p", null, "Main Balance"), h("h3", null, "$ " + (user.earnings || "0.00"))),
          h("div", { className: "card-stat purple" }, h("p", null, "Total Referrals"), h("h3", null, "15")),
          h("div", { className: "card-stat green" }, h("p", null, "Pending Bonus"), h("h3", null, "$ 50.00"))
        ),
        h("div", { className: "invite-banner" },
          h("div", null, h("h4", null, "Invite and earn $10 per person"), h("p", null, "Share your link to grow your earnings.")),
          h("div", { className: "link-group" },
            h("input", { readOnly: true, value: window.location.origin + "/register?ref=" + user.referralCode }),
            h("button", { onClick: () => { navigator.clipboard.writeText(window.location.origin + "/register?ref=" + user.referralCode); alert("Copied!"); } }, "Copy")
          )
        )
      ),

      // --- PAYOUT (Deposit & Withdraw) ---
      activeTab === "payout" && h("div", { className: "view-container" },
        h("div", { className: "payout-toggle" },
          h("button", { className: payoutType === "withdraw" ? "selected" : "", onClick: () => setPayoutType("withdraw") }, "Withdraw"),
          h("button", { className: payoutType === "deposit" ? "selected" : "", onClick: () => setPayoutType("deposit") }, "Deposit")
        ),
        h("div", { className: "payout-box" },
          h("h3", null, payoutType === "withdraw" ? "Cash Out Your Earnings" : "Deposit Funds to Wallet"),
          h("div", { className: "form-payout" },
            h("label", null, "Amount ($)"),
            h("input", { type: "number", placeholder: "Enter amount" }),
            h("label", null, "Payment Gateway"),
            h("select", null, h("option", null, "Bkash / Nagad"), h("option", null, "Bank Transfer"), h("option", null, "PayPal")),
            h("button", { className: "btn-submit-payout" }, payoutType === "withdraw" ? "Request Withdrawal" : "Make Deposit")
          )
        )
      ),

      // --- MY NETWORK ---
      activeTab === "network" && h("div", { className: "view-container" },
        h("h3", { className: "view-title" }, "Referral Network"),
        h("div", { className: "table-wrapper" },
          h("table", { className: "network-table" },
            h("thead", null, h("tr", null, h("th", null, "Name"), h("th", null, "Email"), h("th", null, "Status"), h("th", null, "Commission"))),
            h("tbody", null, referrals.map(ref => 
              h("tr", { key: ref.id }, 
                h("td", null, ref.name), h("td", null, ref.email), 
                h("td", null, h("span", { className: "badge " + ref.status.toLowerCase() }, ref.status)),
                h("td", null, ref.reward)
              )
            ))
          )
        )
      )
    )
  );
}