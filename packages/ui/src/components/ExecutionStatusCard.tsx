import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card.js';
import { Button } from './Button.js';
import { Send, CheckCircle2, Lock, Key, Check } from 'lucide-react';
import { cn } from '../utils.js';

export interface ExecutionStatusCardProps {
  className?: string;
  activeStep?: 0 | 1 | 2 | 3 | 4 | 5; // 0 = idle, 1 = encryption, 2 = enclave, 3 = attestation, 4 = on-chain contract, 5 = success
  strategyName?: string;
  onStartExecution?: () => void;
}

export function ExecutionStatusCard({
  className,
  activeStep = 0,
  strategyName = 'FTSO Optimization',
  onStartExecution,
}: ExecutionStatusCardProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-12 gap-8 w-full select-none', className)}>
      {/* Left Trigger Panel (6 columns) */}
      <div className="md:col-span-6 flex flex-col gap-6">
        <Card className="border-glow">
          <CardHeader>
            <CardTitle>Execution Setup</CardTitle>
            <CardDescription>
              Authorize strategy reallocation details through TEE executors.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold">
                ACTIVE STRATEGY
              </span>
              <div className="bg-[#05060a] border border-slate-800 rounded-lg p-3.5 text-xs text-slate-200 font-semibold">
                {strategyName}
              </div>
            </div>

            <div className="bg-[#07080c]/50 border border-slate-850 p-4 rounded-lg flex gap-3 text-xs text-slate-450 leading-relaxed font-sans">
              <Lock className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5" />
              <p className="text-slate-400">
                Swaps are executed on-chain via the{' '}
                <code className="text-indigo-300 font-mono font-semibold">
                  AegisPortfolioExecutor
                </code>{' '}
                smart contract. The contract requires hardware attestation proofs before validation.
              </p>
            </div>

            {onStartExecution && (
              <Button
                variant="primary"
                className="w-full h-11 mt-2"
                onClick={onStartExecution}
                disabled={activeStep > 0 && activeStep < 5}
              >
                <Send className="w-4 h-4" />
                {activeStep === 5 ? 'Trigger Another Rebalance' : 'Start Secure Execution Pipeline'}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Stepper Panel (6 columns) */}
      <div className="md:col-span-6 flex flex-col gap-6">
        <Card className="border-glow bg-gradient-to-b from-[#0c0e14] to-[#0c0e14]/50">
          <CardHeader>
            <CardTitle>Secure Pipeline Status</CardTitle>
            <CardDescription>Tracks live hardware validation steps.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 font-sans">
            {/* Step 1 */}
            <div className="flex items-center gap-3.5">
              <div
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs border font-mono',
                  activeStep === 0 && 'border-slate-800 text-slate-500',
                  activeStep === 1 &&
                    'border-indigo-500 text-indigo-400 bg-indigo-500/10 animate-pulse',
                  activeStep > 1 && 'border-emerald-500 text-emerald-400 bg-emerald-950/20',
                )}
              >
                {activeStep > 1 ? <Check className="w-3.5 h-3.5" /> : '1'}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-slate-300">
                  Browser Parameter Encryption
                </span>
                <span className="text-[10px] text-slate-500 font-mono">ECIES payload seal</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3.5">
              <div
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs border font-mono',
                  activeStep <= 1 && 'border-slate-800 text-slate-500',
                  activeStep === 2 &&
                    'border-indigo-500 text-indigo-400 bg-indigo-500/10 animate-pulse',
                  activeStep > 2 && 'border-emerald-500 text-emerald-400 bg-emerald-950/20',
                )}
              >
                {activeStep > 2 ? <Check className="w-3.5 h-3.5" /> : '2'}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-slate-300">
                  Enclave Computation (TEE)
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  Isolated AMD-SEV-SNP bounds
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3.5">
              <div
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs border font-mono',
                  activeStep <= 2 && 'border-slate-800 text-slate-500',
                  activeStep === 3 &&
                    'border-indigo-500 text-indigo-400 bg-indigo-500/10 animate-pulse',
                  activeStep > 3 && 'border-emerald-500 text-emerald-400 bg-emerald-950/20',
                )}
              >
                {activeStep > 3 ? <Check className="w-3.5 h-3.5" /> : '3'}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-slate-300">
                  Attestation Signature Assembly
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  Hardware-rooted verification seal
                </span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-center gap-3.5">
              <div
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs border font-mono',
                  activeStep <= 3 && 'border-slate-800 text-slate-500',
                  activeStep === 4 &&
                    'border-indigo-500 text-indigo-400 bg-indigo-500/10 animate-pulse',
                  activeStep > 4 && 'border-emerald-500 text-emerald-400 bg-emerald-950/20',
                )}
              >
                {activeStep > 4 ? <Check className="w-3.5 h-3.5" /> : '4'}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-slate-300">
                  On-Chain Strategy Registration
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  StrategyRegistry & ExecutionManager registry verification
                </span>
              </div>
            </div>

            {/* Success logs */}
            {activeStep === 5 && (
              <div className="flex flex-col gap-3 bg-emerald-950/20 border border-emerald-900/30 rounded-lg p-4 mt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-4.5 h-4.5" />
                  <span>Transaction Dispatched & Registered Successfully</span>
                </div>
                <div className="font-mono text-[9px] text-slate-400 flex flex-col gap-1 bg-[#05060a] p-2.5 rounded border border-slate-900 leading-relaxed">
                  <span className="truncate">Tx: 0xb579ec1107c27181cef71249b631f...</span>
                  <span className="truncate">Strategy ID: 0x91f3ab8f2e718d45c58a93e3df...</span>
                  <span>Registry State: EXECUTED (WFLR 70%, USDT 30%)</span>
                </div>
              </div>
            )}

            {activeStep === 0 && (
              <div className="flex items-center justify-center py-6 text-slate-500 text-xs border border-dashed border-slate-800/80 rounded-lg">
                Pipeline idle.
              </div>
            )}

            {activeStep > 0 && activeStep < 5 && (
              <div className="flex items-center gap-2 justify-center py-3 text-xs font-mono text-indigo-400 animate-pulse">
                <Key className="w-3.5 h-3.5" /> Processing TEE cryptographic handshake...
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
