import { Link } from '@remix-run/react';
import {
  PropsWithChildren,
  ButtonHTMLAttributes,
  ComponentType,
  SVGProps,
} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  isSubmitting?: boolean;
  grow?: boolean;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

function Button({
  to,
  children,
  Icon,
  isSubmitting,
  grow = false,
  ...buttonProps
}: PropsWithChildren<ButtonProps>) {
  const styleClasses = `flex items-center justify-center py-2 md:py-3 px-5 bg-violet-400 shadow-md hover:bg-violet-600 font-bold active:bg-violet-700 text-md md:text-lg text-white rounded-xl ${
    grow && 'w-full'
  }`;

  return (
    <>
      {to ? (
        <Link to={to} className={styleClasses}>
          {children}
        </Link>
      ) : (
        <button
          className={`${styleClasses} ${isSubmitting && 'bg-gray-300'}`}
          {...buttonProps}
        >
          {Icon && <Icon width={25} fill="white" />}
          <span className="ml-1">{children}</span>
        </button>
      )}
    </>
  );
}

export default Button;
