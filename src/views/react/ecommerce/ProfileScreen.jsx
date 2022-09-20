import React, { useContext, useReducer, useState } from 'react';
import { Button, Card, Col, Form, ListGroup, Toast } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link} from 'react-router-dom';
import { Store } from '../../../context/Store';
import "../../../assets/css/ecommerce.css";

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, };
    case 'UPDATE_FAILURE':
      return { ...state, loadingUpdate: false, };
    default:
      return state;
  }
}


export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState(userInfo.password)
  const [confPassword, setConfPasswd] = useState(userInfo.email)
  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });


  const submitHandler = async (e) => {
    e.preventDefault();
    try {

      const request = await fetch('/api/shop/users/profile', {
        method: 'PUT',
        headers: new Headers({
          "authorization": `Bearer ${userInfo.token}`,
          "content-type": "application/json",
        }),
        body: JSON.stringify({ name, email, password })
      });
      const data = await request.json();

      if (!request.ok)
        throw new Error(data.message);

      dispatch({ type: 'UPDATE_SUCCESS' })
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      setShowForm(false);
    } catch (err) {
      dispatch({
        type: 'FETCH_FAILURE'
      });
      setErrorMessage(err.message);
      setShowToast(true);
    }
  }
  return (
    <div className='container small-container'>
      <Helmet>
        <title>{userInfo.name}'s Profile</title>
      </Helmet>
      <h1 className='my-3'>{userInfo.name}'s profile</h1>

      {!showForm ? (
        <div>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item className='d-flex justify-content-around align-items-center'>
                  <Col><strong>Name: </strong></Col><Col>{userInfo.name}</Col>
                </ListGroup.Item>
                <ListGroup.Item className='d-flex align-items-center'>
                  <Col><strong>Email: </strong></Col><Col>{userInfo.email}</Col>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>

          </Card>
          <Link className='link-primary text-decoration-none' to='' onClick={() => setShowForm(true)}>Edit</Link>
        </div>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              onChange={(e) => setConfPasswd(e.target.value)}
              required
            />
          </Form.Group>
          <div className='my-3'>
            <Button type='submit'>Update</Button>
          </div>
        </Form >
      )
      }
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Header>
          <strong className='me-auto text-dark'>Alert!</strong>
        </Toast.Header>
        <Toast.Body>{errorMessage}</Toast.Body>

      </Toast>
    </div >
  );
}
