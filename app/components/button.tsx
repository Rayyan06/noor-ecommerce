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
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

function Button({
  to,
  children,
  Icon,
  isSubmitting,
  ...buttonProps
}: PropsWithChildren<ButtonProps>) {
  const styleClasses =
    'flex items-center py-3 px-5 bg-blue-400 shadow-md hover:bg-blue-600 font-bold active:bg-blue-700 text-lg text-white rounded-xl';

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
