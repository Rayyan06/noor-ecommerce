import type { ActionFunctionArgs, LoaderFunctionArgs } from '@vercel/remix';
import { json } from '@vercel/remix';
import { Form, Link, useActionData, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import Button from '~/components/button';
import ShoppingCartOutlined from '~/components/icons/ShoppingCartOutlined';
import InfoMessage from '~/components/infoMessage';
import QuantityPicker from '~/components/quantityPicker';
import { getSession } from '~/sessions';

import { db } from '~/utils/db.server';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const product = await db.product.findUnique({
    where: { id: params.productId },
  });

  if (!product) {
    throw json('Product not found', { status: 404 });
  }

  return json({ product });
};

export default function ProductDetail() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [quantity, setQuantity] = useState(1);

  // Is the dialog box visible?
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  return (
    <div className="mx-8 md:mx-12 lg:mx-24 mb-24 pt-8 lg:pt-0">
      <div className="h-10">
        {actionData?.success && (
          <InfoMessage
            isVisible={isMessageVisible}
            onClose={() => setIsMessageVisible(false)}
          >
            <ShoppingCartOutlined />
            <span className="text-md">
              {actionData.quantity} {data.product.name}
              {actionData.quantity > 1 ? 's were ' : ' was '} successfully added
              to your cart.{' '}
              <Link to="/cart" className="underline hover:text-violet-300">
                {' '}
                View Cart
              </Link>
            </span>
          </InfoMessage>
        )}
      </div>
      <div className="flex flex-col items-center md:items-start md:flex-row justify-center mt-8">
        <div className="md:max-w-96 md:mr-10 lg:mr-20">
          <img
            src={`images/${data.product.imageName}`}
            alt={data.product.name}
          />
        </div>
        <div className="flex flex-col p-5 md:p-0 space-y-3 mt-3 md:mt-0 md:w-2/5 justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif">
            {data.product.name}
          </h1>
          <h3 className="text-md md:text-lg">{data.product.description}</h3>
          <h4 className="text-3xl md:text-5xl font-semibold">
            ${data.product.price}
          </h4>
          <Form method="post">
            <label className="font-semibold text-lg" htmlFor="quantity">
              Select Quantity
            </label>
            <div className="flex items-center mt-2 mb-5">
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
            <div className="flex w-full md:w-1/2">
              <Button
                type="submit"
                onClick={() => setIsMessageVisible(true)}
                grow={true}
              >
                ADD TO CART
              </Button>
            </div>
          </Form>
        </div>
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

  return json({ success: true, quantity: quantity }, { status: 201 });
}
