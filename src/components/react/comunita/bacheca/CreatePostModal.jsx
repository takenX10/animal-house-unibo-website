import { useRef, useEffect } from "react";
import { SERVER_URL } from "@/context/utils";
import { Modal, Form, Button } from "react-bootstrap";

export default function CreatePostModal({
  answer,
  show,
  hideModal,
  refreshPosts,
  type,
  toast,
}) {
  const messageRef = useRef();
  async function create_post(e, value, answer) {
    e.preventDefault();
    try {
      let postData = { message: value, type: type };
      if (answer) {
        postData.answerFrom = answer;
      }
      let res = await fetch(`${SERVER_URL}/backoffice/create_post`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      res = await res.json();
      hideModal();
      if (res.success) {
        toast("Post created correctly");
      }
      refreshPosts();
    } catch (err) {
      hideModal();
      toast(err);
    }
  }
  return (
    <Modal
      show={show}
      onHide={hideModal}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{answer ? "Your Answer:" : "New post"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            create_post(e, messageRef.current.value, answer);
          }}
        >
          <Form.Group>
            <Form.Label for="modaltext">Write your message:</Form.Label>
            <Form.Control
              as="textarea"
              id="modaltext"
              placeholder="Write your message..."
              ref={messageRef}
            ></Form.Control>
          </Form.Group>
          <Button
            className="mt-3 p-2 me-3"
            variant="secondary"
            onClick={hideModal}
          >
            Close
          </Button>
          <Button className="p-2 mt-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
