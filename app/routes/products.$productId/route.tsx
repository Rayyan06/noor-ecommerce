import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import QuantityPicker from '~/components/quantityPicker';
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
  const actionData = useActionData<typeof action>();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col items-center md:items-start md:flex-row justify-center m-12 md:m-16 lg:m-24">
      <div className="max-w-96 md:mr-20">
        <img src={`images/${data.product.imageName}`} alt={data.product.name} />
      </div>
      <div className="flex flex-col p-3 space-y-3 mt-3 md:mt-0 md:w-2/5 justify-center">
        <h1 className="text-5xl font-serif">{data.product.name}</h1>
        <h3 className="text-lg">{data.product.description}</h3>
        <h4 className="text-5xl font-bold">${data.product.price}</h4>
        <Form method="post">
          <label className="font-semibold text-lg" htmlFor="quantity">
            Select Quantity
          </label>
          <div className="flex items-center mt-2">
            <QuantityPicker
              quantity={quantity}
              setQuantity={setQuantity}
              maxQuantity={20}
            />

            <div>
              {actionData?.errors?.quantity && (
                <em>{actionData?.errors?.quantity}</em>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-black text-white p-3 font-bold hover:bg-gray-500 mt-5"
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

  // Get the quantity from the formData
  const formData = await request.formData();
  const quantity = Number(formData.get('quantity'));

  interface Error {
    quantity?: string;
  }
  const errors: Error = {};

  if (quantity < 1) {
    errors.quantity = 'Quantity is less than 1';
  }

  if (Object.keys(errors).length > 0) return json({ errors });

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
        quantity: existingCartItem.quantity + quantity, // Increment the quantity
      },
    });
  } else {
    // If the product does not exist, add it to the cart
    await db.cartItem.create({
      data: {
        productId: productId,
        quantity: quantity,
        cartId: cartId,
      },
    });
  }

  return redirect('/cart');
}
