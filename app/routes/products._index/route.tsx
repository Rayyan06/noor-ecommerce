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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-24 justify-center m-12 md:m-16 lg:m-24">
      {data.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
