type ProductCardProps = {
  name: string;
};
export default function ProductCard({ name, price, image }: ProductCardProps) {
  return (
    <div>
      <h3>{name}</h3>
      <h3>{price}</h3>
    </div>
  );
}
