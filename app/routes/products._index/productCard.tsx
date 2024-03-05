import { Link } from '@remix-run/react';

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
};

export default function ProductCard({ id, name, price }: ProductCardProps) {
  return (
    <div className="flex flex-col items-center">
      <Link className="w-full h-full" to={id}>
        <figure
          className="items-center bg-contain justify-end overflow:hidden aspect-9/16"
          style={{
            backgroundImage:
              'url("https://dummyimage.com/675x1200/a6a6a6/000000.jpg&text=Product+Image")',
          }}
        ></figure>

        <h3 className="text-xl font-serif ">{name}</h3>
        <h3>${price}</h3>
      </Link>
    </div>
  );
}
