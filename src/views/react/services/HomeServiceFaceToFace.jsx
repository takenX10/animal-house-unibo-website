import { useEffect, useReducer, useState } from "react";
import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { getDayLabel } from "@/context/utils";
import { Helmet } from "react-helmet-async";
import Service from "@/components/react/services/Service";
import MessageBox from "@/components/react/utils/MessageBox";
import LoadingBox from "@/components/react/utils/LoadingBox";
import "@/assets/css/ecommerce.css";
import { SERVER_URL } from "@/context/utils";

const reducer = (state, action) => {
  let servicesFaceToFaceFiltered = [];
  let servicesFaceToFace = [];
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      let serv = action.payload;
      let pf = ["None"];
      let df = ["None"];
      for (let s = 0; s < serv.length; s++) {
        let ava = serv[s].availabilities;
        for (let i = 0; i < ava.length; i++) {
          pf.push(ava[i].city);
          for (let j = 0; j < ava[i].shifts.length; j++) {
            if (!df.includes(ava[i].shifts[j].day))
              df.push(ava[i].shifts[j].day);
          }
        }
      }
      return {
        ...state,
        servicesFaceToFace: action.payload,
        servicesFaceToFaceFiltered: action.payload,
        placeFilters: pf,
        dayFilters: df,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "FILTER":
      servicesFaceToFace = action.servicesFaceToFace;
      let place = action.place || "None";
      let day = action.day || "None";
      if (place == "None" && day == "None")
        servicesFaceToFaceFiltered = servicesFaceToFace;
      else {
        for (let i = 0; i < servicesFaceToFace.length; i++) {
          let s = servicesFaceToFace[i];
          for (let a = 0; a < s.availabilities.length; a++) {
            if (place != "None" && s.availabilities[a].city == place) {
              if (day == "None") {
                servicesFaceToFaceFiltered.push(s);
                break;
              } else {
                for (let j = 0; j < s.availabilities[a].shifts.length; j++) {
                  if (
                    day != "None" &&
                    s.availabilities[a].shifts[j].day == day
                  ) {
                    servicesFaceToFaceFiltered.push(s);
                    break;
                  }
                }
              }
            } else {
              if (place == "None") {
                for (let j = 0; j < s.availabilities[a].shifts.length; j++) {
                  if (
                    day != "None" &&
                    s.availabilities[a].shifts[j].day == day
                  ) {
                    servicesFaceToFaceFiltered.push(s);
                    break;
                  }
                }
              }
            }
          }
        }
      }
      return {
        ...state,
        servicesFaceToFaceFiltered: servicesFaceToFaceFiltered,
        loading: false,
      };
    default:
      return state;
  }
};

export default function HomeServiceFaceToFace() {
  const [
    {
      loading,
      error,
      servicesFaceToFace,
      placeFilters,
      dayFilters,
      servicesFaceToFaceFiltered,
    },
    dispatch,
  ] = useReducer(reducer, {
    servicesFaceToFace: [],
    placeFilters: [],
    dayFilters: [],
    loading: true,
    error: "",
    servicesFaceToFaceFiltered: [],
  });
  const [place, setPlace] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await fetch(`${SERVER_URL}/api/services/facetoface`);
        const data = await result.json();
        if (!result.ok) throw new Error(data.message);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({
      type: "FILTER",
      servicesFaceToFace: servicesFaceToFace,
      place: place,
      day: day,
    });
  }, [place, day]);

  return (
    <>
      <div className="container-fluid text-center">
        <Helmet>
          <title>Face To Face Services - Animal House</title>
        </Helmet>
        <h1 className="display-4">Face To Face Services </h1>
        <div className="services mx-auto">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="mx-auto">
                <Col md={4} sm={6} className="mx-auto">
                  <div className="content">
                    <label htmlFor="placeFilters">
                      <b>Place filter</b>
                    </label>
                    <Form.Select
                      id="placeFilters"
                      aria-label="Place filter"
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                    >
                      {placeFilters.map((f, index) => {
                        return (
                          <option key={index} value={f} label={f}></option>
                        );
                      })}
                    </Form.Select>
                  </div>
                </Col>
              </Row>
              <Row className="mx-auto">
                <Col md={4} sm={6} className="mx-auto">
                  <div className="content">
                    <label htmlFor="dayFilters">
                      <b>Day filter</b>
                    </label>
                    <Form.Select
                      id="dayFilters"
                      aria-label="Day filter"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                    >
                      {dayFilters.map((f, index) => {
                        return (
                          <option
                            key={index}
                            value={f}
                            label={f == "None" ? "None" : getDayLabel(f)}
                          ></option>
                        );
                      })}
                    </Form.Select>
                  </div>
                </Col>
              </Row>
              <Row className="mx-auto mt-4">
                {servicesFaceToFaceFiltered.map((service) => (
                  <Col
                    key={service.slug}
                    sm={6}
                    md={4}
                    lg={3}
                    className="mb-3 mx-auto"
                  >
                    <Service service={service}></Service>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </div>
      </div>
    </>
  );
}
