import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProductCard = ({ product }) => {
  return (
    <Card className="w-100 h-100 border-0 shadow-sm p-2">
      <Card.Img variant="top" src={product?.imageURL} className="p-2 w-100 h-75" />
      <Card.Body className="px-2">
        <Card.Title className="fs-6 fw-normal">{product?.name}</Card.Title>
        <Card.Text className="fs-5 fw-semibold">₱{product?.price}</Card.Text>
        <Button variant="outline"></Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
