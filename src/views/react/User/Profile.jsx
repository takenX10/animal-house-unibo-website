import { useEffect, useState, useRef, useContext } from 'react';
import { Store } from "@/context/store";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Form, Container, Row, Col, Table, Button } from 'react-bootstrap';
import { SERVER_URL, check_login, logout, getDayLabel, getHourLabel } from '@/context/utils';
import { useNavigate } from 'react-router-dom';
import "@/assets/css/colors.scss";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const { dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Giorgio",
    surname: "Pisu",
    email: "giorgio@pisu.com",
    contact: "+33 312 333 2938",
    petList: ["id1", "id2"]
  });
  const [pets, setPets] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showValue, setShowChange] = useState(false);
  const oldpsw = useRef();
  const newpsw = useRef();
  const repeatNewpsw = useRef();

  const hideChange = () => { setShowChange(false) };
  const showChange = () => { setShowChange(true) };

  async function getConfirmation(id) {
    let retval = confirm("Are you sure you want to delete this pet?");
    if (retval) {
      try {
        let res = await fetch(`${SERVER_URL}/backoffice/removepet`, {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        } else {
          find_pets();
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  }

  async function change_password(e) {
    e.preventDefault();
    try {
      if (repeatNewpsw.current.value != newpsw.current.value) {
        alert("Password and repeat password are different!");
        return;
      }
      let res = await fetch(`${SERVER_URL}/api/backoffice/change_password`, {
        method: "POST",
        credentials: "include",
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ oldpsw: oldpsw.current.value, newpsw: newpsw.current.value })
      });
      res = await res.json();
      if (res.success) {
        logout(ctxDispatch);
      }
    } catch (err) {
      toast.error(err);
    }
  }

  async function find_pets() {
    try {
      let res = await fetch(`${SERVER_URL}/backoffice/getpets`, {
        method: "POST",
        credentials: "include",
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
      });
      res = await res.json();
      if (res.success) {
        setPets(res.petlist);
      } else {
        throw new Error(res.message);
      }
    } catch (e) {
      toast.error(e);
    }
  }

  async function get_user() {
    try {
      let res = await fetch(`${SERVER_URL}/api/backoffice/get_user`, {
        method: "GET",
        credentials: "include"
      });
      res = await res.json();
      setUser(res);
      await find_pets();
    } catch (e) {
      toast.error(e);
    }
  }

  async function getBookings() {
    try {
      let b = await (await fetch(`${SERVER_URL}/api/backoffice/get_bookings`, {
        method: "GET",
        credentials: "include"
      })).json();
      if (b.success === true) {
        setBookings(b.bookings);
      }
    } catch (e) {
      toast.error(e);
    }
  }


  async function deleteBooking(booking) {
    try {
      let b = await (await fetch(`${SERVER_URL}/api/backoffice/delete_booking`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ slug: booking.slug, avaId: booking.availability._id, shiftId: booking.shift._id, hourId: booking.hour._id })
      })).json();
      if (b.success === false)
        alert("Can't delete booking !");
      else
        getBookings();
    } catch (e) {
      toast.error(e);
    }
  }

  async function delete_account() {
    try {
      let res = await fetch(`${SERVER_URL}/api/backoffice/delete_user`, {
        method: "POST",
        credentials: "include"
      });
      res = await res.json();
      if (res.success) {
        logout(ctxDispatch);
      }
    } catch (e) {
      toast.error(e);
    }
  }

  async function init() {
    if (!await check_login()) {
      navigate("/backoffice/login");
    }
    get_user();
    getBookings();
  }
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <Container fluid>
        <Row className='px-2 my-5 d-flex justify-content-center'>
          <Col xs={12}>
            <h1 className='fw-bold fs-1 text-center'>{user.name} {user.surname}</h1>
          </Col>
          <Col xs={12} className='text-center d-flex align-items-center justify-content-center'>
            <Button className="m-4 red-back text-white" onClick={() => {
              if (confirm("Are you sure you want to delete your account?")) { delete_account() }
            }}>
              Delete account
            </Button>
            <Button variant="secondary" className="m-4" onClick={showChange}>Change Password</Button>
          </Col>
          <Col xs={12}></Col>
          <Col xs={12} md={7} className='mt-5 text-center'>
            <h2>General informations</h2>
            <Table striped="columns">
              <thead></thead>
              <tbody>
                <tr>
                  <td className='fw-bold'>NAME</td>
                  <td className='text-break'>{user.name}</td>
                </tr>
                <tr>
                  <td className='fw-bold'>SURNAME</td>
                  <td className='text-break'>{user.surname}</td>
                </tr>
                <tr>
                  <td className='fw-bold'>EMAIL</td>
                  <td className='text-break'>{user.email}</td>
                </tr>
                <tr>
                  <td className='fw-bold'>CONTACT</td>
                  <td className='text-break'>{user.contact}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col xs={12} className='text-center d-flex align-items-center justify-content-center'>
            <Button className="m-4 red-back text-white" onClick={() => {
              if (confirm("Are you sure you want to delete your account?")) { delete_account() }
            }}>
              Delete account
            </Button>
            <Button variant="secondary" className="m-4" onClick={() => { navigate("/add_pet"); }}>Add a pet</Button>
          </Col>
          {pets?.length > 0 &&
            <Col xs={12}>
              <h1 className='text-center mt-5 pt-5 fw-bold'>Pets of {user.name} {user.surname}</h1>
            </Col>
          }
          {pets.map((p) => {
            return (
              <Col xs={12} md={7} key={p._id} className="mt-5 text-center">
                <h3>{p.name}</h3>
                <Table striped="columns">
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td className='fw-bold'>NAME</td>
                      <td className='text-break'>{p.name}</td>
                    </tr>
                    <tr>
                      <td className='fw-bold'>RACE</td>
                      <td className='text-break'>{p.race}</td>
                    </tr>
                    <tr>
                      <td className='fw-bold'>WEIGHT</td>
                      <td className='text-break'>{p.weight}</td>
                    </tr>
                    <tr>
                      <td className='fw-bold'>AGE</td>
                      <td className='text-break'>{p.age}</td>
                    </tr>
                    <tr>
                      <td className='fw-bold'>SEX</td>
                      <td className='text-break'>{p.sex}</td>
                    </tr>
                    <tr>
                      <td className='fw-bold'>DESCRIPTION</td>
                      <td className='text-break'>{p.description}</td>
                    </tr>
                    <tr>
                      <td className='fw-bold'>id</td>
                      <td className='text-break'>{p._id}</td>
                    </tr>
                  </tbody>
                </Table>
                <Button variant="danger" onClick={() => { getConfirmation(p._id) }}>Delete</Button>
              </Col>
            );
          })}
        </Row>
        {bookings.length > 0 &&
          <>
            <Row>
              <Col>
                <h2 className='text-center'>Bookings</h2>
              </Col>
            </Row>
            <Row className='mx-4'>
              {bookings.map((b, index) => {
                return (
                  <Col xs={12} md={7} key={b.availability._id + "-" + index} className='mx-auto'>
                    <div >
                      <Row className='mx-auto'>
                        <Col xs={11}>
                          <h3 className='fw-bold'>{b.title}</h3>
                        </Col>
                        <Col xs={1} className='mx-auto' >
                          <Button onClick={() => deleteBooking(b)} className='fw-bold red-back text-black text-end'>X</Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Table striped="columns" className='w-70'>
                            <thead></thead>
                            <tbody>
                              <tr>
                                <td className='fw-bold'>WHERE</td>
                                <td>{b.availability.city} - {b.availability.address}</td>
                              </tr>
                              <tr>
                                <td className='fw-bold'>SHIFT/MONTH</td>
                                <td>{getDayLabel(b.shift.day)}</td>
                              </tr>
                              <tr>
                                <td className='fw-bold'>HOUR/PERIOD</td>
                                <td>{getHourLabel(b.hour.begin)} - {getHourLabel(b.hour.end)}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                )
              })}
            </Row>
          </>
        }
      </Container>
      <Modal show={showValue} onHide={hideChange} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Your password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => { change_password(e) }}>
            <Form.Group>
              <Form.Label>Old password:</Form.Label>
              <Form.Control type="password" placeholder="old psw..." ref={oldpsw}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>New password:</Form.Label>
              <Form.Control type="password" placeholder="new psw..." ref={newpsw}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Repeat new password:</Form.Label>
              <Form.Control type="password" placeholder="repeat new psw..." ref={repeatNewpsw}></Form.Control>
            </Form.Group>
            <Button className="mt-3 p-2 me-3" variant="secondary" onClick={hideChange}>Close</Button>
            <Button className="p-2 mt-3" variant="primary" type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
}
