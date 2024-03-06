import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { getSession } from '~/sessions';

import { db } from '~/utils/db.server';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const product = await db.product.findUnique({
    where: { id: params.productId },
  });

  if (!product) {
    throw new Error('Product not found');
  }
  return json({ product });
};

export default function ProductDetail() {
  const data = useLoaderData<typeof loader>();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-row mx-12 md:mx-16 lg:mx-24">
      <div>
        <img
          src={`https://dummyimage.com/1000x600/ffffff/0011ff&text=Insert ${data.product.name} Image`}
          alt={data.product.name}
          width="1000"
          height="800"
        />
      </div>
      <div className="flex flex-col p-3 space-y-8 w-2/5 justify-center">
        <h1 className="text-5xl font-serif">{data.product.name}</h1>
        <h4 className="text-5xl font-bold">${data.product.price}</h4>
        <p className="font-semibold">Select Quantity</p>
        <div className="flex items-center px-4 mt-2 space-x-4">
          <button
            className="px-4 py-2 hover:shadow-sm hover:text-teal-500 hover:font-bold"
            onClick={() => setQuantity(quantity - 1)}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="px-4 py-2 hover:shadow-sm hover:text-teal-500 hover:font-bold"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
        <Form method="post">
          <button
            type="submit"
            className="bg-black text-white p-3 font-bold hover:bg-gray-500"
          >
            ADD TO CART
          </button>
        </Form>
      </div>
    </div>
  );
}

export async function action({ params, request }: ActionFunctionArgs) {
  const { productId } = params;

  const session = await getSession(request.headers.get('Cookie'));
  console.log(request.headers.get('Cookie'));

  const cartId = (await session.get('cartId')) || '';

  if (!productId || !cartId) {
    // Handle missing productId or cartId
    return new Response('productId or cartId is missing', { status: 400 });
  }
  // Check if the product already exists in the cart
  const existingCartItem = await db.cartItem.findFirst({
    where: {
      productId: productId,
      cartId: cartId,
    },
  });

  if (existingCartItem) {
    // If the product exists, update the quantity
    await db.cartItem.update({
      where: {
        id: existingCartItem.id,
      },
      data: {
        quantity: existingCartItem.quantity + 1, // Increment the quantity
      },
    });
  } else {
    // If the product does not exist, add it to the cart
    await db.cartItem.create({
      data: {
        productId: productId,
        quantity: 1,
        cartId: cartId,
      },
    });
  }

  return redirect('/cart');
}
