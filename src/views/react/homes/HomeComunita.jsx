import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function HomeComunita() {
  const stylecol = {
    height: "100%",
    width: "100%",
  };
  return (
    <Container>
      <Helmet>
        <title>Community Services</title>
      </Helmet>
      <h1 className="display-5 text-center my-3">Check out our boards!</h1>
      <Row className="">
        <Col md={6} className="mb-4 m-md-0">
          <Link to="/comunita/leaderboard">
            <Button
              aria-labelledby="btn1-text"
              style={{ height: "250px" }}
              className="w-100"
            >
              <span id="btn1-text" className="display-5 ">
                {" "}
                Game Leaderboards
              </span>
            </Button>
          </Link>
        </Col>
        <Col md={6} className="">
          <Link to="/comunita/eccolo-qua">
            <Button
              aria-labelledby="btn2-text"
              style={{ height: "250px" }}
              className="w-100 "
            >
              <span id="btn2-text" className="display-5">
                {" "}
                Eccolo qua Board
              </span>
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="my-4">
        <Col md={6} className="mb-4 m-md-0">
          <Link to="/comunita/cerco-partner">
            <Button
              aria-labelledby="btn3-text"
              style={{ height: "250px" }}
              className="w-100"
            >
              <span id="btn3-text" className="display-5 ">
                {" "}
                Partner Finder
              </span>
            </Button>
          </Link>
        </Col>
        <Col md={6} className="">
          <Link to="/comunita/aiutatemi">
            <Button
              aria-labelledby="btn2-text"
              style={{ height: "250px" }}
              className="w-100 "
            >
              <span id="btn2-text" className="display-5">
                {" "}
                Help Board
              </span>
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
