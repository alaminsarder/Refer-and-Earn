import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./landing.css";

const h = React.createElement;

export default function Landing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  return h("div", { className: "landing-root" },
    
    // --- 1. PREMIUM NAVBAR ---
    h("nav", { className: "glass-nav" },
      h("div", { className: "container nav-flex" },
        h("div", { className: "brand-premium" }, h("div", { className: "logo-orb" }), "Refer", h("span", null, "Earn")),
        h("div", { className: "nav-links" },
          isLoggedIn 
            ? h(Link, { to: "/dashboard", className: "btn-premium-grad" }, "Dashboard")
            : h(React.Fragment, null, 
                h(Link, { to: "/login", className: "nav-link-item" }, "Sign In"),
                h(Link, { to: "/register", className: "btn-premium-grad" }, "Get Started")
              )
        )
      )
    ),

    // --- 2. HERO SECTION ---
    h("header", { className: "hero-section-v6" },
      h("div", { className: "hero-glow-1" }),
      h("div", { className: "hero-glow-2" }),
      h("div", { className: "container text-center" },
        h("div", { className: "premium-pill" }, "✨ Exclusive: Double rewards on every referral"),
        h("h1", { className: "hero-h1" }, "Grow Your Network.", h("br"), "Stack Your ", h("span", { className: "shine-text" }, "Earnings.")),
        h("p", { className: "hero-p" }, "The world's most transparent referral ecosystem. Join 50,000+ earners sharing and growing together with instant automated payouts."),
        h("div", { className: "hero-cta-group" },
          isLoggedIn 
            ? h(Link, { to: "/dashboard", className: "btn-main-premium" }, "Go to Dashboard")
            : h(Link, { to: "/register", className: "btn-main-premium" }, "Start Earning Now"),
          h("div", { className: "trust-labels" }, "● $1.2M+ Paid Out  ● 4.9/5 User Rating")
        )
      )
    ),

    // --- 3. STATS SECTION ---
    h("section", { className: "stats-banner" },
      h("div", { className: "container stats-grid" },
        h("div", { className: "stat-item" }, h("h2", null, "50K+"), h("p", null, "Users")),
        h("div", { className: "stat-item" }, h("h2", null, "$10M"), h("p", null, "Payouts")),
        h("div", { className: "stat-item" }, h("h2", null, "200+"), h("p", null, "Countries")),
        h("div", { className: "stat-item" }, h("h2", null, "24/7"), h("p", null, "Support"))
      )
    ),

    // --- 4. FEATURES & INSIGHTS (Your requested layout) ---
    h("section", { className: "features-insight-area" },
      h("div", { className: "container split-layout" },
        h("div", { className: "features-v6-grid" },
          h("div", { className: "premium-feat-card" }, h("div", { className: "icon-box blue" }, "🚀"), h("h4", null, "Ready to go"), h("p", null, "Create your account in seconds and get your unique referral link instantly.")),
          h("div", { className: "premium-feat-card" }, h("div", { className: "icon-box pink" }, "💳"), h("h4", null, "Payments"), h("p", null, "Automated payouts via Bank, PayPal, or Crypto wallets within minutes.")),
          h("div", { className: "premium-feat-card" }, h("div", { className: "icon-box purple" }, "👥"), h("h4", null, "Referrals"), h("p", null, "Invite friends and get a permanent commission on every subscription.")),
          h("div", { className: "premium-feat-card" }, h("div", { className: "icon-box orange" }, "🛡️"), h("h4", null, "Have query?"), h("p", null, "Our enterprise-level support team is here to help you 24 hours a day."))
        ),
        h("aside", { className: "glass-insight-card" },
          h("div", { className: "insight-img-v6" }, h("img", { src: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" })),
          h("div", { className: "insight-text-v6" }, h("h3", null, "Analytics Insights"), h("p", null, "Deep dive into your referral performance. Track conversion rates, click-throughs, and predicted earnings from one dashboard."))
        )
      )
    ),

    // --- 5. FAQ SECTION ---
    h("section", { className: "faq-section" },
      h("div", { className: "container" },
        h("h2", { className: "sec-title" }, "Common Questions"),
        h("div", { className: "faq-grid" },
          h("div", { className: "faq-item" }, h("h4", null, "How much can I earn?"), h("p", null, "There is no limit! You earn $10.00 plus 5% monthly recurring commission for every user.")),
          h("div", { className: "faq-item" }, h("h4", null, "When do I get paid?"), h("p", null, "Payments are processed instantly once you reach the minimum threshold of $50.00."))
        )
      )
    ),

    // --- 6. MULTI-COLUMN FOOTER ---
    h("footer", { className: "footer-ultra" },
      h("div", { className: "container footer-grid" },
        h("div", { className: "footer-brand-col" },
          h("div", { className: "brand-premium light" }, h("div", { className: "logo-orb" }), "Refer", h("span", null, "Earn")),
          h("p", { className: "footer-desc" }, "Empowering the next generation of digital earners through transparent and efficient referral networking."),
          h("div", { className: "social-row" }, h("span", null, "FB"), h("span", null, "TW"), h("span", null, "IG"), h("span", null, "LI"))
        ),
        h("div", { className: "footer-links" },
          h("h5", null, "Product"),
          h("ul", null, h("li", null, "Features"), h("li", null, "Rewards"), h("li", null, "Games"), h("li", null, "API"))
        ),
        h("div", { className: "footer-links" },
          h("h5", null, "Company"),
          h("ul", null, h("li", null, "About Us"), h("li", null, "Careers"), h("li", null, "Press"), h("li", null, "Trust & Safety"))
        ),
        h("div", { className: "footer-links" },
          h("h5", null, "Support"),
          h("ul", null, h("li", null, "Help Center"), h("li", null, "Contact Us"), h("li", null, "Privacy Policy"), h("li", null, "Terms"))
        )
      ),
      h("div", { className: "footer-bottom-line" },
        h("div", { className: "container" }, h("p", null, "© 2024 ReferEarn Inc. All rights reserved. Made with ❤️ for the community."))
      )
    )
  );
}