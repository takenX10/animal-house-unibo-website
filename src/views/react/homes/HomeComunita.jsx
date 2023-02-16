import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { SERVER_URL } from "@/context/utils";

export default function HomeComunita() {
  const stylecol = {
    height: "100%",
    width: "100%",
  };
  const buttonStyle = {
    backgroundBlendMode: "multiply",
    backgroundSize: "cover",
    backgroundPosition: "50% 25%",
  };
  return (
    <Container>
      <Helmet>
        <title>Community Services</title>
      </Helmet>
      <h1 className="display-5 text-center my-3">Check out our boards!</h1>
      <Row className="">
        <Col md={6} className="mb-4 m-md-0">
          <Link to="/comunita/leaderboard" tabIndex={-1}>
            <Button
              aria-labelledby="btn1-text"
              style={{
                ...buttonStyle,
                backgroundImage: `url(${SERVER_URL}/assets/homes/leaderboard.webp),linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8) )`,
                height: "250px",
              }}
              className="w-100 bg-light cool-btn"
            >
              <span id="btn1-text" className="display-5 ">
                {" "}
                Game Leaderboards
              </span>
            </Button>
          </Link>
        </Col>
        <Col md={6} className="">
          <Link to="/comunita/eccolo-qua" tabIndex={-1}>
            <Button
              aria-labelledby="btn2-text"
              style={{
                ...buttonStyle,
                backgroundImage: `url(${SERVER_URL}/assets/homes/eccolo.webp),linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8) )`,
                height: "250px",
              }}
              className="w-100 bg-light cool-btn"
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
          <Link to="/comunita/cerco-partner" tabIndex={-1}>
            <Button
              aria-labelledby="btn3-text"
              style={{
                ...buttonStyle,
                backgroundImage: `url(${SERVER_URL}/assets/homes/partner.jpg),linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8) )`,
                height: "250px",
              }}
              className="w-100 bg-light cool-btn"
            >
              <span id="btn3-text" className="display-5 ">
                {" "}
                Partner Finder
              </span>
            </Button>
          </Link>
        </Col>
        <Col md={6} className="">
          <Link to="/comunita/aiutatemi" tabIndex={-1}>
            <Button
              aria-labelledby="btn2-text"
              style={{
                ...buttonStyle,
                backgroundPosition: "top",
                backgroundImage: `url(${SERVER_URL}/assets/homes/help.jpg),linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8) )`,
                height: "250px",
              }}
              className="w-100 bg-light cool-btn"
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
