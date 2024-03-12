import { ActionFunctionArgs, json } from '@remix-run/node';
import { getSession } from '~/sessions';

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return json({ message: 'Method not allowed' }, { status: 405 });
  }

  const session = await getSession('cartId');
  const cartId = await get;
}
