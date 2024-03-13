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
          isPending ? '' : isActive ? 'underline' : ''
        }
        {...props}
      >
        {children}
      </NavLink>
    </li>
  );
}
