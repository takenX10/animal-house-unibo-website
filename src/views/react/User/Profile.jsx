import { useEffect, useState, useRef, useContext } from 'react';
import { Store } from "@/context/store";
import Navbar from '@/components/react/navbar/Navbar';
import { Modal, Form, Container, Row, Col, Table, Button } from 'react-bootstrap';
import { SERVER_URL, check_login, logout } from '@/context/utils';

export default function Profile(){
    const {dispatch: ctxDispatch } = useContext(Store);
    const [user, setUser] = useState({
        name:"Giorgio",
        surname: "Pisu",
        email: "giorgio@pisu.com",
        contact: "+33 312 333 2938",
        petList: ["id1", "id2"]
    });
    const [pets, setPets] = useState([]);
    const [showValue, setShowChange] = useState(false);
    const oldpsw = useRef();
    const newpsw = useRef();
    const repeatNewpsw = useRef();

    const hideChange = ()=>{setShowChange(false)};
    const showChange = ()=>{setShowChange(true)};

    async function change_password(e){
        e.preventDefault();
        try{
            if(repeatNewpsw.current.value != newpsw.current.value){
                alert("Password and repeat password are different!");
                return;
            }
            let res = await fetch(`${SERVER_URL}/backoffice/change_password`, {
                method:"POST",
                credentials:"include",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({oldpsw:oldpsw.current.value, newpsw: newpsw.current.value})
            });
            res = await res.json();
            if(res.success){
                logout(ctxDispatch);
                window.location = "/";
            }
        }catch(err){
            alert(err);
        }
    }

    async function find_pets(petList){
        let newpets = [];
        for(let p of petList){
            try{
                let res = await fetch(`${SERVER_URL}/backoffice/get_a_puppy`, {
                    method: "POST",
                    credentials:"include",
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id:p})
                });
                res = await res.json();
                newpets = [...newpets, res];
            }catch(e){
                alert(e);
            }
        }
        setPets(newpets);
    }

    async function get_user(){
        try{
            let res = await fetch(`${SERVER_URL}/backoffice/get_user`, {
                method: "POST",
                credentials:"include"
            });
            res = await res.json();
            setUser(res);
            find_pets(res.petList);
        }catch(e){
            alert(e);
        }
    }

    async function delete_account(){
        try{
            let res = await fetch(`${SERVER_URL}/backoffice/delete_user`, {
                method:"POST",
                credentials:"include"
            });
            res = await res.json();
            if(res.success){
                logout(ctxDispatch);
            }
        }catch(e){
            alert(e);
        }
    }

    async function init(){
        await check_login(true);
        get_user();
    }
    useEffect(()=>{
        init();
    }, []);
    return (
        <>
            <Navbar />
            <Container fluid>
                <Row className='mx-5 px-5 my-3'>
                    <Col>
                        <Button variant="danger" onClick={()=>{if(confirm("Are you sure you want to delete your account?")){delete_account()}}}>Delete account</Button>
                        <Button variant="secondary" className='m-2' onClick={showChange}>Change Password</Button>
                    </Col>
                </Row>
                <Row className='mx-5 px-5'>
                    <Col>
                        <h1 className='fw-bold fs-1'>Hello, {user.name} {user.surname}</h1>
                        <h2>General informations</h2>
                        <Table striped="columns" className='w-70'>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td className='fw-bold'>NAME</td>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <td className='fw-bold'>SURNAME</td>
                                    <td>{user.surname}</td>
                                </tr>
                                <tr>
                                    <td className='fw-bold'>EMAIL</td>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <td className='fw-bold'>CONTACT</td>
                                    <td>{user.contact}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col className='p-5 m-2'>
                        <h2 className='text-center'>Pets</h2>
                        {pets.map((p)=>{
                            return (
                                <div key={p._id}>
                                    <h3 className='fw-bold'>{p.name}</h3>
                                    <Table striped="columns" className='w-70'>
                                        <thead></thead>
                                        <tbody>
                                            <tr>
                                                <td className='fw-bold'>NAME</td>
                                                <td>{p.name}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold'>RACE</td>
                                                <td>{p.race}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold'>WEIGHT</td>
                                                <td>{p.weight}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold'>AGE</td>
                                                <td>{p.age}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold'>SEX</td>
                                                <td>{p.sex}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold'>DESCRIPTION</td>
                                                <td>{p.description}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold'>id</td>
                                                <td>{p._id}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            );
                        })}
                    </Col>
                </Row>
            </Container>
            <Modal show={showValue} onHide={hideChange} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                <Modal.Title>Change Your password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e)=>{change_password(e)}}>
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
        </>
    );
}