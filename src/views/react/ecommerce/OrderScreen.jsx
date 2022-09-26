import React, { useContext, useEffect, useReducer } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoadingBox from '@/components/react/ecommerce/LoadingBox';
import MessageBox from '@/components/react/ecommerce/MessageBox';
import { Store } from '@/context/store';
import { SERVER_URL } from "@/context/utils";
import "@/assets/css/ecommerce.css";


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
export default function OrderScreen() {

  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  })
  const params = useParams();
  const { id: orderId } = params;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const response = await fetch(`${SERVER_URL}/api/shop/orders/${orderId}`, {
          method: 'GET',
          headers: new Headers({ authorization: `Bearer ${userInfo.token}` })
        });
        const data = await response.json();

        if (!response.ok)
          throw new Error(data.message);
        console.log('fetch success!');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    }
    if (!userInfo)
      return navigate('/signin');

    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);



  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant='danger'>{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 className="my-3">Order {orderId}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {order.shippingAddress.fullName}<br />
                <strong>Address:</strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant='success'>
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant='danger'>
                  Not delivered :(
                </MessageBox>
              )
              }
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant='success'>
                  Delivered at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant='danger'>
                  Not Paid :(
                </MessageBox>
              )
              }
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Ordered Items</Card.Title>
              <ListGroup variant='flush'>
                {
                  order.orderItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className='align-items-center'>
                        <Col md={8}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className='img-fluid rounded img-thumbnail' />
                          {' '}
                          <Link to={`/product/${item.slug}`} className='text-decoration-none link-secondary'>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={2}>
                          <span>{item.quantity} </span>
                        </Col>
                        <Col md={2}>${item.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))

                }
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row className="fw-bold">
                    <Col>Total</Col>
                    <Col >${order.totalPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </div>
  )

}

