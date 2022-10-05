import Carousel from 'react-bootstrap/Carousel';
import { SERVER_URL } from "@/context/utils";

export default function ImgCarousel({images}) {

  return (
    <Carousel>
        {
          images.map(image=>(
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`${SERVER_URL}/${image}`}
                alt="Product Slide"
              />
            </Carousel.Item>
          ))
        } 
    </Carousel>
  );
}

