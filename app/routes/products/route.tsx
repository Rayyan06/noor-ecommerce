import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { db } from '~/utils/db.server';

import ProductCard from './productCard';

export const loader = async () => {
  return json({
    products: await db.product.findMany(),
  });
};

export default function Products() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="grid grid-cols-3 gap-3 justify-center h-screen overflow-auto">
      {data.products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          description={product.description}
        />
      ))}
    </div>
  );
}
