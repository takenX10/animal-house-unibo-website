import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { SERVER_URL } from '@/context/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CreatePostModal from './CreatePostModal';
import Answer from './Answer';
import Post from './Post';

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
        toast(e);
    }
}

export default function EccoloQua({type}){
    const [posts, setPosts] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [myStyle, setMyStyle] = useState({display:"none"});
    const [show, setShow] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState(null);

    async function getPosts(){
        try {
            let res = await fetch(`${SERVER_URL}/backoffice/get_posts`, {
                method:"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({type:type})
            });
            res = await res.json();
            return res.posts;
        }catch(e){
            toast(e);
        }
    }

    async function showAnswers(id){
        setMyStyle({display:"block"});
        setAnswers(await getAnswers(id));
    }
    function hideAnswers(){
        setMyStyle({display:"none"});
    }
    
    const hideModal = ()=>{setShow(false); setCurrentAnswer(null);}
    const showModal = ()=>{setShow(true);}
    
    useEffect(()=>{
        if(currentAnswer){
            showModal();
        }
    }, [currentAnswer]);

    async function init(){
        setPosts(await getPosts());
    }

    useEffect(()=>{
        init();
    }, []);
    return (
        <>
            <Container fluid className="post-container">
                <Row className="justify-content-center">
                    <Col lg="7">
                        <Button variant="dark" className="m-3" onClick={showModal}>Crea un post!</Button>
                        {posts.map((thispost)=>{return (
                            <Post 
                                key={thispost.id} 
                                author={thispost.author} 
                                text={thispost.message} 
                                id={thispost.id} 
                                showAnswersHandler={showAnswers} 
                                answerHandler={setCurrentAnswer}
                            />
                        )})}
                    </Col>
                    <Col lg="5" style={myStyle}>
                        <Button variant="danger" className="m-3" onClick={hideAnswers}>Chiudi risposte</Button>
                        {answers.map((ans)=>{return (
                            <Answer key={ans.id} author={ans.author} text={ans.message}/>
                        )})}
                    </Col>
                </Row>
            </Container>
            <CreatePostModal
                answer={currentAnswer} 
                show={show} 
                hideModal={hideModal}
                refreshPosts={async()=>{setPosts(await getPosts());}}
                type={type}
                toast={toast}
            />
            <ToastContainer />
        </>
    );
}