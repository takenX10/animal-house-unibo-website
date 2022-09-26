import { Spinner } from "react-bootstrap";

export default function LoadingBox() {
  return (
    <Spinner className="text-center" animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}
