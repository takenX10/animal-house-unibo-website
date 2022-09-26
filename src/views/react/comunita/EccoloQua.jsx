import React, { useEffect, useState } from "react";
import Navbar from '@/components/react/navbar/Navbar';

/**
 * A quanto pare la bacheca eccolo qua consiste in un forum in cui la gente puo
 * scrivere, creando post in cui la gente puo rispondere.
 * I vincoli di questa bacheca sono che la gente NON loggata possa solo leggere, mentre
 * la gente loggata puo sia leggere sia scrivere.
 * 
 * Dunque e' necessaria:
 * - un api che ti permetta di ottenere la lista dei post, prendendo per esempio massimo 10 post e potendo richiedere un altra pagina
 * - un api che ti permette di visualizzare le risposte ad un post, prendendone 10 alla volta.
 * - un api che ti permetta di creare un nuovo post
 * - un api che ti permetta di rispondere ad un post gia esistente (per esempio prendendone l'id)
 *
 */

// {postid:11, resPage:page}, parte da 1 e va avanti
function getAnswers(id){
    return [
        {author:"giovanni", text:"risposta 1"},
        {author:"aldo", text:"risposta 2"},
        {author:"giacomo", text:"risposta 3"},
    ]
}
// {postPage:page}
function getPosts(page){
    return [
        {author:"Aldo baglio", text:"non posso ne scendere ne salire, NE SCENDERE NE SALIRE!", id:10},
        {author:"Pietro smusi", text:"Sai come lo pago il sito? con la carta dello zio peppe!", id:11}
    ]
}

export default function EccoloQua(){
    const [posts, setPosts] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [myStyle, setMyStyle] = useState({display:"none"});
    function Post({author, text, id}){
        return (
            <div className="post border border-dark border-width-1 p-3 m-2">
                <h3 className="fw-bold post-author">{author}</h3>
                <p className="post-text">{text}</p>
                <button type="button" className="btn btn-success post-answers-button" onClick={()=>{showAnswers({id})}}>Visualizza risposte</button>
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
    
    useEffect(()=>{
        setPosts(getPosts());
        const myModal = document.getElementById('new-message-modal');
        const myInput = document.getElementById('new-message-button');

        myModal.addEventListener('shown.bs.modal', () => {
            myInput.focus()
        });
    },[]);

    function showAnswers(id){
        setMyStyle({display:"block"});
        setAnswers(getAnswers(id));
    }

    function hideAnswers(){
        setMyStyle({display:"none"});
    }
    return (
        <>
            <Navbar />
            <main>
                <div className="container-fluid post-container">
                    <div className="row justify-content-center">
                        <div className="col-7">
                            <button type="button" id="new-message-button" className="btn btn-dark m-3"  data-bs-toggle="modal" data-bs-target="#new-message-modal">Crea un post!</button>
                            {posts.map((mypost)=>{return (<Post author={mypost.author} text={mypost.text} id={mypost.id} key={mypost.text} />)})}
                        </div>
                        <div className="col-5" style={myStyle}>
                            <button type="button" className="btn btn-danger m-3" onClick={hideAnswers}>Chiudi risposte</button>
                            {answers.map((myanswer)=>{return (<Answer author={myanswer.author} text={myanswer.text} />)})}
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="new-message-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Nuovo post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label for="message-text" className="col-form-label">Messaggio post:</label>
                                    <textarea className="form-control" id="message-text"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Crea post</button>
                        </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}