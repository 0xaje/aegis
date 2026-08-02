import * as React from 'react';
import { motion } from 'framer-motion';

export default function Settings() {
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-xl w-full max-w-3xl"
    >
      <div className="glass-card rounded-xl p-lg flex flex-col gap-lg border-l-4 border-l-primary">
        <div className="flex justify-between items-center border-b border-outline-variant/10 pb-md">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Network &amp; Enclave Setup
            </h2>
            <p className="text-body-sm text-on-surface-variant">
              Configure connection parameters for FTSOv2 price feeds and TEE enclaves.
            </p>
          </div>
          <span className="px-md py-xs rounded-full bg-tertiary-container/20 text-tertiary font-mono-data text-label-caps uppercase border border-tertiary/30">
            Nodes Online
          </span>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-lg">
          {/* Input 1 */}
          <div className="flex flex-col gap-xs">
            <label className="text-label-caps text-on-surface-variant uppercase font-semibold font-mono-data">
              Flare Coston2 RPC Gateway URL
            </label>
            <input
              type="url"
              defaultValue="https://coston2-api.flare.network/ext/C/rpc"
              required
              className="bg-surface-container border border-outline-variant/30 rounded-lg p-md text-body-sm text-on-surface outline-none w-full focus:border-primary font-mono-data transition-colors"
            />
          </div>

          {/* Input 2 */}
          <div className="flex flex-col gap-xs">
            <label className="text-label-caps text-on-surface-variant uppercase font-semibold font-mono-data">
              TEE Hardware Enclave Endpoint
            </label>
            <input
              type="url"
              defaultValue="http://localhost:8080"
              required
              className="bg-surface-container border border-outline-variant/30 rounded-lg p-md text-body-sm text-on-surface outline-none w-full focus:border-primary font-mono-data transition-colors"
            />
          </div>

          {/* Input 3 */}
          <div className="flex flex-col gap-xs">
            <label className="text-label-caps text-on-surface-variant uppercase font-semibold font-mono-data">
              StrategyRegistry Contract Address (Coston2)
            </label>
            <input
              type="text"
              defaultValue="0x1D8F7CA53789d4BBa65a9530de7bd0709d005fE4"
              required
              className="bg-surface-container border border-outline-variant/30 rounded-lg p-md text-body-sm text-on-surface outline-none w-full focus:border-primary font-mono-data transition-colors"
            />
          </div>

          {savedSuccess && (
            <div className="p-md bg-tertiary-container/20 border border-tertiary/30 rounded-lg text-tertiary text-body-sm font-mono-data flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span>Configuration successfully saved to local enclave cache.</span>
            </div>
          )}

          <div className="flex justify-end gap-md pt-md border-t border-outline-variant/10">
            <button
              type="submit"
              className="bg-primary text-on-primary font-title-sm text-body-sm px-xl py-md rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20 cursor-pointer"
            >
              Save Configuration Options
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
