import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

function FeatureItem(props) {
  return React.createElement(
    "div",
    { className: "fItem" },
    React.createElement("div", { className: "fItem__icon", "aria-hidden": "true" }, props.icon),
    React.createElement("div", { className: "fItem__body" },
      React.createElement("h3", { className: "fItem__h" }, props.title),
      React.createElement("p", { className: "fItem__p" }, props.text)
    )
  );
}

export default function Landing() {
  return React.createElement(
    React.Fragment,
    null,

    // ================= HERO (same style) =================
    React.createElement(
      "section",
      { className: "hero" },

      React.createElement(
        "header",
        { className: "hero__top" },
        React.createElement("div", { className: "hero__brand" }, "Refer & Earn"),
        React.createElement(
          "div",
          { className: "hero__actions" },
          React.createElement(Link, { className: "hero__login", to: "/login" }, "Login"),
          React.createElement(Link, { className: "hero__register", to: "/register" }, "REGISTER")
        )
      ),

      React.createElement("div", { className: "hero__overlay" }),

      React.createElement(
        "div",
        { className: "hero__content" },
        React.createElement(
          "h1",
          { className: "hero__title" },
          "Work with an amazing",
          React.createElement("br", null),
          "iDea!"
        ),
        React.createElement(
          "p",
          { className: "hero__desc" },
          "Refer friends and your family to earn rewards easily. Track referrals, earn on first subscription purchase, and withdraw fast."
        ),
        React.createElement(
          "div",
          { className: "hero__ctaRow" },
          React.createElement(Link, { className: "hero__btn", to: "/register" }, "CREATE ACCOUNT"),
          React.createElement("span", { className: "hero__mini" }, "No hidden rules • Real-time tracking")
        )
      ),

      React.createElement("div", { className: "hero__wave" })
    ),

    // ================= BELOW HERO (same layout, nicer) =================
    React.createElement(
      "section",
      { className: "features" },
      React.createElement(
        "div",
        { className: "features__wrap" },

        // left grid (4 items)
        React.createElement(
          "div",
          { className: "features__grid" },
          React.createElement(FeatureItem, {
            icon: "🚀",
            title: "Ready to go",
            text: "Create an account in seconds and get your unique referral link."
          }),
          React.createElement(FeatureItem, {
            icon: "💳",
            title: "Payments functionality",
            text: "Wallet, earnings history, and withdrawals—simple and transparent."
          }),
          React.createElement(FeatureItem, {
            icon: "🎯",
            title: "Referrals",
            text: "Invite friends. When they complete their first subscription purchase, you earn."
          }),
          React.createElement(FeatureItem, {
            icon: "🧑‍💻",
            title: "Need help?",
            text: "Have a query? Contact support anytime—we’ll help you ASAP."
          })
        ),

        // right card
        React.createElement(
          "aside",
          { className: "insightCard" },
          React.createElement("div", { className: "insightCard__img" }),
          React.createElement("h3", { className: "insightCard__h" }, "Get insights"),
          React.createElement(
            "p",
            { className: "insightCard__p" },
            "Check your referral history, conversion status, and wallet balance in the referral portal."
          ),
          React.createElement(
            "div",
            { className: "insightCard__row" },
            React.createElement("div", { className: "chip" }, "Live status"),
            React.createElement("div", { className: "chip" }, "Secure"),
            React.createElement("div", { className: "chip" }, "Fast payout")
          )
        )
      )
    )
  );
}