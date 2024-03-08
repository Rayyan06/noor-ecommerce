import { Link, useActionData, useFetcher } from '@remix-run/react';
import { useState } from 'react';
import QuantityPicker from '~/components/quantityPicker';
import { action } from '~/routes/cart.$itemId';

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
