import { useContext, useEffect, useReducer } from 'react';
import { Badge, Button, Card, Col, ListGroup, Row, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '@/components/react/utils/Rating';
import LoadingBox from '@/components/react/utils/LoadingBox';
import MessageBox from '@/components/react/utils/MessageBox';
import { Store } from '@/context/store';
import { SERVER_URL } from "@/context/utils";
import "@/assets/css/ecommerce.css";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, service: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
function renderOpts(opt) {
  let render = <></>
  let props = {}
  switch (opt.type) {
    case 'checkbox':
      if (opt.required)
        props = { required: true }
      render = <div><p><b>{opt.name}</b></p>
        {
          opt.labels.map((l, index) => {
            return <Form.Check
              name={opt.name}
              {...props}
              type={opt.type}
              key={`${opt.name}-${opt.type}-${index}`}
              label={l}>
            </Form.Check>
          })
        }</div>
      break
    case 'radio':
      if (opt.required)
        props = { required: true }
      render = <div ><p><b>{opt.name}</b></p>
        {
          opt.labels.map((l, index) => {
            return <Form.Check
              inline
              label={l}
              {...props}
              name={opt.name}
              type={opt.type}
              key={`${opt.name}-${opt.type}-${index}`}
            />
          })
        }</div>
      break
    case 'select':
      if (opt.required)
        props = { required: true }
      render = <div><p><b>{opt.label}</b></p>
        <Form.Select {...props} name={opt.name} aria-label={opt.label}>
          {
            opt.fields.map((f, index) => {
              return <option key={`${opt.label}-${opt.type}-${index}`} value={f}>{f}</option>
            })
          }
        </Form.Select></div>
      break
    case 'text':
      let id = `${opt.name}-${opt.type}-control`
      let idDesc = `${opt.name}-${opt.type}-control-desc`
      if (opt.required)
        props = { required: true }
      render =
        <>
          <Form.Label htmlFor={id}>{opt.name}</Form.Label>
          <Form.Control
            type={opt.type}
            id={id}
            aria-describedby={idDesc}
            {...props}
          />
          <Form.Text id={idDesc} name={opt.name}>
            {opt.description}
          </Form.Text>
        </>
  }
  return (
    <Col key={`${opt.name}-${opt.type}`} md={3} className="text-center mx-auto py-3 " >
      {render}
      <hr />
    </Col>
  )
}


function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, service }, dispatch] = useReducer(reducer, {
    service: [],
    loading: true,
    error: '',
  });
  async function fetchData() {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const result = await fetch(`${SERVER_URL}/api/services/facetoface/slug/${slug}`);
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

  useEffect(() => {
    fetchData();
  }, [slug]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  return (
    loading ? (<LoadingBox />)
      : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className='container'>
          <Helmet>
            <title>{service.title}</title>
          </Helmet>
          <Row className='text-center'>
            <h1 className='display-4 fw-bold mx-auto'>{service.title}</h1>
          </Row>
          <Row>
            <Col md={6} >
              <img className='img-fluid' src={service.poster} alt={service.title}>
              </img>
            </Col>
            <Col md={6} >
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <b>Category:</b>
                  <p>{service.category}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating rating={service.rating} numReviews={service.numReviews}>
                  </Rating>
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Price: </b>
                  {service.hourlyRate} $/h
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Description:</b>
                  <p>{service.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className='mx-auto text-center'>
            <h3 className='fw-bold mx-auto'>Booking</h3>
          </Row>
          <Form>
            <Row className='mx-3'>
              {
                service.opts.map((opt, index) => {
                  return renderOpts(opt, index);
                })
              }
            </Row>
            <Row className='mx-auto text-center'>
              <Col md={3} sm={10} xs={10} className="mx-auto">
                <Button variant="primary" className='w-100' type="submit">
                  Book
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      )
  );
}

export default ProductScreen;
