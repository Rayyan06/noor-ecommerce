import { Form, Link, redirect } from '@remix-run/react';
import Button from '~/components/button';

export default function Contact() {
  return (
    <div className="mx-0 md:mx-16 lg:mx-48 flex flex-col gap-3">
      <h1 className="text-3xl">Contact us</h1>
      <Form method="post">
        Email:{' '}
        <Link to="https://gmail.com" className="underline text-blue-500">
          user@gmail.com
        </Link>
        <Button type="submit">CONTACT US</Button>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  return null;
}
