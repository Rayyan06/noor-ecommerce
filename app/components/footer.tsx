import { Link } from '@remix-run/react';

export default function Footer() {
  return (
    <section className="h-24 md:h-36 lg:h-60 flex flex-row items-center justify-around p-5 bg-violet-200 mt-auto">
      <div>
        <Link className="hover:text-violet-500" to="/">
          <h1 className="font-serif italic text-3xl">NoorHadia</h1>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-x-10 underline">
        <Link className="hover:text-violet-500" to="products">
          Shop
        </Link>
        <Link className="hover:text-violet-500" to="contact">
          Contact
        </Link>
      </div>
    </section>
  );
}
