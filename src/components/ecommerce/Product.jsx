import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from './Rating';
import { Store } from '../../context/Store';
import { useContext } from "react";

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const data = await (await fetch(`/api/products/${item._id}`)).json();
    if (data.countInStock < quantity) {
      window.alert('Not enough product in stock :c');
      return;
    }
    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity }, });
  }
  return (
    <Card className="h-100" key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="prod-img card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link className="text-decoration-none text-dark " to={`/product/${product.slug}`}>
          <Card.Title className="fw-bold">{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0
          ? (<Button variant='light' disabled>Out of stock</Button>)
          : (
            <Button
              onClick={() => addToCartHandler(product)}
              className="align-bottom border-0">Add to cart</Button>
          )
        }
      </Card.Body>
    </Card>
  );
}
export default Product;
