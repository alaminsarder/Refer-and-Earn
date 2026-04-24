import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

const h = React.createElement;

/* ---------- Colorful SVG Icons ---------- */
const Icons = {
  Rocket: () => h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5" }, h("path", { d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.79-1.81.19-2.55L4.5 16.5z" }), h("path", { d: "M15 15l-3.5 3.5c-.71.71-1.81.79-2.55.19l-3.34-3.34c-.6-.6-.52-1.7.19-2.41L9.3 9.44l5.7 5.56z" })),
  Card: () => h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5" }, h("rect", { x: "2", y: "5", width: "20", height: "14", rx: "2" }), h("path", { d: "M2 10h20" })),
  Refer: () => h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5" }, h("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }), h("circle", { cx: "9", cy: "7", r: "4" })),
  Help: () => h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5" }, h("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }))
};

export default function Landing() {
  return h("div", { className: "landing-root" },
    
    // --- Navbar ---
    h("nav", { className: "navbar-colorful" },
      h("div", { className: "container nav-flex" },
        h("div", { className: "brand-logo" }, h("span", { className: "logo-dot" }, "●"), "Refer&", h("span", { className: "color-text" }, "Earn")),
        h("div", { className: "nav-links" },
          h(Link, { to: "/login", className: "nav-item" }, "Login"),
          h(Link, { to: "/register", className: "btn-gradient-sm" }, "Get Started")
        )
      )
    ),

    // --- Hero Section ---
    h("header", { className: "hero-colorful" },
      h("div", { className: "hero-overlay" }),
      h("div", { className: "container" },
        h("div", { className: "hero-content" },
          h("div", { className: "badge-hot" }, "🔥 New: Earn 20% more this month!"),
          h("h1", { className: "hero-h" }, "Invite Friends. ", h("br"), "Earn ", h("span", { className: "text-shine" }, "Real Rewards.")),
          h("p", { className: "hero-p" }, "The ultimate referral platform. Share your passion, grow your network, and get paid instantly to your wallet."),
          h("div", { className: "hero-actions" },
            h(Link, { to: "/register", className: "btn-gradient-lg" }, "Start Earning Now"),
            h("p", { className: "hero-trust" }, "Trusted by 10,000+ happy members")
          )
        )
      )
    ),

    // --- Features & Insight (ছবি অনুযায়ী লেআউট) ---
    h("section", { className: "feature-insight-sec" },
      h("div", { className: "container" },
        h("div", { className: "split-layout" },
          
          // Left: Colorful Features Grid
          h("div", { className: "features-colorful-grid" },
            h("div", { className: "f-card-v4" },
              h("div", { className: "f-icon-box bg-blue" }, Icons.Rocket()),
              h("h4", null, "Ready to go"),
              h("p", null, "Sign up today and get your link instantly to start your journey.")
            ),
            h("div", { className: "f-card-v4" },
              h("div", { className: "f-icon-box bg-pink" }, Icons.Card()),
              h("h4", null, "Payments"),
              h("p", null, "Multiple payment gateways. Fast and secure withdrawals.")
            ),
            h("div", { className: "f-card-v4" },
              h("div", { className: "f-icon-box bg-purple" }, Icons.Refer()),
              h("h4", null, "Referrals"),
              h("p", null, "Invite friends, watch them subscribe, and get your commission.")
            ),
            h("div", { className: "f-card-v4" },
              h("div", { className: "f-icon-box bg-orange" }, Icons.Help()),
              h("h4", null, "24/7 Support"),
              h("p", null, "We are always here to help you solve any issues ASAP.")
            )
          ),

          // Right: Insight Card with Colorful Glow
          h("aside", { className: "insight-premium-card" },
            h("div", { className: "insight-img-wrap" },
              h("img", { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80", alt: "Team" })
            ),
            h("div", { className: "insight-info" },
              h("h3", null, "Get insights"),
              h("p", null, "Track your referral history, conversion status, and wallet growth in real-time.")
            )
          )
        )
      )
    ),

    // --- CTA Section ---
    h("section", { className: "cta-colorful" },
      h("div", { className: "container" },
        h("div", { className: "cta-box-v2" },
          h("h2", null, "Ready to grow your income?"),
          h(Link, { to: "/register", className: "btn-white-v2" }, "Create Account Now")
        )
      )
    ),

    // --- Colorful Footer ---
    h("footer", { className: "footer-dark" },
      h("div", { className: "container" },
        h("div", { className: "f-grid-v2" },
          h("div", { className: "f-col" }, h("h3", { className: "f-logo" }, "ReferEarn"), h("p", null, "Making referrals easy and profitable for everyone.")),
          h("div", { className: "f-col" }, h("h5", null, "Links"), h("ul", null, h("li", null, "Dashboard"), h("li", null, "Earnings"))),
          h("div", { className: "f-col" }, h("h5", null, "Legal"), h("ul", null, h("li", null, "Privacy"), h("li", null, "Terms")))
        ),
        h("div", { className: "f-copyright" }, h("p", null, "© 2024 ReferEarn Pro. All rights reserved."))
      )
    )
  );
}