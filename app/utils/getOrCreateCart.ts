import { json } from '@remix-run/node';
import { commitSession, getSession } from '~/sessions';
import { db } from './db.server';

export async function getOrCreateCart(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('cartId')) {
    const cartId = session.get('cartId');

    return json({ cartId });
  }
  const cart = await db.cart.create({});

  session.set('cartId', cart.id);

  return json(
    { cartId: cart.id },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  );
}
