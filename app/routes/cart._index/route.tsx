import {
  ActionFunctionArgs,
  json,
  type LoaderFunctionArgs,
} from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { getSession } from '~/sessions';
import { db } from '~/utils/db.server';
import CartItemCard from './cartItemCard';
import createCart from '~/utils/createCart';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const cartId = session.get('cartId');
  if (!cartId) createCart(session);
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cartId,
    },
    include: {
      product: true,
    },
  });

  let subTotal: number = 0;
  let itemCount = 0;

  cartItems.forEach((cartItem) => {
    const { quantity, product } = cartItem;
    subTotal += quantity * product.price;
    itemCount += quantity;
  });
  return json({ subTotal, itemCount, cartItems });
}

export default function Cart() {
  const { subTotal, cartItems, itemCount } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col sm:mx-6 mx-12 lg:mx-24 xl:mx-36">
      <div className="flex flex-row w-full justify-between items-center">
        <h1 className="text-5xl mb-4 font-serif">My Cart</h1>
        <h3 className="hidden md:block text-xl font-serif">Price</h3>
      </div>
      <hr />

      <div className="flex flex-col mt-3">
        {cartItems.length > 0 ? (
          <>
            <ul className="flex flex-col mt-5">
              {cartItems.map((item) => {
                return <CartItemCard key={item.id} item={item} />;
              })}
              <hr className="mt-10" />
              <div className="flex justify-end items-center font-serif mt-2">
                <h2 className="text-2xl">{`Subtotal ( ${itemCount} item${
                  itemCount > 1 ? 's' : ''
                } ): $${subTotal}`}</h2>
              </div>
            </ul>
            <div className="mt-10 flex justify-end">
              <Form method="post" action="/checkout">
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-5 rounded-sm text-xl"
                >
                  CHECKOUT
                </button>
              </Form>
            </div>
          </>
        ) : (
          <h1 className="text-2xl h-96">
            Your cart is empty.{' '}
            <Link
              to="/products"
              prefetch="render"
              className="underline hover:text-blue-400"
            >
              Find Products
            </Link>
          </h1>
        )}
      </div>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const session = await getSession(request.headers.get('Cookie'));
  const cartId = await session.get('cartId');
  const itemId = String(formData.get('itemId'));

  console.log(`itemId: ${itemId}`);

  if (request.method === 'DELETE') {
    await db.cartItem.delete({ where: { id: itemId, cartId: cartId } });
    console.log('Deleting Item...');

    return json({ success: true });
  }

  const quantity = Number(formData.get('quantity'));

  interface Error {
    quantity?: string;
  }
  const errors: Error = {};

  if (quantity < 1) {
    errors.quantity = 'Quantity is less than 1';
  }

  if (Object.keys(errors).length > 0) return json({ errors }, { status: 404 });

  await db.cartItem.update({
    where: {
      id: itemId,
      cartId: cartId,
    },
    data: {
      quantity: Number(quantity), // Set the quantity
    },
  });

  return json({ success: true });
}
