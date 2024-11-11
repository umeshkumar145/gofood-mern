import React from 'react';
//import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import social media icons

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <div>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
              <span className="fw-bold">GoFood</span>
            </a>
            <span className="text-muted">© {currentYear} <i>GoFood</i>, Inc</span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a className="text-muted" href="https://facebook.com" aria-label="Facebook">
                Facebook
              </a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="https://twitter.com" aria-label="Twitter">
                Twitter
              </a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="https://instagram.com" aria-label="Instagram">
                Instagram
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
