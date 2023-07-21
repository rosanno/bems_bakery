import Card from "react-bootstrap/Card";
import { AiFillStar } from "react-icons/ai";

const ProductCard = ({ product }) => {
  return (
    <Card className="w-100 h-100 border-0 shadow-sm p-1 p-xl-2">
      <Card.Img variant="top" src={product?.imageURL} className="p-4 w-100 h-75" />
      <Card.Body className="px-2">
        <Card.Title className="fw-normal">{product?.name}</Card.Title>
        <Card.Text className="fw-semibold mb-1">₱{product?.price}</Card.Text>
        <div className="d-flex flex-column flex-lg-row align-align-items-lg-center gap-2 mt-2 mt-lg-3">
          <div className="custom-badge d-flex align-items-center">
            <span>4.9</span>
            <AiFillStar
              style={{
                color: "#15723D",
              }}
            />
          </div>
          <Card.Text className="fs-6">330 Reviews</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
