import { Button } from 'react-bootstrap';

export default function Post({author, text, id, showAnswersHandler, answerHandler}){
    return (
        <div className="border border-dark border-width-1 p-3 m-2">
            <h3 className="fw-bold">{author}</h3>
            <p>{text}</p>
            <Button className="btn btn-success" onClick={()=>{showAnswersHandler(id)}}>Show Answers</Button>
            <Button className="btn btn-primary m-3" onClick={()=>{answerHandler(id)}}>Answer</Button>
        </div>
    );
}