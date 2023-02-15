import { useContext } from "react";
import MessageBox from "@/components/react/utils/MessageBox";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "@/context/store";
import "@/assets/css/ecommerce.css";
import { SERVER_URL } from "@/context/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const data = await (
      await fetch(`${SERVER_URL}/api/shop/products/${item._id}`)
    ).json();
    if (data.countInStock < quantity) {
      window.alert("Not enough product in stock :c");
      return;
    }
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/backoffice/login?redirect=/shop/shipping");
  };
  return (
    <Container className="mt-3">
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1 className="text-dark my-3 display-5 fw-semibold">Shopping Cart</h1>
      <Row>
        <Col lg={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              {" "}
              Cart is empty.{" "}
              <Link className="link-primary text-decoration-none" to="/shop">
                Shop some more!
              </Link>
            </MessageBox>
          ) : (
            <ListGroup aria-live="polite">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center d-flex justify-content-center">
                    <Col
                      md={5}
                      xs={8}
                      className="md-d-inline d-flex md-justify-content-start xs-justify-content-center "
                    >
                      <img
                        src={`${SERVER_URL}/${item.poster}`}
                        alt={item.name}
                        className="img-fluid rounded item-thumbnail me-2"
                      ></img>
                      <Link
                        to={`/shop/product/${item.slug}`}
                        className="text-decoration-none fw-bold my-auto text-dark"
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col
                      className="lg-d-inline d-flex justify-content-center"
                      md={3}
                      xs={4}
                    >
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant="light"
                        aria-label="Remove one"
                        disabled={item.quantity === 1}
                      >
                        <FontAwesomeIcon icon={faMinusCircle} />
                      </Button>{" "}
                      <span className=" my-auto">{item.quantity}</span>{" "}
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        variant="light"
                        aria-label="Add one"
                        disabled={item.quantity === item.countInStock}
                      >
                        <FontAwesomeIcon icon={faPlusCircle} />
                      </Button>
                    </Col>
                    <Col
                      className="align-middle my-auto d-flex lg-d-inline justify-content-center"
                      md={2}
                      xs={8}
                    >
                      €{item.price}
                    </Col>
                    <Col
                      md={2}
                      xs={4}
                      className="d-flex justify-content-center"
                    >
                      <Button
                        aria-label="Remove item"
                        className="mx-auto"
                        variant="light"
                        onClick={() => removeItemHandler(item)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2 className="h3">
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items) : €
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      onClick={checkoutHandler}
                      type="button "
                      className="border-0 cool-orange-bg text-white fw-bold"
                      variant=""
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
