import { useEffect, useContext } from "react";
import { SERVER_URL } from "@/context/utils";
import "./Navbar.scss";
//import Dropdown from './Dropdown';
import { LinkContainer } from "react-router-bootstrap";
//import { FaBars } from 'react-icons/fa'
import { Container, Nav } from "react-bootstrap";
import { Store } from "@/context/store";
import { check_login, logout } from "@/context/utils";
import { Routes, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navbar as Bar } from "react-bootstrap";
import { Route } from "react-router-dom";
import ShopNav from "@/components/react/ecommerce/ShopNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

/*const NavbarServizi = () => {
  return (
    <>
      <Dropdown
        title={{
          href: "/comunita/home",
          id: "home-comunita",
          name: "Servizi della comunita",
        }}
        elements={[
          { title: "Leaderboard giochi", href: "/comunita/leaderboard-giochi", disabled: true },
          { title: "Bacheca eccolo qua", href: "/comunita/eccolo-qua" },
          { title: "Bacheca cerco partner", href: "/comunita/cerco-partner" },
          { title: "Bacheca aiutatemi", href: "/comunita/aiutatemi" },
        ]}
      />
      <Dropdown
        title={{
          href: "/presenza/home",
          id: "servizi-presenza-home",
          name: "Servizi in presenza",
        }}
        elements={[
          { title: "Veterinario", href: "/presenza/veterinario", disabled: true },
          { title: "Dogsitter", href: "/presenza/dogsitter", disabled: true },
          { title: "Toelettatura", href: "/presenza/toelettatura", disabled: true },
          { title: "Visite animali soli", href: "/presenza/visite-animali-soli", disabled: true },
        ]}
      />
      <Dropdown
        title={{
          href: "/online/home",
          id: "servizi-online-home",
          name: "Servizi online",
        }}
        elements={[
          { title: "Videoconferenza con l'esperto", href: "/online/esperto", disabled: true },
          { title: "Videoconferenza con il veterinario", href: "/online/veterinario", disabled: true },
          { title: "Videoconferenza con il tuo animale", href: "/online/tuo-animale", disabled: true },
        ]}
      />
    </>
  );
}

const NavbarGiochi = () => {
  return (
    <Dropdown
      title={{
        href: "/games/home",
        id: "home-giochi",
        name: "Giochi",
      }}
      elements={[
        {
          title: "Hangman",
          href: "/games/hangman"
        },
        {
          title: "Wordle",
          href: "/games/wordle"
        },
        {
          title: "Memory",
          href: "/games/memory"
        },
        {
          title: "Slider",
          href: "/games/slider"
        },
      ]}
    />
  );
}

const NavbarShop = () => {
  return (
    <Dropdown
      title={{
        href: "shop/home",
        id: "home-shop",
        name: "E-commerce",
      }}
      elements={[
        { title: "Cibo", href: "shop/cibo", disabled: true },
        { title: "Prodotti sanitari", href: "shop/sanitari", disabled: true },
        { title: "Accessoristica", href: "shop/accessori", disabled: true },
      ]}
    />
  );

}
*/

export default function Navbar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const navigate = useNavigate();
  async function verify_login() {
    if (!(await check_login())) {
      logout(ctxDispatch);
    }
  }

  useEffect(() => {
    verify_login();
  }, []);

  const signoutHandler = () => {
    logout(ctxDispatch);
    ctxDispatch({ type: "CART_CLEAR" });
    navigate("/backoffice/login");
  };

  return (
    <Bar className=" text-black our-nav px-3 py-3" expand="lg">
      <Container fluid className="px-5 flex justify-content-between">
        <Link to="/">
          <img
            src={`${SERVER_URL}/assets/logo.png`}
            className="logo-img me-2"
            alt="immagine logo"
            height={80}
          />
        </Link>
        <Routes>
          <Route
            path="/shop/*"
            element={<ShopNav aria-live="polite" cart={cart} />}
          />
        </Routes>
        <Bar.Toggle className="p-2 px-3" aria-controls="basic-navbar-nav">
          <FontAwesomeIcon icon={faBars} />
        </Bar.Toggle>
        <Bar.Collapse id="basic-navbar-nav" className="text-black">
          <Nav className="me-auto w-100 justify-content-end ">
            <Link to="/comunita" className="nav-link fw-semibold">
              Community
            </Link>
            <Link to="/services/facetoface" className="nav-link">
              FaceToFace
            </Link>
            <Link to="/services/online" className="nav-link">
              Online
            </Link>
            <Link to="/shop" className="nav-link">
              Shop
            </Link>
            <Nav.Link href="/games">Games</Nav.Link>
            {userInfo ? (
              <>
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
                <Link to="/shop/orderhistory" className="nav-link">
                  Order History
                </Link>
                <Link to="#" className="nav-link" onClick={signoutHandler}>
                  Logout
                </Link>
              </>
            ) : (
              <Link
                className="nav-link"
                to={`/backoffice/login?redirect=${window.location.pathname}`}
              >
                Login
              </Link>
            )}
          </Nav>
        </Bar.Collapse>
      </Container>
    </Bar>
  );
}
