import { Stripe } from 'stripe';
import { CartItem } from './interface';

export function getDomainUrl(request: Request) {
  // get the host (example:localhost)
  const host =
    request.headers.get('X-Forward-Host') ?? request.headers.get('host');
  if (!host) throw new Error("Couldn't find the URL");
  const protocol = host.includes('localhost') ? 'http' : 'https';

  return `${protocol}://${host}`;
}

export const getStripeSession = async (
  items: Array<CartItem>,
  domainUrl: string
): Promise<string> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16',
    typescript: true,
  });

  const lineItems = items.map((item) => {
    return {
      price: item.product!.stripeProductId,
      quantity: item.quantity,
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: 20,
      },
    };
  });

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: lineItems,
    success_url: `${domainUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainUrl}/payment/cancel`,
  });
  return session.url as string;
};
