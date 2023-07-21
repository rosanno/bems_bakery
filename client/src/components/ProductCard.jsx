import Card from "react-bootstrap/Card";
import CustomBadge from "./ui/CustomBadge";

const ProductCard = ({ product }) => {
  return (
    <Card className="w-100 h-100 border-0 shadow-sm p-1 p-xl-2">
      <Card.Img variant="top" src={product?.imageURL} className="p-4 w-100 h-75" />
      <Card.Body className="px-2">
        <Card.Title className="fw-normal">{product?.name}</Card.Title>
        <Card.Text className="fw-semibold mb-1">₱{product?.price}</Card.Text>
        <CustomBadge />
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
