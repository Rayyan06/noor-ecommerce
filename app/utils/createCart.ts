import { commitSession, getSession } from '~/sessions';
import { db } from './db.server';

export default async function createCart(session) {
  const cart = await db.cart.create({});

  session.set('cartId', cart.id);

  return commitSession(session);
}
