import { Link } from '@remix-run/react';

function PaymentSuccess() {
  return (
    <div className="h-[90vh] flex flex-col items-center justify-center w-full fixed top-0 left-0 bg-white overflow-hidden">
      <h2 className="md:text-3xl"> Your order was successful</h2>
      <p className="my-2">
        Thank you for your order, your payment was successful
      </p>
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
