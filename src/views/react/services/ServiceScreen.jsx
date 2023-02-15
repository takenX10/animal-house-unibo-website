import { useContext, useEffect, useState, useReducer } from 'react';
import { useForm } from "react-hook-form";
import { Button, Badge, Card, Col, ListGroup, Row, Form, FormLabel } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import { Rating as StarInput } from "react-simple-star-rating";
import Rating from "@/components/react/utils/Rating";
import LoadingBox from '@/components/react/utils/LoadingBox';
import MessageBox from '@/components/react/utils/MessageBox';
import CustomForm from '@/components/react/utils/input/CustomForm';
import Navbar from "@/components/react/navbar/Navbar";
import { SERVER_URL, getDayLabel, getHourLabel, check_login } from "@/context/utils";
import "@/assets/css/services/services.css";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, service: action.payload, loading: false };
    case 'FETCH_FAIL': return { ...state, loading: false, error: action.payload }; case 'BOOKING_SUCCESS': return { ...state, success: true };
    case "REVIEW_REQUEST":
      return { ...state, loadingRevs: true };
    case "REVIEW_SUCCESS":
      return { ...state, reviews: action.payload, loadingRevs: false };
    case "REVIEW_FAIL":
      return { ...state, loadingRevs: false, revError: action.payload };
    default:
      return state;
  }
}


function ServiceScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const [loggedIn, setLoggedIn] = useState(false);
  const [rating, setRating] = useState(5);
  const { slug, serviceType } = params;
  const [cityIndex, setCityIndex] = useState('');
  const [dayIndex, setDayIndex] = useState('');
  const [hourIndex, setHourIndex] = useState('');
  const [shifts, setShifts] = useState('');
  const [hours, setHours] = useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [{ loading, error, service, success, reviews, loadingRevs, revError }, dispatch] = useReducer(reducer, {
    service: [],
    loading: true,
    error: '',
    success: false,
    reviews: [],
    loadingRevs: true,
    revError: "",
  });
  const verifyLogin = async () => {
    setLoggedIn(await check_login());
  };
  const handleRating = (rate) => {
    setRating(rate);
  };

  const fetchReviews = async () => {
    dispatch({ type: "REVIEW_REQUEST" });
    try {
      const result = await fetch(
        `${SERVER_URL}/api/services/${slug}/reviews`
      );

      const item = await result.json();
      if (!result.ok) {
        throw new Error(item.message);
      }
      dispatch({ type: "REVIEW_SUCCESS", payload: item });
    } catch (err) {
      dispatch({
        type: "REVIEW_FAIL",
        payload: `${err.message} :( totally not my fault i think`,
      });
    }
  };

  const reviewHandler = async (input) => {
    try {
      let res = await fetch(`${SERVER_URL}/api/services/${slug}/reviews`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input.text,
          rating,
          service: service._id,
        }),
      });

      if (!res.ok) throw new Error((await res.json()).message);

      toast("Review Posted!");
      fetchData();
      fetchReviews();
    } catch (err) {
      toast.error(err.message);
    }
  };

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
      dispatch({ type: 'FETCH_SUCCESS', payload: item });
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
    fetchReviews();
    verifyLogin();
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
    <>
      <div className='container mb-4 mx-auto'>
        {loading && <Row className='mx-auto mt-3 text-center'><Col md={12}><LoadingBox /></Col> </Row>}

        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {!loading && !error &&
          <>
            <ToastContainer />
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
                  <ListGroup.Item tabIndex={0} role="listitem">
                    <b>Category:</b>
                    <p>{service.category}</p>
                  </ListGroup.Item>
                  <ListGroup.Item tabIndex={0} role="listitem">
                    <Rating rating={service.rating} numReviews={service.numReviews}>
                    </Rating>
                  </ListGroup.Item>
                  <ListGroup.Item tabIndex={0} role="listitem">
                    <b>Price: </b>
                    {service.hourlyRate} $/h
                  </ListGroup.Item>
                  <ListGroup.Item tabIndex={0} role="listitem"> <b>Description:</b> <p>{service.description}</p>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>

            {loggedIn && (
              <>
                <Row className='mx-auto mt-3 text-center'>
                  <h2 className='fw-bold mx-auto'>Booking</h2>
                </Row>
                <Form key={'form'} onSubmit={handleSubmit(book)}>
                  <CustomForm register={register} opts={service.opts} />
                  <Row className='mb-4 text-center mx-auto'>
                    <Col md={4} sm={12} sx={12} className="mx-auto" >
                      <FormLabel htmlFor="cityIndex">City</FormLabel>
                      <Form.Select id="cityIndex" {...register("cityIndex")} aria-label="cityIndex" onChange={handleCityChange} required>
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
                      <FormLabel htmlFor="dayIndex">Day</FormLabel>
                      <Form.Select id="dayIndex" {...register("dayIndex")} aria-label="dayIndex" onChange={handleDayChange} required>
                        {
                          shifts.map((ava, index) => {
                            return <option key={index} value={index} label={`${getDayLabel(ava.day)}`}></option>
                          })
                        }
                      </Form.Select>
                      <hr />
                    </Col>
                    <Col md={4} sm={12} sx={12} className="mx-auto" >
                      <FormLabel htmlFor="hourIndex">Period</FormLabel>
                      <Form.Select id="hourIndex" {...register("hourIndex")} aria-label="hourIndex" onChange={handleHoursChange} required>
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
                <Row className="mx-auto text-center mt-4">
                  <Col md={6} className="mx-auto">
                    <h2>Share your review!</h2>
                    <Form id="review-form" onSubmit={handleSubmit(reviewHandler)}>
                      <Form.Group className="mb-3" controlId="text">
                        <Form.Label>What did you think?</Form.Label>
                        <StarInput
                          className="mb-2 ms-2 "
                          initialValue={rating}
                          onClick={handleRating}
                          allowFraction={true}
                          fillColor={"#00afb9"}
                        />
                        <Form.Control as="textarea" rows={3} {...register("text")} />
                      </Form.Group>
                      <div className="mb-3 d-grid ">
                        <Button type="submit">Send</Button>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </>
            )}
            <Row className="mx-auto text-center mb-2">
              <h2>Reviews</h2>
              {loadingRevs ? (
                <LoadingBox />
              ) : revError ? (
                <MessageBox variant="danger">{revError}</MessageBox>
              ) : (
                reviews.map((review) => (
                  <Card className="my-1" key={review._id}>
                    <Card.Body>
                      <Card.Title>{review.reviewer}</Card.Title>
                      <Card.Subtitle>
                        {review.createdAt.substring(0, 10)}
                      </Card.Subtitle>
                      <Rating rating={review.rating}></Rating>
                      <Card.Text>{review.text}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              )}
            </Row>
          </>
        }

      </div>
    </>
  );
}

export default ServiceScreen;
