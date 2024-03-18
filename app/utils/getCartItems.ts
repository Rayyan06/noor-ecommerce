import { Session } from '@vercel/remix';
import { SessionData, SessionFlashData } from '~/sessions';
import { db } from './db.server';
import type { CartItem } from '~/utils/interface';

export default async function getCartItems(
  session: Session<SessionData, SessionFlashData>
): Promise<CartItem[]> {
  const cartId = session.get('cartId');
  return await db.cartItem.findMany({
    where: {
      cartId: cartId,
    },
    include: {
      product: true,
    },
  });
}
