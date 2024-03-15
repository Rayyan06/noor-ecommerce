import { MouseEventHandler, ReactNode } from 'react';
import Done from './icons/Done';
import Close from './icons/Close';

type InfoMessageProps = {
  isVisible: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};
function InfoMessage({ children, isVisible, onClose }: InfoMessageProps) {
  if (isVisible) {
    return (
      <div className="flex flex-row px-3 py-3 w-full rounded-md bg-green-200 items-center justify-between animate-fadeIn">
        {children}
        <button onClick={onClose}>
          <Close />
        </button>
      </div>
    );
  } else {
    return <></>;
  }
}

export default InfoMessage;
