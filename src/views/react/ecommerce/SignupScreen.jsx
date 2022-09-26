import { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Toast } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "@/context/store";
import { SERVER_URL } from "@/context/utils";
import "@/assets/css/ecommerce.css";

export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');


  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== confPassword)
        throw new Error('The passwords aren\'t matching!');
      const result = await fetch(`${SERVER_URL}/api/users/signup`, {
        method: 'POST',
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({ name, email, password })
      });

      if (!result.ok)
        throw new Error((await result.json()).message);

      const data = await result.json();

      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      navigate(redirect);
    } catch (err) {
      setMessage(err.message);
      setShow(true);
    }
  }
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])
  return (
    <Container className="small-container">
      <Helmet>
        <title>Join Us!</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control required onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" required onChange={(e) => setConfPassword(e.target.value)} />
        </Form.Group>
        <div className="d-grid mb-3">
          <Button onClick={submitHandler} type="submit">Sign Up</Button>
        </div>
        <div className="mb-3">
          Already have an account?{' '}
          <Link className="text-decoration-none link-primary" to={`/signin?redirect=${redirect}`} type="submit">Log in you absolute madman</Link>
        </div>
      </Form>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Header>
          <strong className='me-auto text-dark'>Alert!</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>

      </Toast>
    </Container>
  );
}
