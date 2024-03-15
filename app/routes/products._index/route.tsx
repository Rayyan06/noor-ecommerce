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
    <div className="mx-12 py-6 md:mx-16 lg:mx-24">
      <h1 className="text-5xl font-serif mb-5">Products</h1>
      <hr />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-12 justify-center mt-5 ">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
