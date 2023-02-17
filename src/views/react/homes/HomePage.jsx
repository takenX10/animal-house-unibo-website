import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { SERVER_URL } from "@/context/utils";
import { Link } from "react-router-dom";

export default function HomePage() {
  const buttonStyle = {
    backgroundBlendMode: "multiply",
    backgroundSize: "cover",
    backgroundPosition: "50% 25%",
  };

  return (
    <Container>
      <Helmet>
        <title>Animal House</title>
      </Helmet>
      <h1 className="display-5 text-center my-3">
        Welcome! How may we help you?
      </h1>
      <Row className="">
        <Col md={6} lg={4} className="">
          <Link to="/comunita" tabIndex={-1}>
            <Button
              aria-labelledby="btn1-text"
              style={{
                ...buttonStyle,
                height: "350px",
                backgroundImage: `url(${SERVER_URL}/assets/homes/p-community.jpg),linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7) )`,
              }}
              className="w-100 my-1 bg-light cool-btn"
            >
              <span id="btn1-text" className="display-5 ">
                {" "}
                Community
              </span>
            </Button>
          </Link>
        </Col>
        <Col lg={8} md={6} className="">
          <Link to="/shop" tabIndex={-1}>
            <Button
              aria-labelledby="btn2-text"
              style={{
                ...buttonStyle,
                backgroundImage: `url(${SERVER_URL}/assets/homes/shop.jpg),linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6) )`,
                height: "350px",
              }}
              className="w-100 my-1 bg-light cool-btn"
            >
              <span id="btn2-text" className="display-5">
                {" "}
                Shop
              </span>
            </Button>
          </Link>
        </Col>
      </Row>
      <h2 className="display-6 fs-2 mt-4 text-center my-3">
        Discover our wide range of services
      </h2>
      <Row className="my-3 ">
        <Col md={4} className="">
          <a href="/games" tabIndex={-1}>
            <Button
              aria-labelledby="btn3-text"
              style={{
                ...buttonStyle,
                backgroundImage: `url(${SERVER_URL}/assets/homes/games.jpg),linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7) )`,
                height: "150px",
              }}
              className="w-100 my-1 bg-light cool-btn"
            >
              <span id="btn3-text" className="display-6 ">
                Games
              </span>
            </Button>
          </a>
        </Col>
        <Col md={4}>
          <Link to="/services/facetoface" tabIndex={-1}>
            <Button
              aria-labelledby="btn4-text"
              style={{
                ...buttonStyle,
                backgroundImage: `url(${SERVER_URL}/assets/homes/face.webp),linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7) )`,
                height: "150px",
              }}
              className="w-100 my-1 bg-light cool-btn"
            >
              <span id="btn4-text" className="display-6 ">
                Face To Face
              </span>
            </Button>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/services/online" tabIndex={-1}>
            <Button
              aria-labelledby="btn5-text"
              style={{
                ...buttonStyle,
                backgroundPosition: "25%",
                backgroundImage: `url(${SERVER_URL}/assets/homes/online.jpg),linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7) )`,
                height: "150px",
              }}
              className="w-100 my-1 bg-light cool-btn"
            >
              <span id="btn5-text" className="display-6 ">
                Online
              </span>
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
