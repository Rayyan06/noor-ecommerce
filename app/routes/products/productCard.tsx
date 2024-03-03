type ProductCardProps = {
  name: string;
  price: number;
  description: string;
};
export default function ProductCard({
  name,
  price,
  description,
}: ProductCardProps) {
  return (
    <div
      className="flex flex-col items-center justify-end"
      style={{
        backgroundImage:
          'url("https://dummyimage.com/600x400/a6a6a6/000000.jpg&text=Product+Image")',
      }}
    >
      <h3 className="text-xl font-serif ">{name}</h3>
      <h3>${price}</h3>
    </div>
  );
}
