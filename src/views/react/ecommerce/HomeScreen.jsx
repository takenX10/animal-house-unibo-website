import { useEffect, useReducer } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import Product from '../../../components/ecommerce/Product';
import MessageBox from '../../../components/ecommerce/MessageBox';
import LoadingBox from '../../../components/ecommerce/LoadingBox';
import "../../../assets/css/ecommerce.css";

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
        const result = await fetch('/api/shop/products');
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
    <div>
      <Helmet>
        <title>DaTrue St.Wear</title>
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
    </div>
  )
}
