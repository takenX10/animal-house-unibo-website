import React from 'react';
import { Col, Row } from "react-bootstrap";

export default function CheckoutSteps(props) {
  return <Row className="checkout-steps">
    <Col className={props.step1 ? 'active text-center' : 'text-center'}>Sign-In</Col>
    <Col className={props.step2 ? 'active text-center' : props.step2C ? 'current text-center' : 'text-center'}>Shipping</Col>
    <Col className={props.step3 ? 'active text-center' : props.step3C ? 'current text-center' : 'text-center'}>Payment</Col>
    <Col className={props.step4 ? 'active text-center' : props.step4C ? 'current text-center' : 'text-center'}>Place Order</Col>
  </Row>;
}
