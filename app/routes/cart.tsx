import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getSession } from '~/sessions';
import { db } from '~/utils/db.server';
import ProductCard from './products._index/productCard';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const cartId = session.get('cartId');
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cartId,
    },
    include: {
      product: true,
    },
  });
  return json(cartItems);
}

export default function Cart() {
  const cartItems = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col container mx-24">
      <h1 className="text-5xl mb-4">My Cart</h1>
      <hr />

      <div className="flex flex-col mt-3">
        {cartItems.length > 0 ? (
          <>
            <ul className="flex flex-col shadow-lg space-y-10 rounded-xl p-5 mt-10">
              {cartItems.map((item) => {
                return (
                  <li className="flex flex-row items-center" key={item.id}>
                    <img
                      src="https://dummyimage.com/300x300/000/fff"
                      alt="product"
                    />
                    <div className="flex flex-col p-5">
                      <h2 className="text-3xl font-semibold">
                        {item.product.name}
                      </h2>

                      <h2 className="">{item.product.description}</h2>
                      <p className="text-green-500">In Stock</p>
                      <p>{item.quantity}</p>
                    </div>
                    <div className="flex">
                      <p>{item.product.price}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 flex justify-end">
              <button className="bg-yellow-300 py-2 px-5 rounded-lg text-xl">
                Checkout
              </button>
            </div>
          </>
        ) : (
          <h1 className="text-5xl">Your cart is empty</h1>
        )}
      </div>
    </div>
  );
}
