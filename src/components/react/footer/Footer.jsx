import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "@/context/store";
import { SERVER_URL } from "@/context/utils";

const Footer = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return (
    <footer className="page-footer font-small bg-dark mt-5  pt-4">
      <div className="container-fluid text-center text-white text-md-left">
        <div className="row">
          <div className="col-md-6 my-2">
            {userInfo?.isAdmin ? (
              <div>
                <h1 className="h5 text-uppercase">Hey Admin!</h1>
                <a
                  href={`${SERVER_URL}/backoffice/home`}
                  className="fw-bolder text-white text-decoration-underline"
                >
                  Go to Backoffice
                </a>
              </div>
            ) : (
              <div>
                <h1 className="h5 text-uppercase">Animal House</h1>
                <p>Your pet's best friends!</p>
              </div>
            )}
          </div>

          <hr className="clearfix w-100 d-md-none pb-0" />

          <div className="col-md-3 mb-md-0 my-2">
            <h1 className="text-uppercase h5">Links</h1>
            <ul className="list-unstyled text-white text-decoration-underline">
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
            <h1 className="h5 text-uppercase">Social Media</h1>
            <ul className="list-unstyled text-decoration-underline">
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
                  MySpace
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  Tsu
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
