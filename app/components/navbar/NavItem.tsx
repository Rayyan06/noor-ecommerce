import { NavLink, NavLinkProps } from '@remix-run/react';
import { PropsWithChildren } from 'react';

export default function NavItem({
  children,
  ...props
}: PropsWithChildren<NavLinkProps>) {
  return (
    <li>
      <NavLink
        className={({ isActive, isPending }) =>
          isPending
            ? ''
            : isActive
            ? 'underline hover:text-violet-300'
            : 'hover:text-violet-400'
        }
        {...props}
      >
        {children}
      </NavLink>
    </li>
  );
}
