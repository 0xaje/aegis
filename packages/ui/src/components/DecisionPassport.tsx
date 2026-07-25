import { Card, CardHeader, CardTitle, CardContent } from './Card.js';
import { Cpu, KeyRound, Lock, FileCode } from 'lucide-react';
import { cn } from '../utils.js';

export interface DecisionPassportProps {
  enclaveId: string;
  codeHash: string;
  signature: string;
  attestationReportSample: string;
  className?: string;
}

export function DecisionPassport({
  enclaveId,
  codeHash,
  signature,
  attestationReportSample,
  className,
}: DecisionPassportProps) {
  return (
    <Card hoverGlow className={cn('border-glow text-[11px]', className)}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle>TEE Decision Passport</CardTitle>
          <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase mt-0.5">
            ATTESTED EXECUTION PROOFS
          </p>
        </div>
        <Cpu className="w-5 h-5 text-indigo-400 animate-pulse" />
      </CardHeader>

      <CardContent className="p-6 flex flex-col gap-4 font-mono">
        {/* Enclave IDs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#07080c]/60 border border-slate-800/60 rounded-lg p-3.5 flex flex-col gap-1.5">
            <span className="text-[9px] text-slate-500 font-semibold tracking-wider flex items-center gap-1 font-sans">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" /> TEE INSTANCE IDENTIFIER
            </span>
            <code className="text-slate-300 break-all select-all leading-normal">{enclaveId}</code>
          </div>

          <div className="bg-[#07080c]/60 border border-slate-800/60 rounded-lg p-3.5 flex flex-col gap-1.5">
            <span className="text-[9px] text-slate-500 font-semibold tracking-wider flex items-center gap-1 font-sans">
              <FileCode className="w-3.5 h-3.5 text-indigo-400" /> CODE MEASUREMENT HASH
            </span>
            <code className="text-slate-300 break-all select-all leading-normal">{codeHash}</code>
          </div>
        </div>

        {/* Cryptographic Enclave signature */}
        <div className="bg-[#07080c]/60 border border-slate-800/60 rounded-lg p-3.5 flex flex-col gap-1.5">
          <span className="text-[9px] text-slate-500 font-semibold tracking-wider flex items-center gap-1 font-sans">
            <KeyRound className="w-3.5 h-3.5 text-indigo-400" /> ATTESTATION ATTACHED SIGNATURE
          </span>
          <code className="text-slate-300 break-all select-all leading-relaxed bg-[#05060a] border border-slate-900 rounded-md p-2.5 text-[10px] block">
            {signature}
          </code>
        </div>

        {/* Enclave hardware security context */}
        <div className="flex items-start gap-2.5 bg-indigo-950/20 border border-indigo-900/30 rounded-lg p-3 text-xs text-indigo-200 font-sans leading-relaxed">
          <Lock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <p>
              Secure compute bounds. All portfolio allocation algorithms ran inside an AMD SEV-SNP
              execution environment. Host process holds zero access keys.
            </p>
            {attestationReportSample && (
              <span className="text-[9px] text-indigo-400/70 font-mono block mt-1">
                Status: {attestationReportSample}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
