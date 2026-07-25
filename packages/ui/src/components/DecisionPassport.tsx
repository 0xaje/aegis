import { Card, CardHeader, CardTitle, CardContent } from './Card.js';
import { Cpu, Key, Lock, FileCode } from 'lucide-react';
import { cn } from '../utils.js';

export interface DecisionPassportProps {
  className?: string;
  enclaveId: string;
  codeHash: string;
  signature: string;
  attestationReportSample?: string;
}

export function DecisionPassport({
  className,
  enclaveId,
  codeHash,
  signature,
  attestationReportSample = 'PASSED: PRIVATE_TEE_CALCULATION_VALIDATED',
}: DecisionPassportProps) {
  return (
    <Card
      className={cn(
        'border-glow select-none bg-gradient-to-br from-[#0c0e14] via-[#0c0e14] to-[#121422]',
        className,
      )}
    >
      <CardHeader className="border-b border-slate-900/60 pb-4">
        <CardTitle className="flex items-center gap-2 text-sm text-slate-100 font-sans font-bold">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <span>TEE Hardware Decision Passport</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 flex flex-col gap-5 text-xs font-sans">
        {/* Enclave info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-2.5">
            <Lock className="w-4.5 h-4.5 text-indigo-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-500 font-mono block tracking-wider uppercase font-semibold leading-none">
                ENCLAVE PUBLIC IDENTIFIER
              </span>
              <span className="font-mono text-slate-200 block text-[10px] truncate mt-1">
                {enclaveId}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <FileCode className="w-4.5 h-4.5 text-indigo-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-500 font-mono block tracking-wider uppercase font-semibold leading-none">
                ENCLAVE IMAGE HASH (MRENCLAVE)
              </span>
              <span className="font-mono text-slate-200 block text-[10px] truncate mt-1">
                {codeHash}
              </span>
            </div>
          </div>
        </div>

        {/* Attestation Signature details */}
        <div className="flex flex-col gap-1.5 border-t border-slate-900/80 pt-4">
          <div className="flex items-center gap-1.5">
            <Key className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold">
              HARDWARE ROOT SIGNATURE
            </span>
          </div>
          <div className="bg-[#05060a]/90 border border-slate-900 rounded p-2.5 font-mono text-[9px] text-slate-400 leading-normal break-all max-h-16 overflow-y-auto">
            {signature}
          </div>
        </div>

        {/* Enclave attestation status status */}
        <div className="flex items-center justify-between border-t border-slate-900/80 pt-4 mt-1 text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Hardware Model Check: AMD SEV-SNP (Coston2)</span>
          </span>
          <span className="text-emerald-400 font-semibold uppercase">
            {attestationReportSample}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
