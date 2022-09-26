import React, { useContext, useEffect, useReducer, useState } from 'react';
import LoadingBox from '@/components/react/utils/LoadingBox';
import { Button, Card, Col, ListGroup, Row, Toast } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '@/components/react/ecommerce/CheckoutSteps';
import { Store } from '@/context/store';
import { SERVER_URL } from "@/context/utils";
import "@/assets/css/ecommerce.css";


const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function PlaceOrderScreen() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  const round = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round(0) : round(10);
  cart.taxPrice = round(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;


  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const result = await fetch(`${SERVER_URL}/api/shop/orders`, {
        method: 'POST',
        headers: new Headers({
          'authorization': `Bearer ${userInfo.token}`,
          'content-type': 'application/json',
        }),
        body: JSON.stringify({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          taxPrice: cart.taxPrice,
          shippingPrice: cart.shippingPrice,
          totalPrice: cart.totalPrice,
        })
      });


      const data = await result.json();

      if (!result.ok)
        throw new Error(data.message);
      console.log(data);

      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' })
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      setMessage(err.message);
      setShow(true);
    }
  };

  useEffect(() => {

    if (!cart.paymentMethod)
      navigate('/payment');

  }, [navigate, cart]);

  return <div>
    <CheckoutSteps step1 step2 step3 step4C></CheckoutSteps>
    <Helmet>
      <title>Order Preview</title>
    </Helmet>
    <h1 className='my-3'>Order Preview</h1>
    <Row>
      <Col md={8}>
        <Card className='mb-3'>
          <Card.Body>
            <Card.Title>Shipping</Card.Title>
            <Card.Text>
              <strong>Name:</strong> {cart.shippingAddress.fullName}<br />
              <strong>Address:</strong>
              {cart.shippingAddress.address},{cart.shippingAddress.city},
              {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
            </Card.Text>
            <Link
              className='text-decoration-none link-primary'
              to='/shipping'>
              Edit
            </Link>
          </Card.Body>
        </Card>
        <Card className='mb-3'>
          <Card.Body>
            <Card.Title>Payment</Card.Title>
            <Card.Text>
              <strong>Method:</strong> {cart.paymentMethod}
            </Card.Text>
            <Link
              className='text-decoration-none link-primary'
              to='/payment'>
              Edit
            </Link>
          </Card.Body>
        </Card>
        <Card className='mb-3'>
          <Card.Body>
            <Card.Title>Cart</Card.Title>
            <ListGroup className='my-2' variant='flush'>
              {cart.cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col className=' justify-content-around' md={8}>
                      <img src={item.image} alt={item.name}
                        className='img-fluid rounded img-thumbnail'></img>
                      {' '}
                      <Link
                        className='ms-2 text-decoration-none link-secondary'
                        to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}><span>{item.quantity}</span></Col>
                    <Col md={2}>${item.price}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Link
              className='text-decoration-none link-primary'
              to='/cart'>
              Edit
            </Link>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Order Summary</Card.Title>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className='fw-bold'>
                <Row>
                  <Col>Order total</Col>
                  <Col>${cart.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='d-grid mt-2'>
                  <Button
                    type='button'
                    onClick={placeOrderHandler}
                    disabled={cart.cartItems.length === 0}
                  >
                    Place Order
                  </Button>

                </div>
                {loading && <LoadingBox></LoadingBox>}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
      <Toast.Header>
        <strong className='me-auto text-dark'>Alert!</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>

    </Toast>
  </div>
}
