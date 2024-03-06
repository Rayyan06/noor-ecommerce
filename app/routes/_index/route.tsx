import { LoaderFunctionArgs, json } from '@remix-run/node';
import Card from './card';
import { commitSession, getSession } from '~/sessions';
import { useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';

export default function IndexRoute() {
  return (
    <div className="mx-36 space-y-10">
      <Card mainText="Browse our latest products" buttonText="Shop Now" />
      <Card mainText="See more" buttonText="Shop Now" />
    </div>
  );
}
