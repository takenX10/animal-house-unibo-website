import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from '@/components/react/utils/Rating';
import { Store } from '@/context/store';
import { SERVER_URL } from '@/context/utils';
import { useContext } from "react";

function Service(props) {
  const { service } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  return (
    <Card className="h-100" key={service.slug}>
      <Link to={`/services/facetoface/${service.slug}`}>
        <img src={service.images[0]} className="prod-img card-img-top" alt={service.title} />
      </Link>
      <Card.Body>
        <Link className="text-decoration-none text-dark " to={`/services/facetoface/${service.slug}`}>
          <Card.Title className="fw-bold">{service.title}</Card.Title>
        </Link>
        <Rating rating={service.rating} numReviews={service.numReviews}></Rating>
        <Card.Text>{service.hourlyRate} $/h</Card.Text>
      </Card.Body>
    </Card>
  );
}
export default Service;
