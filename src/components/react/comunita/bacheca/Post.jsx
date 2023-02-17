import { Button } from "react-bootstrap";
import { deletePost } from "@/context/utils";

export default function Post({
  author,
  text,
  id,
  showAnswersHandler,
  answerHandler,
  isAdmin,
  isLoggedIn,
  refresh,
}) {
  return (
    <div className="border rounded border-secondary border-width-1 p-3 m-2">
      <h3 className="fw-bold">{author}</h3>
      <p>{text}</p>
      <Button
        href="#answers"
        variant="secondary"
        className="m-3 text-white cool-orange-bg"
        onClick={() => {
          showAnswersHandler(id);
        }}
      >
        Show Answers
      </Button>
      {isLoggedIn ? (
        <Button
          variant="primary"
          className="m-3"
          onClick={() => {
            answerHandler(id);
          }}
        >
          Answer
        </Button>
      ) : (
        <></>
      )}
      {isAdmin ? (
        <Button
          variant="danger"
          className="m-3"
          onClick={async () => {
            await deletePost(id);
            refresh();
          }}
        >
          Delete post
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
}
