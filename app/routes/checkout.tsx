import { ActionFunctionArgs, json, redirect } from '@remix-run/node';
import { getDomainUrl, getStripeSession } from '~/utils/stripe.server';
import { getSession } from '~/sessions';
import getCartItems from '~/utils/getCartItems';

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return json({ message: 'Method not allowed' }, { status: 405 });
  }

  const session = await getSession(request.headers.get('Cookie'));
  const items = await getCartItems(session);

  const stripeRedirectUrl = await getStripeSession(
    items,
    getDomainUrl(request)
  );
  return redirect(stripeRedirectUrl);
}
