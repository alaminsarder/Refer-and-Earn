import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="lp">
      <header className="lp__header">
        <div className="lp__brand">
          {/* চাইলে এখানে logo বসান */}
          <span className="lp__brandText">Refer & Earn</span>
        </div>

        <nav className="lp__nav">
          <Link className="lp__navLink" to="/login">Login</Link>
          <Link className="lp__navBtn" to="/register">REGISTER</Link>
        </nav>
      </header>

      <section className="lp__hero">
        <div className="lp__overlay" />

        <div className="lp__content">
          <h1 className="lp__title">
            Work with an amazing <br /> iDea!
          </h1>

          <p className="lp__subtitle">
            Refer friends and your family to earn sweet money easily.. No.1
            Platform providing you a <br />
            easiet way of earning.
          </p>

          <Link className="lp__cta" to="/register">
            CREATE ACCOUNT
          </Link>
        </div>

        {/* wave */}
        <div className="lp__wave" />
      </section>
    </div>
  );
}