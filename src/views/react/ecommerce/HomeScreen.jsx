import { useEffect, useReducer, useState } from "react";
import { Row, Col, Container, Button, ListGroup } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Product from "@/components/react/ecommerce/Product";
import MessageBox from "@/components/react/utils/MessageBox";
import LoadingBox from "@/components/react/utils/LoadingBox";
import "@/assets/css/ecommerce.css";
import { SERVER_URL } from "@/context/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlFood,
  faGlasses,
  faHandHoldingHeart,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const reducer = (state, action) => {
  switch (action.type) {
    case "PRODUCT_REQUEST":
      return { ...state, loadingProds: true };
    case "CATEGORY_REQUEST":
      return { ...state, loadingCats: true };
    case "PRODUCT_SUCCESS":
      return { ...state, products: action.payload, loadingProds: false };
    case "CATEGORY_SUCCESS":
      return { ...state, categories: action.payload, loadingCats: false };
    case "PRODUCT_FAIL":
      return { ...state, loadingProds: false, prodError: action.payload };
    case "CATEGORY_FAIL":
      return { ...state, loadingCats: false, catError: action.payload };
    default:
      return state;
  }
};

export default function HomeScreen() {
  const [
    { loadingProds, loadingCats, categories, prodError, catError, products },
    dispatch,
  ] = useReducer(reducer, {
    products: [],
    categories: [],
    loadingProds: true,
    loadingCats: true,
    prodError: "",
    catError: "",
  });
  const [title, setTitle] = useState("Featured Products");

  const fetchCategories = async () => {
    dispatch({ type: "CATEGORY_REQUEST" });
    try {
      const result = await fetch(`${SERVER_URL}/api/shop/categories`);
      const data = await result.json();

      if (!result.ok) throw new Error(data.message);

      dispatch({ type: "CATEGORY_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "CATEGORY_FAIL", payload: err });
    }
  };

  const fetchData = async (category, name) => {
    dispatch({ type: "PRODUCT_REQUEST" });
    try {
      let result;
      if (category) {
        setTitle(name);
        result = await fetch(
          `${SERVER_URL}/api/shop/products/category/${encodeURIComponent(
            category
          )}`
        );
      } else {
        setTitle("Featured Products");
        result = await fetch(`${SERVER_URL}/api/shop/products`);
      }
      const data = await result.json();
      if (!result.ok) throw new Error(data.message);
      dispatch({ type: "PRODUCT_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "PRODUCT_FAIL", payload: err });
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const catButtonStyle = {
    backgroundBlendMode: "multiply",
    backgroundSize: "cover",
    backgroundPosition: "50% 25%",
  };

  const MapCategories = (props) => {
    return (
      <>
        {categories
          .filter((cat) => cat.parent == props.parent)
          .map((cat) => (
            <span key={cat.category}>
              <ListGroup.Item>
                <a href="#" onClick={() => fetchData(cat.category, cat.name)}>
                  {">".repeat(cat.category.split("/").length - 1) + cat.name}
                </a>
              </ListGroup.Item>
              <MapCategories parent={cat.category} />
            </span>
          ))}
      </>
    );
  };

  return (
    <Container fluid>
      <Helmet>
        <title>Shop</title>
      </Helmet>
      <Row className="butstrap bg-light py-2 mx-1">
        <Col className="ps-1 pe-1 mb-2" sm={6} md={4} lg={3}>
          <Button
            className="bg-light fw-bold text-white justify-content-center text-center w-100"
            onClick={() => fetchData("/accessories", "accessories")}
            style={{
              backgroundImage: `url(${SERVER_URL}/assets/ecommerce/accessories2.jpg),linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4) )`,
              ...catButtonStyle,
            }}
          >
            <FontAwesomeIcon
              icon={faGlasses}
              className="mx-auto"
              style={{ filter: "none" }}
              size="2xl"
            />
            <p className="lead mx-auto">Accessories</p>
          </Button>
        </Col>
        <Col className="mb-2 px-1" sm={6} md={4} lg={3}>
          <Button
            className="bg-white fw-bold text-white justify-content-center text-center w-100"
            onClick={() => fetchData("/sanitary", "sanitary")}
            style={{
              backgroundImage: `url(${SERVER_URL}/assets/ecommerce/sanitary.jpeg),linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4) )`,
              ...catButtonStyle,
            }}
          >
            <FontAwesomeIcon
              icon={faHandHoldingHeart}
              className="mx-auto"
              size="2xl"
            />
            <p className="lead mx-auto">Sanitary</p>
          </Button>
        </Col>
        <Col className="px-1 mb-2" sm={6} md={4} lg={3}>
          <Button
            className="bg-light fw-bold text-white justify-content-center text-center w-100"
            onClick={() => fetchData("/food", "food")}
            style={{
              backgroundImage: `url(${SERVER_URL}/assets/ecommerce/petfood.jpg),linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4) )`,
              ...catButtonStyle,
            }}
          >
            <FontAwesomeIcon icon={faBowlFood} className="mx-auto" size="2xl" />
            <p className="lead mx-auto">Pet Food</p>
          </Button>
        </Col>
        <Col className="mb-2 ps-1 pe-1" sm={6} md={4} lg={3}>
          <Button
            className="bg-light fw-bold text-white justify-content-center text-center w-100"
            onClick={() => fetchData()}
            style={{
              backgroundImage: `url(${SERVER_URL}/assets/ecommerce/more.jpg),linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4) )`,
              ...catButtonStyle,
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="mx-auto" size="2xl" />
            <p className="lead mx-auto">More</p>
          </Button>
        </Col>
      </Row>
      <Row className="butstrap bg-light py-2 mx-1">
        <Col className="" lg={9}>
          <h1 className="text-capitalize"> {title} </h1>
          <div className="products">
            {loadingProds ? (
              <LoadingBox />
            ) : prodError ? (
              <MessageBox variant="danger">{prodError}</MessageBox>
            ) : (
              <Row>
                {products.map((product) => (
                  <Col key={product.slug} sm={6} md={6} lg={4} className="mb-3">
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </Col>
        <Col lg={3}>
          <h1>Categories</h1>
          {loadingCats ? (
            <LoadingBox />
          ) : catError ? (
            <MessageBox variant="danger">{catError}</MessageBox>
          ) : (
            <ListGroup className="text-capitalize">
              <MapCategories parent="/"></MapCategories>
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
}
