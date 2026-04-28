import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const h = React.createElement;

// স্পিন হুইলের ১৪টি সেগমেন্ট (আপনার রিকোয়েস্ট অনুযায়ী)
const WHEEL_VALS = ["10", "20", "00", "50", "10", "00", "30", "10", "100", "50", "10", "00", "20", "10"];

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [coins, setCoins] = useState(500);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [flipResult, setFlipResult] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (!data) navigate("/login");
    else setUser(JSON.parse(data));
  }, [navigate]);

  const logout = () => { localStorage.clear(); navigate("/login"); };

  // --- Spin Logic ---
  const handleSpin = () => {
    if (coins < 20 || isSpinning) return;
    setCoins(c => c - 20);
    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * 14);
    const newRot = rotation + (360 * 5) + (360 - (randomIndex * (360 / 14)));
    setRotation(newRot);
    setTimeout(() => {
      setIsSpinning(false);
      setCoins(c => c + parseInt(WHEEL_VALS[randomIndex]));
    }, 4000);
  };

  if (!user) return h("div", { className: "loader" }, "Loading...");

  return h("div", { className: "dashboard-container" },
    h("aside", { className: "sidebar-modern" },
      h("div", { className: "side-logo" }, "Refer", h("span", null, "Earn")),
      h("nav", { className: "side-nav" },
        h("button", { className: activeTab === "overview" ? "active" : "", onClick: () => setActiveTab("overview") }, "Overview"),
        h("button", { className: activeTab === "network" ? "active" : "", onClick: () => setActiveTab("network") }, "My Network"),
        h("button", { className: activeTab === "payout" ? "active" : "", onClick: () => setActiveTab("payout") }, "Payouts"),
        h("button", { className: activeTab === "games" ? "active" : "gold-link", onClick: () => setActiveTab("games") }, "Casino Games"),
        h("button", { className: activeTab === "profile" ? "active" : "", onClick: () => setActiveTab("profile") }, "My Profile")
      ),
      h("button", { className: "side-logout", onClick: logout }, "Logout")
    ),

    h("main", { className: "main-content" },
      h("header", { className: "top-header" },
        h("h2", null, activeTab.toUpperCase()),
        h("div", { className: "user-pill", onClick: () => setActiveTab("profile") }, 
          h("span", null, "🪙 " + coins),
          h("div", { className: "avatar" }, user.name[0])
        )
      ),

      // --- OVERVIEW ---
      activeTab === "overview" && h("div", { className: "tab-body" },
        h("div", { className: "stats-row" },
          h("div", { className: "stat-card blue" }, h("p", null, "Balance"), h("h2", null, "$"+user.earnings)),
          h("div", { className: "stat-card purple" }, h("p", null, "Referrals"), h("h2", null, "12"))
        ),
        h("div", { className: "invite-box" },
          h("h4", null, "Referral Link"),
          h("div", { className: "copy-row" },
            h("input", { readOnly: true, value: window.location.origin+"/register?ref="+user.referralCode }),
            h("button", { onClick: () => alert("Copied!") }, "Copy")
          )
        )
      ),

      // --- PAYOUT ---
      activeTab === "payout" && h("div", { className: "tab-body" },
        h("div", { className: "payout-card" },
          h("div", { className: "payout-header" }, h("button", null, "Withdraw"), h("button", null, "Deposit")),
          h("div", { className: "payout-inputs" },
            h("input", { type: "number", placeholder: "Amount ($)" }),
            h("select", null, h("option", null, "Bkash"), h("option", null, "Bank")),
            h("button", { className: "btn-payout" }, "Process")
          )
        )
      ),

      // --- NETWORK ---
      activeTab === "network" && h("div", { className: "tab-body" },
        h("div", { className: "network-table-card" },
          h("table", null, 
            h("thead", null, h("tr", null, h("th", null, "Name"), h("th", null, "Status"))),
            h("tbody", null, h("tr", null, h("td", null, "Sabbir Hossain"), h("td", null, "Active")))
          )
        )
      ),

      // --- CASINO GAMES ---
      activeTab === "games" && h("div", { className: "casino-view" },
        h("div", { className: "spin-section" },
          h("div", { className: "wheel-container" },
            h("div", { className: "wheel-pointer" }),
            h("div", { className: "wheel-main", style: { transform: `rotate(${rotation}deg)` } },
              WHEEL_VALS.map((v, i) => h("div", { key: i, className: "wheel-seg", style: { transform: `rotate(${i * (360/14)}deg)` } }, h("span", null, v)))
            )
          ),
          h("button", { className: "btn-spin", onClick: handleSpin, disabled: isSpinning }, "SPIN (20 Coins)")
        )
      ),

      // --- PROFILE SECTION ---
      activeTab === "profile" && h("div", { className: "profile-view" },
        h("div", { className: "profile-card" },
          h("div", { className: "profile-top-grad" }),
          h("div", { className: "profile-info" },
            h("div", { className: "avatar-large" }, user.name[0]),
            h("h1", null, user.name),
            h("p", null, user.email),
            h("div", { className: "info-grid" },
              h("div", { className: "info-item" }, h("label", null, "Referral Code"), h("p", null, user.referralCode)),
              h("div", { className: "info-item" }, h("label", null, "Total Earned"), h("p", null, "$"+user.earnings))
            ),
            h("button", { className: "btn-profile-logout", onClick: logout }, "Sign Out")
          )
        )
      )
    )
  );
}