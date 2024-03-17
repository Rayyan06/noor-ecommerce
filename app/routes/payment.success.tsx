import { Link, useLoaderData } from '@remix-run/react';
import Stripe from 'stripe';

export async function loader({ request, params }) {
  const session_id = params.session_id | null;
  console.log(params);

  return session_id;
}
function PaymentSuccess() {
  const sessionId = useLoaderData<typeof loader>();
  return (
    <div className="h-[90vh] flex flex-col items-center justify-center w-full fixed top-0 left-0 bg-white overflow-hidden">
      <h2 className="md:text-3xl"> Your order was successful</h2>
      <p className="my-2">
        Thank you for your order, your payment was successful
      </p>
      <p className="my-2">Your payment session id: {sessionId}</p>
      <Link
        to="/"
        className="bg-black hover:bg-gray-800 rounded-sm text-white py-3 px-3 mt-2"
      >
        Return to home page
      </Link>
    </div>
  );
}

export default PaymentSuccess;
