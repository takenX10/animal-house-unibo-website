
export default function Answer({author, text}){
    return (
        <div className="answer border border-primary p-3 m-2">
            <h4 className="fs-6 fw-bold answer-author">{author}</h4>
            <p className="answer-text">{text}</p>
        </div>
    );
}