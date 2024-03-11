import { Link, useActionData, useFetcher } from '@remix-run/react';
import { useState } from 'react';
import Trash from '~/components/icons/Trash';
import QuantityPicker from '~/components/quantityPicker';
import { action } from '~/routes/cart.$itemId';

export default function CartItemCard({ item }: any) {
  const quantityFetcher = useFetcher();
  const deleteFetcher = useFetcher();
  const isDeleting = deleteFetcher.state !== 'idle';
  // const submit = useSubmit();

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
        <div className="flex flex-col justify-between py-5">
          <div>
            <Link
              key={item.id}
              to={`/products/${item.product.id}`}
              prefetch="intent"
            >
              <h2 className="text-3xl font-semibold">{item.product.name}</h2>
            </Link>
            <h2 className="">{item.product.description}</h2>
            <p className="text-green-500">In Stock</p>
            <quantityFetcher.Form method="post">
              <QuantityPicker
                quantity={quantity}
                setQuantity={setQuantity}
                maxQuantity={20}
                submitOnChange={true}
              />
              <input type="hidden" value={item.id} name="itemId" />
            </quantityFetcher.Form>
            <div>
              {actionData?.errors?.quantity && (
                <em>{actionData?.errors?.quantity}</em>
              )}
            </div>
          </div>
          <deleteFetcher.Form method="delete">
            <button
              type="submit"
              className=" fill-red-500 hover:fill-red-600 text-red-500 hover:text-red-600  rounded-lg font-semibold flex flex-row space-x-1"
              disabled={isDeleting}
            >
              <Trash />
              <input type="hidden" value={item.id} name="itemId" />
              <span>Delete Item</span>
            </button>
          </deleteFetcher.Form>
          <h3 className="font-bold text-2xl sm:block md:hidden">
            ${item.product.price}.00
          </h3>
        </div>
      </div>
      <div className="sm:hidden md:flex">
        <h3 className="font-bold text-2xl">${item.product.price}.00</h3>
      </div>
    </li>
  );
}
