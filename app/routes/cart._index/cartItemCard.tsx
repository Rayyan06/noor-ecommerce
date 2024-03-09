import { ActionFunctionArgs, json } from '@remix-run/node';
import { Link, useActionData, useFetcher } from '@remix-run/react';
import { useState } from 'react';
import QuantityPicker from '~/components/quantityPicker';
//import { action } from '~/routes/cart.$itemId';
import { getSession } from '~/sessions';
import { db } from '~/utils/db.server';

export default function CartItemCard({ item }: any) {
  const fetcher = useFetcher();
  const [quantity, setQuantity] = useState(item.quantity);
  const actionData = useActionData<typeof action>();

  return (
    <li
      className="flex flex-row items-start justify-between py-5"
      key={item.id}
    >
      <div className="flex flex-row space-x-10">
        <Link
          key={item.id}
          to={`/products/${item.product.id}`}
          prefetch="intent"
        >
          <img
            src={`products/images/${item.product.imageName}`}
            alt="product"
            className="max-w-72"
          />
        </Link>
        <div className="flex flex-col">
          <Link
            key={item.id}
            to={`/products/${item.product.id}`}
            prefetch="intent"
          >
            <h2 className="text-3xl font-semibold">{item.product.name}</h2>
          </Link>
          <h2 className="">{item.product.description}</h2>
          <p className="text-green-500">In Stock</p>
          <fetcher.Form method="post" action={item.id}>
            <QuantityPicker
              quantity={quantity}
              setQuantity={setQuantity}
              submitOnChange={true}
            />
            <input type="hidden" value={item.id} />
          </fetcher.Form>
          <div>
            {actionData?.errors?.quantity && (
              <em>{actionData?.errors?.quantity}</em>
            )}
          </div>
        </div>
      </div>
      <div className="flex">
        <h3 className="font-bold text-2xl">${item.product.price}.00</h3>
      </div>
    </li>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const quantity = Number(formData.get('quantity'));
  const session = await getSession(request.headers.get('Cookie'));
  const cartId = await session.get('cartId');
  const itemId = String(formData.get('itemId'));

  if (!itemId) return new Response('Item does not exist', { status: 404 });

  interface Error {
    quantity?: string;
  }
  const errors: Error = {};

  if (quantity < 1) {
    errors.quantity = 'Quantity is less than 1';
  } else if (quantity > 20) {
    errors.quantity = 'Quantity is greater than 20';
  }

  if (Object.keys(errors).length > 0) return json({ errors }, { status: 404 });

  await db.cartItem.update({
    where: {
      id: itemId,
      cartId: cartId,
    },
    data: {
      quantity: quantity, // Set the quantity
    },
  });

  return json({ success: true });
}
