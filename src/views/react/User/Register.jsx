import Navbar from "@/components/react/navbar/Navbar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { SERVER_URL } from "@/context/utils";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

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
                alert(res.message);
            }
        }catch(e){
            alert(e);
        }
    }
    return (
        <>
            <Navbar />
            <Container type="fluid">
            <Row className="justify-content-center m-5 p-5">
                <Col lg="8">
                    <h1>Registrati</h1>
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
                            <Form.Label>Ripeti password</Form.Label>
                            <Form.Control {...register('repeat-password')} type="password" />
                        </Form.Group>
                        <Button type="submit" variant="primary">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </>
    );
}