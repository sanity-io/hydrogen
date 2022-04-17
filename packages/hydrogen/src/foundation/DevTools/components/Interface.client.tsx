import React from 'react';
import {CloseIcon, HydrogenIcon} from './icons';

interface Props {
  open?: boolean;
  title?: string | React.ReactNode;
  onClose?: () => void;
  onOpen?: () => void;
  activator?: React.ReactElement;
  children?: React.ReactNode;
}

export function Interface({
  open,
  onOpen,
  activator,
  children,
  ...headerProps
}: Props) {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        left: '100%',
        width: '100%',
        maxWidth: '300px',
        bottom: open ? 0 : '-2em',
        borderRadius: open ? 0 : '2em',
        top: '100%',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: open ? '75%' : '4em',
        transform: open
          ? 'translate(-300px, -100%)'
          : 'translate(-300px, -5em)',
      }}
    >
      <div
        style={{
          overflow: 'scroll',
          color: 'white',
          height: '100%',
          padding: '2em',
          background: 'rgba(0, 0, 0, 0.95)',
          borderRadius: open ? 0 : '2em',
        }}
      >
        {children}
      </div>

      <button
        style={{
          position: 'absolute',
          top: '0.35em',
          right: '1em',
          overflow: 'hidden',
          zIndex: 100,
        }}
        onClick={() => {
          console.log('yo');
          if (onOpen) {
            onOpen();
          }
        }}
      >
        {open ? <CloseIcon /> : <HydrogenIcon />}
      </button>
    </div>
  );
}
