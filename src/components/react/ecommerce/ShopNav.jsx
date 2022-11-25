import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ShopNav({ cart }) {
  return (
    <Link to="/shop/cart" className="nav-link me-auto">
      <FontAwesomeIcon className="align-middle" icon={faShoppingCart} />{" "}
      {cart.cartItems.length > 0 && (
        <Badge pill className="bg-primary">
          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
        </Badge>
      )}
    </Link>
  );
}
