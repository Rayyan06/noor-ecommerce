import type { LoaderFunctionArgs } from '@remix-run/node';
import { db } from '~/utils/db.server';

/*
export async function loader({ request }: LoaderFunctionArgs) {
  const cartItems = await db.cart.findMany({
    where: {
      cartId: 
    }
  });
}
*/

export default function Cart() {
  return (
    <div className="mx-36">
      <h1 className="text-3xl">Your cart is empty</h1>
    </div>
  );
}
