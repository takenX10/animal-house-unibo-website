import { useEffect, useReducer } from 'react';
import { Row, Col,Container, Button, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import Product from '@/components/react/ecommerce/Product';
import MessageBox from '@/components/react/utils/MessageBox';
import LoadingBox from '@/components/react/utils/LoadingBox';
import "@/assets/css/ecommerce.css";
import { SERVER_URL } from "@/context/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlFood, faCross, faGlasses } from '@fortawesome/free-solid-svg-icons';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}


export default function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  //const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await fetch(`${SERVER_URL}/api/shop/products`);
        const data = await result.json();
        if (!result.ok)
          throw new Error(data.message);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

    };
    fetchData();
  }, []);

  return (
    <Container>
      <Row>
        <Col className='' sm={6} md={4} lg={3} >
          <Button className='bg-light fw-bold text-white justify-content-center text-center w-100'
            style={{backgroundImage:`url(${SERVER_URL}/assets/ecommerce/accessories2.jpg)`,
            backgroundSize:'cover',
            backgroundPosition:'left'}
          }>
          <FontAwesomeIcon icon={faGlasses} className="mx-auto" size="2xl"/>
          <p className='lead mx-auto'>Accessories</p>
          </Button>
        </Col> 
        <Col  sm={6} md={4} lg={3} >
          <Button className='bg-light fw-bold text-white justify-content-center text-center w-100'
            style={{backgroundImage:`url(${SERVER_URL}/assets/ecommerce/accessories2.jpg)`,
            backgroundSize:'cover',
            backgroundPosition:'left'}
          }>
          <FontAwesomeIcon icon={faCross} className="mx-auto" size="2xl"/>
          <p className='lead mx-auto'>Sanitary</p>
          </Button>
        </Col> 
        <Col  sm={6} md={4} lg={3} >
          <Button className='bg-light fw-bold text-white justify-content-center text-center w-100'
            style={{backgroundImage:`url(${SERVER_URL}/assets/ecommerce/accessories2.jpg)`,
            backgroundSize:'cover',
            backgroundPosition:'left'}
          }>
          <FontAwesomeIcon icon={faBowlFood} className="mx-auto" size="2xl"/>
          <p className='lead mx-auto'>Pet Food</p>
          </Button>
        </Col> 
      </Row>
      <Helmet>
        <title>Shop</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {
          loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant='danger'>{error}</MessageBox>
          ) : (
            <Row>
              {
                products.map(product => (
                  <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                    <Product product={product}></Product>
                  </Col>
                ))}
            </Row>
          )
        }
      </div>
    </Container>
  )
}
