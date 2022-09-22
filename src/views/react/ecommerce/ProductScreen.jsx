import { useContext, useEffect, useReducer } from 'react';
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '../../../components/ecommerce/Rating';
import LoadingBox from '../../../components/ecommerce/LoadingBox';
import MessageBox from '../../../components/ecommerce/MessageBox';
import { Store } from '../../../context/Store';
import { SERVER_URL } from "../../../context/utils";
import "../../../assets/css/ecommerce.css";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}


function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await fetch(`${SERVER_URL}/api/shop/products/slug/${slug}`);
        if (!result.ok) {
          throw new Error((await result.json()).message);
        }
        const item = await result.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: item });
        console.log('Success ma boy fr fr');
      } catch (err) {
        console.log('Yikes ma boy fr fr');
        dispatch({ type: 'FETCH_FAIL', payload: `${err.message} :( totally not my fault i think` });
      }

    };
    fetchData();
  }, [slug]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const res = await fetch(`${SERVER_URL}/api/products/${product._id}`);
    const data = await res.json();
    if (data.countInStock < quantity) {
      window.alert('Not enough product in stock :c');
      return;
    }
    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity }, });
    navigate('/cart');
  }

  return (
    loading ? (<LoadingBox />)
      : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Helmet>
            <title>{product.name}</title>
          </Helmet>
          <Row className=''>
            <h1 className='display-4 fw-bold mx-auto'>{product.name}</h1>
          </Row>
          <Row>
            <Col md={6} >
              <img className='img-fluid' src={product.image} alt={product.name}>
              </img>
            </Col>
            <Col md={6} >
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Rating rating={product.rating} numReviews={product.numReviews}>
                  </Rating>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <b>Price: </b>
                      ${product.price}
                    </Col>
                    <Col>
                      <b>Status: </b>
                      {product.countInStock > 0 ?
                        (<Badge bg="success">Available</Badge>)
                        :
                        (<Badge bg="danger">Unavailable</Badge>)
                      }
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Description:</b>
                  <p>{product.description}</p>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className='w-50 mx-auto d-grid'>
                      <Button onClick={addToCartHandler} className='border-0' variant='primary'>
                        Add 2 Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
          </Row>
        </div>
      )
  );
}

export default ProductScreen;
