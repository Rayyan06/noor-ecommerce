import { Link } from '@remix-run/react';

export default function ProductCard({ product }) {
  return (
    <div className="flex flex-col items-center">
      <Link className="w-full h-full" to={product.id}>
        <figure
          className="items-center bg-contain justify-end overflow:hidden aspect-9/16"
          style={{
            backgroundImage: 'url(product.imageUrl)',
          }}
        ></figure>

        <h3 className="text-xl font-serif ">{product.name}</h3>
        <h3>${product.price}</h3>
      </Link>
    </div>
  );
}
