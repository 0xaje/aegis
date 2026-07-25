import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from '@aegis/ui';
import { Send, CheckCircle2, Lock, Key } from 'lucide-react';

export default function Execution() {
  const [step, setStep] = React.useState<number>(0); // 0 = idle, 1 = encryption, 2 = enclave, 3 = signing, 4 = success
  const [txStrategy, setTxStrategy] = React.useState('FTSO Optimization');

  const executeRebalance = () => {
    setStep(1);

    // Step 1: Encrypting
    setTimeout(() => {
      setStep(2);
    }, 1500);

    // Step 2: Enclave computation
    setTimeout(() => {
      setStep(3);
    }, 3000);

    // Step 3: Blockchain signature
    setTimeout(() => {
      setStep(4);
    }, 4500);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-100">TEE Transaction Execution</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Approve and deploy secure portfolio reallocation transactions using hardware-rooted
          attestation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side Setup Panel (6 columns) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <Card className="border-glow">
            <CardHeader>
              <CardTitle>Execution Setup</CardTitle>
              <CardDescription>
                Select strategy model and trigger confidential compute validation.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">
                  Active Strategy Selection
                </span>
                <select
                  value={txStrategy}
                  onChange={(e) => setTxStrategy(e.target.value)}
                  className="bg-[#05060a] border border-slate-800 rounded-lg p-3 text-xs text-slate-300 outline-none w-full focus:ring-1 focus:ring-ring"
                >
                  <option value="FTSO Optimization">Conservative FTSO Optimization Strategy</option>
                  <option value="Stablecoin Yield">Stablecoin Yield Accumulator</option>
                </select>
              </div>

              <div className="bg-[#07080c]/50 border border-slate-850 p-4 rounded-lg flex gap-3 text-xs text-slate-400 leading-relaxed">
                <Lock className="w-4.5 h-4.5 text-indigo-400 shrink-0" />
                <p>
                  Execution transactions are authorized on-chain by the{' '}
                  <code className="text-indigo-300 font-semibold font-mono">
                    AegisPortfolioExecutor
                  </code>{' '}
                  smart contract. The contract will reject any payload that lacks a valid signature
                  from the hardware attestation registry.
                </p>
              </div>

              <Button
                variant="primary"
                className="w-full h-11 mt-2"
                onClick={executeRebalance}
                disabled={step !== 0 && step !== 4}
              >
                <Send className="w-4 h-4" />
                {step === 4 ? 'Trigger Another Rebalance' : 'Start Secure Execution Pipeline'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Side Progress Panel (6 columns) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <Card className="border-glow bg-gradient-to-b from-[#0c0e14] to-[#0c0e14]/50">
            <CardHeader>
              <CardTitle>Secure Pipeline Status</CardTitle>
              <CardDescription>Tracks live hardware validation steps.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              {/* Step 1 */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs border ${
                    step === 0
                      ? 'border-slate-800 text-slate-500'
                      : step === 1
                        ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10 animate-pulse'
                        : 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                  }`}
                >
                  {step > 1 ? '✔' : '1'}
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-300 block">
                    Browser Parameter Encryption
                  </span>
                  <span className="text-[10px] text-slate-500 block leading-none mt-0.5">
                    Encrypting portfolio data via ECIES
                  </span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs border ${
                    step <= 1
                      ? 'border-slate-800 text-slate-500'
                      : step === 2
                        ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10 animate-pulse'
                        : 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                  }`}
                >
                  {step > 2 ? '✔' : '2'}
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-300 block">
                    Enclave Computation (TEE)
                  </span>
                  <span className="text-[10px] text-slate-500 block leading-none mt-0.5">
                    Calculating allocation safety metrics
                  </span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs border ${
                    step <= 2
                      ? 'border-slate-800 text-slate-500'
                      : step === 3
                        ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10 animate-pulse'
                        : 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                  }`}
                >
                  {step > 3 ? '✔' : '3'}
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-300 block">
                    Attestation Signature Assembly
                  </span>
                  <span className="text-[10px] text-slate-500 block leading-none mt-0.5">
                    Signing payload using Intel SGX / AMD SNP root keys
                  </span>
                </div>
              </div>

              {/* Success Result */}
              {step === 4 && (
                <div className="flex flex-col gap-3.5 bg-emerald-950/20 border border-emerald-900/30 rounded-lg p-4 mt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="w-4.5 h-4.5" />
                    <span>Transaction Dispatched Successfully</span>
                  </div>
                  <div className="font-mono text-[9px] text-slate-400 flex flex-col gap-1 w-full bg-[#05060a] p-2.5 rounded border border-slate-900 leading-relaxed">
                    <span>Tx: 0xb579ec1107c27181cef71249b631ffbaee23105</span>
                    <span>Sign: MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCg...</span>
                    <span>State: REBALANCED (WFLR 70%, USDT 30%)</span>
                  </div>
                </div>
              )}

              {step === 0 && (
                <div className="flex items-center justify-center py-10 text-slate-500 text-xs border border-dashed border-slate-800/80 rounded-lg">
                  Pipeline idle. Click submit button to run.
                </div>
              )}

              {step > 0 && step < 4 && (
                <div className="flex items-center gap-2 justify-center py-4 text-xs font-mono text-indigo-400 animate-pulse">
                  <Key className="w-3.5 h-3.5" /> Processing cryptographic handshake...
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
