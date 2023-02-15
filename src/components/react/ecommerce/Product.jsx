import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "@/components/react/utils/Rating";
import { Store } from "@/context/store";
import { SERVER_URL } from "@/context/utils";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const data = await (
      await fetch(`${SERVER_URL}/api/shop/products/${item._id}`)
    ).json();
    if (data.countInStock < quantity) {
      toast.warn("Not enough product in stock :(");
      return;
    }
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    toast.success("Added to cart!");
  };
  return (
    <Card className="" key={product.slug}>
      <ToastContainer />
      <Link to={`/shop/product/${product.slug}`}>
        <img
          src={
            product.poster.startsWith("http")
              ? product.poster
              : `${SERVER_URL}/${product.poster}`
          }
          className="prod-img card-img-top"
          alt={product.name}
        />
      </Link>
      <Card.Body>
        <Link
          className="text-decoration-none text-dark "
          to={`/shop/product/${product.slug}`}
        >
          <Card.Title className="fw-bold">{product.name}</Card.Title>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <Card.Text className="d-flex justify-content-between pt-2 align-items-center">
          ${product.price}
          {product.countInStock === 0 ? (
            <Button
              className="rounded-pill text-black fw-bold"
              variant="light"
              disabled
            >
              Out of stock
            </Button>
          ) : (
            <Button
              onClick={() => addToCartHandler(product)}
              className="align-bottom border-0 rounded-pill cool-orange-bg fw-bold"
            >
              Add to cart
            </Button>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
export default Product;
