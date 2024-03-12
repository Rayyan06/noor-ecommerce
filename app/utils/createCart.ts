import { commitSession, getSession } from '~/sessions';
import type { SessionData, SessionFlashData } from '~/sessions';
import { db } from './db.server';
import { Session } from '@remix-run/node';

export default async function createCart(
  session: Session<SessionData, SessionFlashData>
) {
  const cart = await db.cart.create({});

  session.set('cartId', cart.id);

  return commitSession(session);
}
