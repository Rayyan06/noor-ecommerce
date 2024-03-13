import { Link } from '@remix-run/react';

export default function Footer() {
  return (
    <section className="h-60 flex flex-row items-center justify-around p-5 bg-gray-200 mt-auto">
      <div>
        <h1 className="font-serif italic text-3xl">NoorHadia</h1>
      </div>
      <div className="grid grid-cols-2 gap-x-10 underline">
        <Link to="products">Shop</Link>
        <Link to="contact">Contact</Link>
        <Link to="about">About</Link>
      </div>
    </section>
  );
}
