import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { check_login, SERVER_URL } from '@/context/utils'
import { Button, Row, Col, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";

export default function AddPet() {
  const navigate = useNavigate();
  const [name, setName] = useState('Omer');
  const [race, setRace] = useState('Dog');
  const [description, setDescription] = useState('I am a pretty dog');
  const [age, setAge] = useState(7);
  const [weight, setWeight] = useState(10);
  const [sex, setSex] = useState('male');

  const listSet = {
    "name": setName,
    "race": setRace,
    "description": setDescription,
    "age": setAge,
    "weight": setWeight,
    "sex": setSex,
  };


  function onChange(e) {
    listSet[e.target.id](e.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = {
      "name": name,
      "race": race,
      "description": description,
      "age": age,
      "weight": weight,
      "sex": sex,
    };

    try {
      let res = await fetch(`${SERVER_URL}/backoffice/petadd`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  async function init() {
    if (!await check_login()) {
      navigate('/backoffice/login');
    }
  }
  useEffect(() => {
    init()
  }, [])

  return (
    <Container fluid className='w-100'>
      <Row className='m-3'>
        <Col className='d-flex justify-content-center align-items-center'>
          <h1>ADD A PET</h1>
        </Col>
      </Row>
      <Row className='d-flex justify-content-center align-items-center'>
        <Col lg={6} md={9} sm={12} className="text-center">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
              <Form.Label>Name</Form.Label>
              <Form.Control value={name} type="text" id="name" onChange={onChange} placeholder="Add name" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Race</Form.Label>
              <Form.Control as="select" id="race" onChange={onChange} value={race}>
                <option value="dog">dog</option>
                <option value="cat">cat</option>
                <option value="bird">bird</option>
                <option value="dolphin">dolphin</option>
                <option value="gopher">gopher</option>
                <option value="fish">fish</option>
                <option value="racoon">racoon</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Description</Form.Label>
              <Form.Control value={description} type="text" id="description" onChange={onChange} placeholder="Add a brief description" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control value={age} type="number" id="age" onChange={onChange} placeholder="Add age" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Weight</Form.Label>
              <Form.Control value={weight} type="number" id="weight" onChange={onChange} placeholder="Add weight" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sex</Form.Label>
              <Form.Control as="select" id="sex" onChange={onChange} value={sex}>
                <option value="male">male</option>
                <option value="female">female</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className='mt-5 fs-5 mx-auto'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}
