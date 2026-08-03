import * as React from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function Execution() {
  const { isConnected } = useAccount();

  // Real Wagmi contract transaction hooks
  const {
    writeContract,
    data: txHash,
    isPending: isWalletPending,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  const {
    isLoading: isTxConfirming,
    isSuccess: isTxSuccess,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Calculate active step index (0 = Step 1: Wallet Approval, 1 = Step 2: Network Broadcast, 2 = Step 3: Finality)
  const activeStep = React.useMemo(() => {
    if (isTxSuccess) return 2; // Step 3: Complete
    if (txHash && isTxConfirming) return 1; // Step 2: Mining
    if (isWalletPending) return 0; // Step 1: Wallet signature
    return 0; // Default Step 1
  }, [isWalletPending, txHash, isTxConfirming, isTxSuccess]);

  const handleExecute = () => {
    resetWrite();
    writeContract({
      address: '0x1D8F7CA53789d4BBa65a9530de7bd0709d005fE4',
      abi: [
        {
          type: 'function',
          name: 'deposit',
          inputs: [],
          outputs: [],
          stateMutability: 'payable',
        },
      ],
      functionName: 'deposit',
      value: 0n,
    });
  };

  const steps = [
    {
      id: 1,
      title: 'Wallet Signature Authorization',
      action: 'Requesting cryptographic signature from connected Web3 wallet.',
      why: 'Verifies private key ownership and authorizes the execution payload on Flare Coston2.',
      duration: '~5–15 seconds (waiting for user wallet confirmation)',
      getStatus: () => {
        if (writeError) return { label: 'Signature Rejected', state: 'ERROR' };
        if (isWalletPending) return { label: 'Awaiting Signature...', state: 'ACTIVE' };
        if (txHash) return { label: 'Signature Confirmed', state: 'COMPLETE' };
        return { label: 'Ready for Authorization', state: 'IDLE' };
      },
    },
    {
      id: 2,
      title: 'On-Chain Network Dispatch & Execution',
      action: 'Broadcasting payload to Flare Coston2 RPC nodes and execution registry.',
      why: 'Submits strategy transaction to StrategyRegistry contract (0x1D8F7CA53789d4BBa65a9530de7bd0709d005fE4).',
      duration: '~1–3 seconds (Flare Coston2 fast block times)',
      getStatus: () => {
        if (receiptError) return { label: 'Execution Failed', state: 'ERROR' };
        if (txHash && isTxConfirming) return { label: 'Broadcasting & Mining...', state: 'ACTIVE' };
        if (isTxSuccess) return { label: 'Mined in Block', state: 'COMPLETE' };
        return { label: 'Awaiting Step 1', state: 'IDLE' };
      },
    },
    {
      id: 3,
      title: 'Block Finality & Decision Passport Anchor',
      action: 'Verifying block finality and generating immutable on-chain record.',
      why: 'Anchors the cryptographic execution attestation on Flare Coston2 Testnet with verifiable transaction receipt.',
      duration: 'Sub-second finality',
      getStatus: () => {
        if (isTxSuccess) return { label: 'Attestation Anchored On-Chain', state: 'COMPLETE' };
        return { label: 'Awaiting Confirmation', state: 'IDLE' };
      },
    },
  ];

  return (
    <div className="flex flex-col gap-xl w-full max-w-4xl mx-auto py-md">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md border-b border-white/10 pb-md">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] uppercase tracking-wider mb-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
            <span>Transparent Transaction Pipeline</span>
          </div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">
            Confidential Strategy Execution
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Real-time status tracking for smart contract transactions on Flare Coston2 Testnet.
          </p>
        </div>
      </div>

      {isConnected ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-xl w-full"
        >
          {/* Main Action Trigger Header Card */}
          <div className="glass-card rounded-xl p-lg border-l-4 border-l-cyan-400 bg-slate-900/80 flex flex-col md:flex-row items-center justify-between gap-md border border-white/10 shadow-xl">
            <div className="space-y-1.5 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Target Contract
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Flare Coston2 (Chain ID 114)
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-white">StrategyRegistry.sol</h3>
              <p className="text-xs text-slate-400 font-mono truncate max-w-md bg-slate-950/60 p-2 rounded-lg border border-white/5">
                0x1D8F7CA53789d4BBa65a9530de7bd0709d005fE4
              </p>
            </div>
            <button
              onClick={handleExecute}
              disabled={isWalletPending || isTxConfirming}
              className={`px-6 py-3 rounded-xl font-sans font-bold text-xs transition-all cursor-pointer shadow-lg w-full md:w-auto shrink-0 ${
                isWalletPending || isTxConfirming
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-white/10'
                  : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white hover:brightness-110 active:scale-[0.98] shadow-cyan-500/20 border border-cyan-400/30'
              }`}
            >
              {isWalletPending
                ? 'Confirming Signature in Wallet...'
                : isTxConfirming
                  ? 'Broadcasting Transaction...'
                  : 'Initiate Strategy Execution'}
            </button>
          </div>

          {/* Error Banner */}
          {(writeError || receiptError) && (
            <div className="glass-card rounded-xl p-lg bg-error-container/20 border border-error/30 flex flex-col gap-sm text-error">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined">error</span>
                <h4 className="font-bold text-body-md">Transaction Execution Stopped</h4>
              </div>
              <p className="text-body-sm font-mono-data">
                {writeError?.message ||
                  receiptError?.message ||
                  'Transaction was rejected or failed on-chain.'}
              </p>
              <button
                onClick={handleExecute}
                className="w-fit px-lg py-xs rounded-lg bg-error text-on-error font-semibold text-body-sm mt-xs hover:brightness-110 cursor-pointer"
              >
                Retry Execution
              </button>
            </div>
          )}

          {/* Success Banner */}
          {isTxSuccess && txHash && (
            <div className="glass-card rounded-2xl p-xl bg-tertiary-container/20 border border-tertiary/40 flex flex-col gap-md">
              <div className="flex items-center gap-md text-tertiary">
                <span className="material-symbols-outlined text-[32px]">check_circle</span>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    Execution Confirmed On-Chain!
                  </h3>
                  <p className="text-body-sm text-on-surface-variant">
                    Transaction successfully mined on Flare Coston2 Testnet.
                  </p>
                </div>
              </div>

              <div className="p-md rounded-xl bg-surface-container border border-outline-variant/20 font-mono-data text-body-sm flex flex-col gap-xs">
                <span className="text-label-caps text-on-surface-variant uppercase">
                  Transaction Hash
                </span>
                <a
                  href={`https://coston2-explorer.flare.network/tx/${txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-primary hover:underline break-all flex items-center gap-xs"
                >
                  <span>{txHash}</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
            </div>
          )}

          {/* Step-by-Step Single-Active Pipeline Cards */}
          <div className="flex flex-col gap-md">
            {steps.map((step, idx) => {
              const statusInfo = step.getStatus();
              const isActive = activeStep === idx && !isTxSuccess;
              const isDone = isTxSuccess || (idx === 0 && txHash);

              return (
                <div
                  key={step.id}
                  className={`glass-card rounded-xl transition-all duration-300 overflow-hidden border ${
                    isActive
                      ? 'border-primary shadow-xl ring-1 ring-primary/30 bg-surface-container'
                      : isDone
                        ? 'border-tertiary/40 bg-surface-container-low'
                        : 'border-outline-variant/20 bg-surface-container-lowest opacity-75'
                  }`}
                >
                  <div className="p-lg flex flex-col gap-md">
                    {/* Header Row */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-md">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-body-sm font-mono-data border ${
                            isDone
                              ? 'bg-tertiary-container/30 text-tertiary border-tertiary/40'
                              : isActive
                                ? 'bg-primary-container text-on-primary-container border-primary/40'
                                : 'bg-surface-container-high text-on-surface-variant border-outline-variant/30'
                          }`}
                        >
                          {isDone ? <Check className="w-3.5 h-3.5" /> : step.id}
                        </div>
                        <div>
                          <h4 className="font-headline-md text-title-sm text-on-surface font-semibold">
                            {step.title}
                          </h4>
                          <span className="text-body-sm text-on-surface-variant font-mono-data text-[12px]">
                            {step.duration}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`px-md py-xs rounded-full font-mono-data text-label-caps uppercase border ${
                          statusInfo.state === 'COMPLETE'
                            ? 'bg-tertiary-container/20 text-tertiary border-tertiary/30'
                            : statusInfo.state === 'ACTIVE'
                              ? 'bg-primary-container/20 text-primary border-primary/30 animate-pulse'
                              : statusInfo.state === 'ERROR'
                                ? 'bg-error-container/20 text-error border-error/30'
                                : 'bg-surface-container text-on-surface-variant border-outline-variant/20'
                        }`}
                      >
                        {statusInfo.label}
                      </span>
                    </div>

                    {/* Single Active Step Expanded Explanations */}
                    {(isActive || isDone) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="pt-md border-t border-outline-variant/10 grid grid-cols-1 md:grid-cols-2 gap-md text-body-sm font-sans"
                      >
                        <div className="p-md rounded-lg bg-surface-container-low border border-outline-variant/10 space-y-xs">
                          <span className="font-bold text-primary block text-label-caps uppercase font-mono-data">
                            Current Action
                          </span>
                          <p className="text-on-surface-variant">{step.action}</p>
                        </div>
                        <div className="p-md rounded-lg bg-surface-container-low border border-outline-variant/10 space-y-xs">
                          <span className="font-bold text-tertiary block text-label-caps uppercase font-mono-data">
                            Why It Matters
                          </span>
                          <p className="text-on-surface-variant">{step.why}</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      ) : (
        /* Guidance-Driven Empty State: No Active Execution */
        <div className="glass-card rounded-2xl p-xl text-center flex flex-col items-center gap-lg max-w-xl mx-auto my-xl border-l-4 border-l-primary">
          <div className="w-16 h-16 rounded-2xl bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[36px]">play_circle</span>
          </div>
          <div className="space-y-xs">
            <span className="text-label-caps uppercase text-primary font-mono-data tracking-widest">
              No Active Execution
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Connect Wallet to Execute On-Chain Strategy
            </h2>
          </div>
          <div className="p-md rounded-xl bg-surface-container-low border border-outline-variant/10 text-body-sm text-on-surface-variant space-y-sm text-left font-sans">
            <div>
              <strong className="text-on-surface block font-mono-data text-label-caps uppercase text-primary">
                Why is this screen empty?
              </strong>
              <span>
                The strategy execution pipeline requires an authorized Web3 wallet connection to
                sign and broadcast transaction payloads targeting StrategyRegistry.sol on Flare
                Coston2 Testnet.
              </span>
            </div>
            <div>
              <strong className="text-on-surface block font-mono-data text-label-caps uppercase text-tertiary">
                What should you do next?
              </strong>
              <span>
                Connect your Web3 wallet to submit execution transactions with real-time on-chain
                confirmation tracking.
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              const connectBtn = document.querySelector(
                'header button:last-child',
              ) as HTMLButtonElement;
              if (connectBtn) connectBtn.click();
            }}
            className="w-full bg-primary text-on-primary font-title-sm text-body-sm py-md rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20 cursor-pointer font-semibold"
          >
            Connect Wallet to Execute Strategy
          </button>
        </div>
      )}
    </div>
  );
}
