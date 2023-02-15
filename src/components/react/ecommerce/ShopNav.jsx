import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import "@/assets/scss/App.scss";

export default function ShopNav({ cart }) {
  return (
    <Link
      to="/shop/cart"
      aria-live="polite"
      aria-label="Icona Carrello"
      className="nav-link me-auto"
    >
      <FontAwesomeIcon className="align-middle" icon={faShoppingCart} />{" "}
      {cart.cartItems.length > 0 && (
        <Badge bg="null" text="white" pill className="cool-orange-bg -orange">
          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
        </Badge>
      )}
    </Link>
  );
}
