import { motion } from 'framer-motion';
import type { SharedSectionProps } from '@/types';
import { cn } from '@/lib/utils';

export type LoadingSpinnerProps = SharedSectionProps & {
  fullSection?: boolean;
  label?: string;
};

export function LoadingSpinner({
  className = '',
  title = 'Loading',
  subtitle = '',
  fullSection = false,
  label = 'Loading content',
}: LoadingSpinnerProps) {
  const rootClassName = cn(
    'flex items-center justify-center text-[#1D3557]',
    fullSection ? 'min-h-[50vh] w-full px-6 py-16' : 'inline-flex px-3 py-2',
    className,
  );

  return (
    <div className={rootClassName} role="status" aria-live="polite" aria-label={label}>
      <div className="flex items-center gap-4">
        <motion.div
          className="relative h-10 w-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-[#C9C3A8]" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#E63946] border-r-[#1D3557]" />
          <motion.div
            className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E63946]"
            animate={{ scale: [1, 0.75, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#596579]">
            {title}
          </p>
          {subtitle ? <p className="mt-1 text-sm text-[#596579]">{subtitle}</p> : null}
          <span className="sr-only">{label}</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;