import { Link } from '@remix-run/react';
import { Product } from '~/utils/interface';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col items-center">
      <Link className="w-full h-full" to={product.id} prefetch="intent">
        <img
          src={`products/images/${product.imageName}`}
          alt={product.name}
          className="rounded-md md:rounded-xl"
        ></img>
        <div className="text-center mt-1 md:mt-2">
          <h3 className="text-sm md:text-xl font-serif ">{product.name}</h3>
          <h3 className="text-sm md:text-lg">${product.price}</h3>
        </div>
      </Link>
    </div>
  );
}
