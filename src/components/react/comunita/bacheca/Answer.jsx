import { deletePost } from "@/context/utils";
import { Button } from "react-bootstrap";

export default function Answer({ author, text, id, isAdmin, refresh }) {
  return (
    <div className="answer border border-primary rounded p-3 m-2">
      <h4 className="fs-6 fw-bold answer-author">{author}</h4>
      <p className="answer-text">{text}</p>
      {isAdmin ? (
        <Button
          variant="danger"
          onClick={async () => {
            await deletePost(id);
            refresh();
          }}
        >
          Delete answer
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
}
