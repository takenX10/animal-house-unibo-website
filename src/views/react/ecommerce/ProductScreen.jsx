import { useContext, useEffect, useReducer, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "@/components/react/utils/Rating";
import LoadingBox from "@/components/react/utils/LoadingBox";
import MessageBox from "@/components/react/utils/MessageBox";
import { Store } from "@/context/store";
import { SERVER_URL, check_login } from "@/context/utils";
import "@/assets/css/ecommerce.css";
import ImgCarousel from "@/components/react/utils/ImgCarousel";
import { toast, ToastContainer } from "react-toastify";
import { Rating as StarInput } from "react-simple-star-rating";
import { useForm } from "react-hook-form";

const reducer = (state, action) => {
  switch (action.type) {
    case "PRODUCT_REQUEST":
      return { ...state, loadingProd: true };
    case "REVIEW_REQUEST":
      return { ...state, loadingRevs: true };
    case "PRODUCT_SUCCESS":
      return { ...state, product: action.payload, loadingProd: false };
    case "REVIEW_SUCCESS":
      return { ...state, reviews: action.payload, loadingRevs: false };
    case "REVIEW_FAIL":
      return { ...state, loadingRevs: false, revError: action.payload };
    case "PRODUCT_FAIL":
      return { ...state, loadingProd: false, prodError: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [rating, setRating] = useState(5);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const [
    { loadingRevs, loadingProd, prodError, revError, product, reviews },
    dispatch,
  ] = useReducer(reducer, {
    reviews: [],
    product: [],
    loadingProd: true,
    loadingRevs: true,
    prodError: "",
    revError: "",
  });

  const verifyLogin = async () => {
    setLoggedIn(await check_login());
  };
  const fetchData = async () => {
    dispatch({ type: "REVIEW_REQUEST" });
    try {
      const result = await fetch(
        `${SERVER_URL}/api/shop/products/slug/${slug}`
      );
      if (!result.ok) {
        throw new Error((await result.json()).message);
      }
      const item = await result.json();
      dispatch({ type: "PRODUCT_SUCCESS", payload: item });
    } catch (err) {
      dispatch({
        type: "PRODUCT_FAIL",
        payload: `${err.message} :( totally not my fault i think`,
      });
    }
  };

  const fetchReviews = async () => {
    dispatch({ type: "REVIEW_REQUEST" });
    try {
      const result = await fetch(
        `${SERVER_URL}/api/shop/products/reviews/${slug}`
      );

      const item = await result.json();
      if (!result.ok) {
        throw new Error(item.message);
      }
      dispatch({ type: "REVIEW_SUCCESS", payload: item });
    } catch (err) {
      dispatch({
        type: "REVIEW_FAIL",
        payload: `${err.message} :( totally not my fault i think`,
      });
    }
  };
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  useEffect(() => {
    verifyLogin();
  }, [userInfo]);

  useEffect(() => {
    fetchData();
    fetchReviews();
  }, [slug]);

  const submitHandler = async (input) => {
    try {
      let res = await fetch(`${SERVER_URL}/api/shop/products/reviews`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input.text,
          rating,
          product: product._id,
        }),
      });

      if (!res.ok) throw new Error((await res.json()).message);

      toast("Review Posted!");
      reset();
      fetchData();
      fetchReviews();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const res = await fetch(`${SERVER_URL}/api/shop/products/${product._id}`);
    const data = await res.json();
    if (data.countInStock < quantity) {
      toast.warning("Not enough product in stock :c");
      return;
    }
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    navigate("/shop/cart");
  };

  return loadingProd ? (
    <LoadingBox />
  ) : prodError ? (
    <MessageBox variant="danger">{prodError}</MessageBox>
  ) : (
    <Container>
      <ToastContainer />
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <Row className="">
        <h1 className="display-4 fw-bold mx-auto">{product.name}</h1>
      </Row>
      <Row>
        <Col md={6}>
          <ImgCarousel
            images={[product.poster, ...product.images]}
          ></ImgCarousel>
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <b>Price: </b>${product.price}
                </Col>
                <Col>
                  <b>Status: </b>
                  {product.countInStock > 0 ? (
                    <Badge bg="success">Available</Badge>
                  ) : (
                    <Badge bg="danger">Unavailable</Badge>
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Category:</b>
              <p>{product.categories.join(",")}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Description:</b>
              <p>{product.description}</p>
            </ListGroup.Item>
            {product.countInStock > 0 && (
              <ListGroup.Item>
                <div className="w-50 mx-auto d-grid">
                  <Button
                    onClick={addToCartHandler}
                    className="border-0"
                    variant="primary"
                  >
                    Add 2 Cart
                  </Button>
                </div>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
      <Row className=" my-2">
        <h1>Reviews</h1>
        {loadingRevs ? (
          <LoadingBox />
        ) : revError ? (
          <MessageBox variant="danger">{revError}</MessageBox>
        ) : reviews.length == 0 ? (
          <MessageBox>No reviews yet, wanna be first?</MessageBox>
        ) : (
          reviews.map((review) => (
            <Card className="my-1" key={review._id}>
              <Card.Body>
                <Card.Title>{review.reviewer}</Card.Title>
                <Card.Subtitle>
                  {review.createdAt.substring(0, 10)}
                </Card.Subtitle>
                <Rating rating={review.rating}></Rating>
                <Card.Text>{review.text}</Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </Row>
      {loggedIn && (
        <Row>
          <Col md={6}>
            <h1>Share your review!</h1>
            <Form id="review-form" onSubmit={handleSubmit(submitHandler)}>
              <Form.Group className="mb-3" controlId="text">
                <Form.Label>What did you think?</Form.Label>
                <StarInput
                  className="mb-2 ms-2 "
                  initialValue={rating}
                  onClick={handleRating}
                  allowFraction={true}
                  fillColor={"#00afb9"}
                />
                <Form.Control as="textarea" rows={3} {...register("text")} />
              </Form.Group>
              <div className="mb-3 d-grid ">
                <Button type="submit">Send</Button>
              </div>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ProductScreen;
