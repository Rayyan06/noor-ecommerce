type ProductCardProps = {
  name: string;
  price: number;
};
export default function ProductCard({ name, price, image }: ProductCardProps) {
  return (
    <div className="flex flex-col items-center justify-end">
      <h3 className="text-xl font-serif ">{name}</h3>
      <h3>${price}</h3>
    </div>
  );
}
