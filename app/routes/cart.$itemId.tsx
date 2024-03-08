import { ActionFunctionArgs, json } from '@remix-run/node';
import { getSession } from '~/sessions';
import { db } from '~/utils/db.server';

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  const quantity = Number(formData.get('quantity'));
  const session = await getSession(request.headers.get('Cookie'));
  const cartId = await session.get('cartId');
  const itemId = params.itemId;

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
      quantity: quantity, // Set the quantity
    },
  });

  return json({ success: true });
}
