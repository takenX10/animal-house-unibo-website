import React, { useEffect, useState, useRef } from "react";
import Navbar from '@/components/react/navbar/Navbar';
import { Modal, Form, Button } from 'react-bootstrap';
import { SERVER_URL } from '@/context/utils';

async function getAnswers(id){
    try{
        let res = await fetch(`${SERVER_URL}/backoffice/get_answers`, {
            method:"POST",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:id})
        });
        res = await res.json();
        return res.answers;
    }catch(e){
        alert(e);
    }
}

async function getPosts(){
    try {
        let res = await fetch(`${SERVER_URL}/backoffice/get_posts`, {method:"POST"});
        res = await res.json();
        return res.posts;
    }catch(e){
        alert(e);
    }
}




export default function EccoloQua(){
    const [posts, setPosts] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [myStyle, setMyStyle] = useState({display:"none"});
    const [show, setShow] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const showModal = ()=>{setShow(true);}
    const hideModal = ()=>{setShow(false); setCurrentAnswer(null);}

    async function create_post(e, value, answer){
        e.preventDefault();
        try{
            let postData = {message:value};
            if(answer){
                postData.answerFrom = answer;
            }
            console.log(postData, answer);
            let res = await fetch(`${SERVER_URL}/backoffice/create_post`, {
                method:"POST",
                credentials:'include',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            res = await res.json();
            hideModal();
            if(res.success){
                alert("Post created correctly");
            }
            setPosts(await getPosts());
        }catch(err){
            hideModal();
            alert(err);
        }
    }

    async function showAnswers(id){
        setMyStyle({display:"block"});
        setAnswers(await getAnswers(id.id));
    }

    function hideAnswers(){
        setMyStyle({display:"none"});
    }

    async function init(){
        setPosts(await getPosts());
    }

    useEffect(()=>{
        init();
    }, []);

    useEffect(()=>{
        if(currentAnswer){
            showModal();
        }
    }, [currentAnswer]);


    const MyModal = ({answer}) =>{
        const messageRef = useRef();
        return (
            <Modal show={show} onHide={hideModal} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                <Modal.Title>{answer ? "Your Answer:":"New post" }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e)=>{create_post(e, messageRef.current.value, answer)}}>
                        <Form.Group>
                            <Form.Label>Write your message:</Form.Label>
                            <Form.Control as="textarea" placeholder="Write your message..." ref={messageRef}></Form.Control>
                        </Form.Group>
                        <Button className="mt-3 p-2 me-3" variant="secondary" onClick={hideModal}>Close</Button>
                        <Button className="p-2 mt-3" variant="primary" type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    };
    function Post({author, text, id}){
        return (
            <div className="post border border-dark border-width-1 p-3 m-2">
                <h3 className="fw-bold post-author">{author}</h3>
                <p className="post-text">{text}</p>
                <Button className="btn btn-success post-answers-button" onClick={()=>{showAnswers({id})}}>Visualizza risposte</Button>
                <Button className="btn btn-primary m-3" onClick={()=>{setCurrentAnswer(id);}}>Rispondi</Button>
            </div>
        );
    }
    
    function Answer({author, text}){
        return (
            <div className="answer border border-primary p-3 m-2">
                <h4 className="fs-6 fw-bold answer-author">{author}</h4>
                <p className="answer-text">{text}</p>
            </div>
        );
    }
    return (
        <>
            <Navbar />
            <main>
                <div className="container-fluid post-container">
                    <div className="row justify-content-center">
                        <div className="col-7">
                            <Button type="button" className="btn btn-dark m-3" onClick={showModal}>Crea un post!</Button>
                            {posts.map((mypost)=>{return (<Post key={mypost.id} author={mypost.author} text={mypost.message} id={mypost.id}/>)})}
                        </div>
                        <div className="col-5" style={myStyle}>
                            <button type="button" className="btn btn-danger m-3" onClick={hideAnswers}>Chiudi risposte</button>
                            {answers.map((myanswer)=>{return (<Answer key={myanswer.id} author={myanswer.author} text={myanswer.message} />)})}
                        </div>
                    </div>
                </div>
                <MyModal answer={currentAnswer} />
            </main>
        </>
    );
}