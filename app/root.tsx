import type {
  MetaFunction,
  LinksFunction,
  LoaderFunctionArgs,
} from '@remix-run/node';
import {
  Outlet,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  json,
  // useRouteError,
  // isRouteErrorResponse,
} from '@remix-run/react';

import '~/styles/tailwind.css';

import Navbar from './components/navbar/navbar';
import Footer from './components/footer';
import { db } from './utils/db.server';
import { getSession } from './sessions';
import createCart from '~/utils/createCart';
import { useState } from 'react';
// import { ReactNode } from 'react';
// import type { PropsWithChildren } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Art Ecommerce ' },
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Best Art website' },
  ];
};

export const links: LinksFunction = () => [];

// export function Layout({ children }: PropsWithChildren) {
//   return (
//     <html lang="en">
//       <head>
//         <Meta />
//         <Links />
//       </head>
//       <body>
//         <header>
//           <Navbar />
//         </header>
//         {children}
//         <ScrollRestoration />
//         <LiveReload />
//       </body>
//     </html>
//   );
// }

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('cartId')) {
    const cartId = session.get('cartId') || 0;

    const totalQuantity = await db.cartItem.aggregate({
      where: {
        cartId: cartId,
      },
      _sum: {
        quantity: true,
      },
    });

    return json({ cartItemCount: totalQuantity._sum.quantity ?? 0 });
  }

  // If we don't have the cartId, we create a new Cart
  return json(
    { cartItemCount: 0 },
    {
      headers: {
        'Set-Cookie': await createCart(session),
      },
    }
  );
}

export default function App() {
  const { cartItemCount } = useLoaderData<typeof loader>();
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-vh flex flex-col">
        <header>
          <Navbar
            cartItemCount={cartItemCount}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </header>
        <main>
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <footer className="mt-auto">
          <Footer />
        </footer>
      </body>
    </html>
  );
}

// export function ErrorBoundary() {
//   const error = useRouteError();

//   if (isRouteErrorResponse(error)) {
//     return (
//       <>
//         <h1>
//           {error.status} {error.statusText}
//         </h1>
//         <p>{error.data}</p>
//       </>
//     );
//   } else if (error instanceof Error) {
//     return (
//       <>
//         <h1>Error</h1>
//         <p>{error.message}</p>
//         <p>The stack trace is:</p>
//         <pre>{error.stack}</pre>
//       </>
//     );
//   } else {
//     return <h1>Unknown Error</h1>;
//   }
// }
