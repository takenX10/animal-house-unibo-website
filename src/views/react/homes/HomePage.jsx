import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Container>
      <Helmet>
        <title>Animal House</title>
      </Helmet>
      <h1 className="display-5 text-center my-3">
        Welcome! How may we help you?
      </h1>
      <Row className="">
        <Col md={4} className="">
          <Link to="/comunita">
            <Button
              aria-labelledby="btn1-text"
              style={{ height: "350px" }}
              className="w-100 my-1"
            >
              <span id="btn1-text" className="display-5 ">
                {" "}
                Community
              </span>
            </Button>
          </Link>
        </Col>
        <Col md={8} className="">
          <Link to="/shop">
            <Button
              aria-labelledby="btn2-text"
              style={{ height: "350px" }}
              className="w-100 my-1"
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
          <a href="/games">
            <Button
              aria-labelledby="btn3-text"
              style={{ height: "150px" }}
              className="w-100 my-1"
            >
              <span id="btn3-text" className="display-6 ">
                Games
              </span>
            </Button>
          </a>
        </Col>
        <Col md={4} className="">
          <Button
            aria-labelledby="btn4-text"
            style={{ height: "150px" }}
            className="w-100 my-1"
          >
            <span id="btn4-text" className="display-6 ">
              Face To Face
            </span>
          </Button>
        </Col>
        <Col md={4} className="">
          <Button
            aria-labelledby="btn5-text"
            style={{ height: "150px" }}
            className="w-100 my-1"
          >
            <span id="btn5-text" className="display-6 ">
              Online
            </span>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
