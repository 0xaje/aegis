import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../utils.js';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Drawer({ isOpen, onClose, title, description, children, className }: DrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#05060a]/65 backdrop-blur-[3px]"
          />

          {/* Drawer container body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className={cn(
              'fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-slate-800 bg-[#0c0e14] p-6 shadow-2xl flex flex-col gap-6',
              className,
            )}
          >
            {/* Header controls */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-0.5">
                {title && (
                  <h3 className="text-sm font-bold text-slate-100 tracking-tight leading-none">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed mt-0.5">
                    {description}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="rounded-sm opacity-60 transition-opacity hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <X className="h-4.5 w-4.5 text-slate-400 hover:text-slate-200" />
                <span className="sr-only">Close</span>
              </button>
            </div>

            {/* Content view */}
            <div className="flex-1 overflow-y-auto text-xs leading-relaxed text-slate-300 font-sans">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
