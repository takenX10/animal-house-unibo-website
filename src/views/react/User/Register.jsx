import Navbar from "@/components/react/navbar/Navbar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { SERVER_URL } from "@/context/utils";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export default function Register(){
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    async function submitForm(data){
        try{
            console.log(data);
            if(data.password != data["repeat-password"]){
                alert("Password and repeat password are different");
                return;
            }
            const val = {
                name:data.name,
                surname:data.surname,
                email:data.email,
                contact:data.contact,
                password:data.password
            }
            let res = await fetch(`${SERVER_URL}/backoffice/register`,{
                method:"POST",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(val)
            });
            res = await res.json();
            if(res.success){
                navigate("/");
            }else{
                toast.error(res.message);
            }
        }catch(e){
            toast(e);
        }
    }
    return (
        <Container fluid>
            <Row className="justify-content-center mt-5">
                <Col xs={10} lg={6} >
                    <h1 className="text-center">Register</h1>
                    <Form onSubmit={handleSubmit(submitForm)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control {...register('name')} type="input"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control {...register('surname')} type="input" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control {...register('contact')} type="input" placeholder="Insert your phone number"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control {...register('email')} type="email" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label >Password</Form.Label>
                            <Form.Control {...register('password')} type="password" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Repeat password</Form.Label>
                            <Form.Control {...register('repeat-password')} type="password" />
                        </Form.Group>
                        <div className="my-5 d-grid">
                            <Button type="submit" variant="primary">Register</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
}
