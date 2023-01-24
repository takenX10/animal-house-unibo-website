import { useContext, useEffect, useState, useReducer } from 'react';
import { useForm } from "react-hook-form";
import { Button, Col, ListGroup, Row, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '@/components/react/utils/Rating';
import LoadingBox from '@/components/react/utils/LoadingBox';
import MessageBox from '@/components/react/utils/MessageBox';
import CustomForm from '@/components/react/utils/input/CustomForm';
import Navbar from "@/components/react/navbar/Navbar";
import { SERVER_URL, getDayLabel, getHourLabel } from "@/context/utils";
import "@/assets/css/services/services.css";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, service: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'BOOKING_SUCCESS':
      return { ...state, success: true };
    default:
      return state;
  }
}


function ServiceScreen() {
  const navigate = useNavigate();
  const params = useParams();
  console.log("he")
  const { slug, serviceType } = params;
  const [cityIndex, setCityIndex] = useState('');
  const [dayIndex, setDayIndex] = useState('');
  const [hourIndex, setHourIndex] = useState('');
  const [shifts, setShifts] = useState('');
  const [hours, setHours] = useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [{ loading, error, service, success }, dispatch] = useReducer(reducer, {
    service: [],
    loading: true,
    error: '',
    success: false,
  });
  function handleShiftChange() {
    if (service.availabilities) {
      if (service.availabilities[cityIndex]) {
        setShifts(service.availabilities[cityIndex].shifts);

        if (service.availabilities[cityIndex].shifts[dayIndex])
          setHours(service.availabilities[cityIndex].shifts[dayIndex].hours)
        return;
      }
    }
    setShifts([])
  }
  function handleHoursChange(e) {
    if (shifts) {
      if (shifts[dayIndex]) {
        setHours(shifts[dayIndex].hours)
        return;
      }
    }
    setHours([])
    if (e)
      setHourIndex(e.target.value);
  }
  function handleCityChange(e) {
    setCityIndex(e.target.value);
  }
  function handleDayChange(e) {
    setDayIndex(e.target.value);
  }
  async function fetchData() {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const result = await fetch(`${SERVER_URL}/api/services/${serviceType}/slug/${slug}`);
      if (!result.ok) {
        throw new Error((await result.json()).message);
      }
      const item = await result.json();
      console.log(item);
      dispatch({ type: 'FETCH_SUCCESS', payload: item });
      console.log('Success ma boy fr fr');
      setCityIndex(0);
      setDayIndex(0);
      setHours([])
      setShifts([])
    } catch (err) {
      console.log('Yikes ma boy fr fr');
      dispatch({ type: 'FETCH_FAIL', payload: `${err.message} :( totally not my fault i think` });
    }
  };
  async function book(data) {
    try {
      if (data.cityIndex == '')
        data.cityIndex = '0';
      if (data.dayIndex == '')
        data.dayIndex = '0';
      if (data.hourIndex == '')
        data.hourIndex = '0';
      let c = parseInt(data.cityIndex);
      let d = parseInt(data.dayIndex);
      let h = parseInt(data.hourIndex);
      let id = (service.availabilities[c].shifts[d].hours[h]._id);
      data.id = id;
      let res = await fetch(`${SERVER_URL}/api/services/${serviceType}/book/${slug}`, {
        method: "POST",
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      })
      if (res.status != 200)
        dispatch({ type: 'FETCH_FAIL', payload: `Error while booking !` });
      else {
        dispatch({ type: 'BOOKING_SUCCESS' });
        fetchData()
      }
    } catch (err) {
      console.log('Yikes ma boy fr fr');
      dispatch({ type: 'FETCH_FAIL', payload: `${err.message} :( totally not my fault i think` });
    }
    return false;
  }


  useEffect(() => {
    // called twice becasue in React.strict mode, will not happend in prod
    fetchData();
  }, [slug]);
  useEffect(() => {
    // called twice becasue in React.strict mode, will not happend in prod
    handleShiftChange()
  }, [cityIndex]);
  useEffect(() => {
    // called twice becasue in React.strict mode, will not happend in prod
    handleHoursChange()
  }, [dayIndex]);
  // const { state, dispatch: ctxDispatch } = useContext(Store);

  return (
    loading ? (<LoadingBox />)
      : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className='container mb-4'>
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
                <Col md={4} sm={12} sx={12} className="mx-auto" >
                  <Form.Select {...register("cityIndex")} aria-label="cityIndex" onChange={handleCityChange} required>
                    <option key={-1} value={"none"} label={"none"} ></option>
                    {
                      service.availabilities.map((ava, index) => {
                        return <option key={index} value={index} label={`${ava.city} - ${ava.address}`} ></option>
                      })
                    }
                  </Form.Select>
                  <hr />
                </Col>
                <Col md={4} sm={12} sx={12} className="mx-auto" >
                  <Form.Select {...register("dayIndex")} aria-label="dayIndex" onChange={handleDayChange} required>
                    {
                      shifts.map((ava, index) => {
                        return <option key={index} value={index} label={`${getDayLabel(ava.day)}`}></option>
                      })
                    }
                  </Form.Select>
                  <hr />
                </Col>
                <Col md={4} sm={12} sx={12} className="mx-auto" >
                  <Form.Select {...register("hourIndex")} aria-label="hourIndex" onChange={handleHoursChange} required>
                    {
                      hours.map((h, index) => {
                        return <option key={index} value={index} label={`${getHourLabel(h.begin)} - ${getHourLabel(h.end)}  (${h.currentClients}/${h.maxClients})`}></option>
                      })
                    }
                  </Form.Select>
                  <hr />
                </Col>
              </Row>
              {success > 0 &&
                <Row><MessageBox variant="success">Booking successfully done!</MessageBox> </Row>}
              <Row className='mx-auto text-center'>
                <Col md={3} sm={10} xs={10} className="mx-auto">
                  <Button variant="primary" className='w-100' type="submit">
                    Book
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </>
      )
  );
}

export default ServiceScreen;
