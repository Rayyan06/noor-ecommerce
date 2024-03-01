import type { MetaFunction, LinksFunction } from '@remix-run/node';
import {
  LiveReload,
  Outlet,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react';

import stylesheet from './tailwind.css';

import Navbar from './components/navbar';
import { ReactNode } from 'react';
import type { PropsWithChildren } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Art Ecommerce ' },
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Best Art website' },
  ];
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <Navbar />
        </header>
        {children}
        <ScrollRestoration />
        <LiveReload />
      </body>
    </html>
  );
}
export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  } else if (error instanceof Error) {
    return (
      <>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
