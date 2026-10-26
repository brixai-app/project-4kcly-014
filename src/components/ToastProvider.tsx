import React from 'react';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';

export type ToastProviderProps = {
  className?: string;
};

export function ToastProvider({ className = '' }: ToastProviderProps) {
  return (
    <Toaster
      position="bottom-right"
      duration={4000}
      richColors
      closeButton
      toastOptions={{
        className: cn('font-sans', className),
        style: {
          background: '#FFFFFF',
          color: '#17191C',
          border: '1px solid #D7DCE2',
          borderRadius: '10px',
        },
      }}
      expand
      visibleToasts={4}
      gap={12}
      offset={16}
      swipeDirections={['right', 'left']}
    />
  );
}

export default ToastProvider;