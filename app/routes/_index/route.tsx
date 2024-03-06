import { LoaderFunctionArgs, json } from '@remix-run/node';
import Card from './card';
import { commitSession, getSession } from '~/sessions';
import { useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';

export async function loader({ request }: LoaderFunctionArgs) {
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
export default function IndexRoute() {
  const { cartId } = useLoaderData<typeof loader>();

  return (
    <div className="mx-36 space-y-10">
      <Card mainText="Browse our latest products" buttonText="Shop Now" />
      <Card mainText="See more" buttonText="Shop Now" />
    </div>
  );
}
