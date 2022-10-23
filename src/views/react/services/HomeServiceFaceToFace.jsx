import { useEffect, useReducer } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import Service from '@/components/react/services/Service';
import MessageBox from '@/components/react/utils/MessageBox';
import LoadingBox from '@/components/react/utils/LoadingBox';
import "@/assets/css/ecommerce.css";
import { SERVER_URL } from "@/context/utils";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, servicesFaceToFace: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}


export default function HomeServiceFaceToFace() {
  const [{ loading, error, servicesFaceToFace }, dispatch] = useReducer(reducer, {
    servicesFaceToFace: [],
    loading: true,
    error: '',
  });
  //const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await fetch(`${SERVER_URL}/api/services/facetoface`);
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
    <>
      <div className='container-fluid text-center'>
        <Helmet>
          <title>Animal house</title>
        </Helmet>
        <h1>Services Face To Face</h1>
        <div className="services mx-auto">
          {
            loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant='danger'>{error}</MessageBox>
            ) : (
              <Row className='mx-auto'>
                {
                  servicesFaceToFace.map(service => (
                    <Col key={service.slug} sm={6} md={4} lg={3} className="mb-3">
                      <Service service={service}></Service>
                    </Col>
                  ))}
              </Row>
            )
          }
        </div>
      </div>
    </>
  )
}
