import { SERVER_URL } from '@/context/utils';
import { useContext, useEffect, } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Navbar from '@/components/react/navbar/Navbar';
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "@/context/store";
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { check_login } from '@/context/utils';

export default function Login() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const { register, handleSubmit, } = useForm();

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const submitHandler = async (input) => {
        try {
            let res = await fetch(`${SERVER_URL}/backoffice/login`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            });

            if (!res.ok)
                throw new Error((await res.json()).message);

            const data = await res.json();
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            navigate(redirect);
        } catch (err) {
            toast(err.message);
        }
    }

    useEffect(() => {
        if (userInfo) {
            check_login(false).then((r)=>{if(r){navigate(redirect);}});
        }
    }, [navigate, redirect, userInfo])

    return (
        <>
            <Navbar />
            <Container className="small-container">
                <Helmet>
                    <title>Sign In</title>
                </Helmet>
                <h1 className="my-3">Sign In</h1>
                <Form onSubmit={handleSubmit(submitHandler)}>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required {...register("email")} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required {...register("password")} />
                    </Form.Group>
                    <div className="mb-3 d-grid">
                        <Button type="submit">Sign In</Button>
                    </div>
                    <div className="mb-3">
                        Ya new 'round ere?{' '}
                        <Link className="text-decoration-none link-primary" to={`/signup?redirect=${redirect}`} type="submit">Create an account</Link>
                    </div>
                </Form>
                <ToastContainer />
            </Container>
        </>
    );
}
