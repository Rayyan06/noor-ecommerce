import { Link } from '@remix-run/react';

export default function Contact() {
  return (
    <div className="mx-0 md:mx-16 lg:mx-48 flex flex-col gap-3">
      <h1 className="text-3xl">Contact us</h1>
      <ul>
        <li>
          Email:{' '}
          <Link to="https://gmail.com" className="underline text-blue-500">
            user@gmail.com
          </Link>
        </li>
      </ul>
    </div>
  );
}
