import { faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="page-footer font-small bg-dark  pt-4">
    <div className="container-fluid text-center text-white text-md-left">
      <div className="row">
        <div className="col-md-6 my-2">
          <h5 className="text-uppercase">Animal House</h5>
          <p>Your pet's best friends!</p>
        </div>

        <hr className="clearfix w-100 d-md-none pb-0" />

        <div className="col-md-3 mb-md-0 my-2">
          <h5 className="text-uppercase">Links</h5>
          <ul className="list-unstyled text-white">
            <li>
              <Link to="/comunita" className="text-white fw-semibold">
                Community
              </Link>
            </li>
            <li>
              <Link to="/services/facetoface" className="text-white">
                Face To Face
              </Link>
            </li>
            <li>
              <Link to="/services/online" className="text-white">
                Online Services
              </Link>
            </li>
            <li>
              <a href="/games" className="text-white">
                Games
              </a>
            </li>
          </ul>
        </div>

        <hr className="clearfix w-100 d-md-none pb-0" />
        <div className="col-md-3 mb-md-0  my-2">
          <h5 className="text-uppercase">Social Media</h5>
          <ul className="list-unstyled">
            <li>
              <a href="#" className="text-white">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
