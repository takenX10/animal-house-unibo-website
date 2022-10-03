import { useContext, useEffect, useState, useReducer } from 'react';
import { useForm } from "react-hook-form";
import { Button, Col, ListGroup, Row, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '@/components/react/utils/Rating';
import LoadingBox from '@/components/react/utils/LoadingBox';
import MessageBox from '@/components/react/utils/MessageBox';
import CustomForm from '@/components/react/utils/input/CustomForm';
import { SERVER_URL } from "@/context/utils";
import "@/assets/css/services/services.css";

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


function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [city, setCity] = useState('');
  const [shifts, setShifts] = useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [{ loading, error, service }, dispatch] = useReducer(reducer, {
    service: [],
    loading: true,
    error: '',
  });
  function handleShiftChange() {
    if (service.availabilities) {
      for (let i = 0; i < service.availabilities.length; i++) {
        if (service.availabilities[i].city == city) {
          setShifts(service.availabilities[i].shifts);
          return;
        }
      }
    }
    setShifts([])
  }
  function handleCityChange(e) {
    setCity(e.target.value);
  }
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
      handleShiftChange();
    } catch (err) {
      console.log('Yikes ma boy fr fr');
      dispatch({ type: 'FETCH_FAIL', payload: `${err.message} :( totally not my fault i think` });
    }

  };
  async function book(data) {
    console.log(data)
    return false
  }

  useEffect(() => {
    // called twice becasue in React.strict mode, will not happend in prod
    fetchData();
  }, [slug]);
  useEffect(() => {
    // called twice becasue in React.strict mode, will not happend in prod
    handleShiftChange()
  }, [city]);
  // const { state, dispatch: ctxDispatch } = useContext(Store);

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
              <img className='w-100' src={service.poster} alt={service.title}>
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
          <Row className='mx-auto mt-3 text-center'>
            <h3 className='fw-bold mx-auto'>Booking</h3>
          </Row>
          <Form key={'form'} onSubmit={handleSubmit(book)}>
            <CustomForm register={register} opts={service.opts} />
            <Row className='mb-4 text-center mx-auto'>
              <Col md={6} sm={12} sx={12} className="mx-auto" >
                <Form.Select {...register("city")} value={city} name="city" aria-label="city" onChange={handleCityChange}>
                  <option key={-1} value={"none"} label={"none"} ></option>
                  {
                    service.availabilities.map((ava, index) => {
                      return <option key={index} value={ava.city} label={ava.city} ></option>
                    })
                  }
                </Form.Select>
                <hr />
              </Col>
              <Col md={6} sm={12} sx={12} className="mx-auto" >
                <Form.Select {...register("shift")} aria-label="shift">
                  {
                    shifts.map((ava, index) => {
                      return <option key={index} value={index} label={`${ava.day} : ${ava.begin}-${ava.end}`}></option>
                    })
                  }
                </Form.Select>
                <hr />
              </Col>
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
