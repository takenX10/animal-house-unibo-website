import { useEffect, useReducer, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { getDayLabel } from '@/context/utils';
import { Helmet } from 'react-helmet-async';
import Service from '@/components/react/services/Service';
import MessageBox from '@/components/react/utils/MessageBox';
import LoadingBox from '@/components/react/utils/LoadingBox';
import "@/assets/css/ecommerce.css";
import { SERVER_URL } from "@/context/utils";

const reducer = (state, action) => {
  let servicesOnlineFiltered = []
  let servicesOnline = [];
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      let serv = action.payload;
      let pf = ["None"]
      let df = ["None"]
      for (let s = 0; s < serv.length; s++) {
        let ava = serv[s].availabilities;
        for (let i = 0; i < ava.length; i++) {
          pf.push(ava[i].city)
          for (let j = 0; j < ava[i].shifts.length; j++) {
            if (!df.includes(ava[i].shifts[j].day))
              df.push(ava[i].shifts[j].day);
          }
        }
      }
      return { ...state, servicesOnline: action.payload, servicesOnlineFiltered: action.payload, platformFilters: pf, dayFilters: df, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'FILTER':
      servicesOnline = action.servicesOnline;
      let platform = action.platform || "None";
      let day = action.day || "None";
      if (platform == "None" && day == "None")
        servicesOnlineFiltered = servicesOnline
      else {
        for (let i = 0; i < servicesOnline.length; i++) {
          let s = servicesOnline[i];
          for (let a = 0; a < s.availabilities.length; a++) {
            if (platform != "None" && s.availabilities[a].city == platform) {
              if (day == "None") {
                servicesOnlineFiltered.push(s);
                break;
              }
              else {
                for (let j = 0; j < s.availabilities[a].shifts.length; j++) {
                  if (day != "None" && s.availabilities[a].shifts[j].day == day) {
                    servicesOnlineFiltered.push(s);
                    break;
                  }
                }
              }
            } else {
              if (platform == "None") {
                for (let j = 0; j < s.availabilities[a].shifts.length; j++) {
                  if (day != "None" && s.availabilities[a].shifts[j].day == day) {
                    servicesOnlineFiltered.push(s);
                    break;
                  }
                }
              }
            }
          }
        }
      }
      return { ...state, servicesOnlineFiltered: servicesOnlineFiltered, loading: false };
    default:
      return state;
  }
}


export default function HomeServiceOnline() {
  const [{ loading, error, servicesOnline, platformFilters, dayFilters, servicesOnlineFiltered }, dispatch] = useReducer(reducer, {
    servicesOnline: [],
    platformFilters: [],
    dayFilters: [],
    loading: true,
    error: '',
    servicesOnlineFiltered: []
  });
  const [platform, setPlatform] = useState('');
  const [day, setDay] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await fetch(`${SERVER_URL}/api/services/online`);
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

  useEffect(() => {
    dispatch({ type: 'FILTER', servicesOnline: servicesOnline, platform: platform, day: day })
  }, [platform, day]);


  return (
    <>
      <div className='container-fluid text-center'>
        <Helmet>
          <title>Animal house</title>
        </Helmet>
        <h1>Services Online</h1>
        <div className="services mx-auto">
          {
            loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant='danger'>{error}</MessageBox>
            ) : (
              <>
                <Row className='mx-auto'>
                  <Col md={6} sm={6} className='mx-auto'>
                    <div className='content'><label htmlFor="platformFilters"><b>Platform filter</b></label>
                      <Form.Select id="platformFilter" aria-label="Platform filter" value={platform} onChange={(e) => setPlatform(e.target.value)}>
                        {
                          platformFilters.map((f, index) => {
                            return <option key={index} value={f} label={f}></option>
                          })
                        }
                      </Form.Select></div>
                    </Col>
                </Row>
                <Row className='mx-auto'>
                  <Col md={6} sm={6} className='mx-auto'>
                    <div className='content'><label htmlFor="dayFilters"><b>Day filter</b></label>
                      <Form.Select id="dayFilter" aria-label="Day filter" value={day} onChange={(e) => setDay(e.target.value)}>
                        {
                          dayFilters.map((f, index) => {
                            return <option key={index} value={f} label={f == "None" ? "None" : getDayLabel(f)}></option>
                          })
                        }
                      </Form.Select></div>
                  </Col>
                </Row>
                <Row className='mx-auto mt-4'>
                  {
                    servicesOnlineFiltered.map(service => (
                      <Col key={service.slug} sm={6} md={4} lg={3} className="mb-3">
                        <Service service={service}></Service>
                      </Col>
                    ))
                  }
                </Row>
              </>
            )
          }
        </div>
      </div>
    </>
  )
}
