import React from "react";

export default function Footer() {
  const handlePreventDefault = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="footer-custom mt-auto">
      <div className="container">
        {/* Apple Legal Note */}
        <p className="footer-legal-text">
          1. Spotlight Pro features require a registered user account. Some media assets may require external storage limits.
          <br />
          2. Content sharing is governed by our Community Safety Guidelines. All rights reserved.
        </p>

        <div className="py-3 border-top border-bottom border-light-subtle my-3">
          <div className="row gy-3">
            <div className="col-md-3">
              <span className="fw-semibold text-dark d-block mb-2" style={{ fontSize: "0.85rem" }}>Explore</span>
              <ul className="list-unstyled mb-0" style={{ fontSize: "0.8rem", lineHeight: "1.8" }}>
                <li><a href="#" onClick={handlePreventDefault}>Trending Communities</a></li>
                <li><a href="#" onClick={handlePreventDefault}>Discover Posts</a></li>
                <li><a href="#" onClick={handlePreventDefault}>Featured Groups</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <span className="fw-semibold text-dark d-block mb-2" style={{ fontSize: "0.85rem" }}>Spotlight Account</span>
              <ul className="list-unstyled mb-0" style={{ fontSize: "0.8rem", lineHeight: "1.8" }}>
                <li><a href="#" onClick={handlePreventDefault}>Manage Your Account</a></li>
                <li><a href="#" onClick={handlePreventDefault}>Privacy & Security</a></li>
                <li><a href="#" onClick={handlePreventDefault}>Settings</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <span className="fw-semibold text-dark d-block mb-2" style={{ fontSize: "0.85rem" }}>Entertainment & Culture</span>
              <ul className="list-unstyled mb-0" style={{ fontSize: "0.8rem", lineHeight: "1.8" }}>
                <li><a href="#" onClick={handlePreventDefault}>Education Topics</a></li>
                <li><a href="#" onClick={handlePreventDefault}>Events & Meetups</a></li>
                <li><a href="#" onClick={handlePreventDefault}>Gaming & Tech</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <span className="fw-semibold text-dark d-block mb-2" style={{ fontSize: "0.85rem" }}>About</span>
              <ul className="list-unstyled mb-0" style={{ fontSize: "0.8rem", lineHeight: "1.8" }}>
                <li><a href="#" onClick={handlePreventDefault}>About Spotlight</a></li>
                <li><a href="#" onClick={handlePreventDefault}>Careers</a></li>
                <li><a href="#" onClick={handlePreventDefault}>Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="d-flex flex-wrap justify-content-between align-items-center py-2" style={{ fontSize: "0.78rem" }}>
          <div>
            Copyright &copy; {new Date().getFullYear()} Spotlight Inc. All rights reserved.
          </div>
          <div className="d-flex gap-3">
            <a href="#" onClick={handlePreventDefault}>Privacy Policy</a>
            <span>|</span>
            <a href="#" onClick={handlePreventDefault}>Terms of Use</a>
            <span>|</span>
            <a href="#" onClick={handlePreventDefault}>Sales Policy</a>
            <span>|</span>
            <a href="#" onClick={handlePreventDefault}>Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
