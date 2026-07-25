import * as React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DecisionPassport,
} from '@aegis/ui';
import { FileText, Cpu, CheckCircle } from 'lucide-react';

export default function History() {
  const [selectedRecord, setSelectedRecord] = React.useState<(typeof historyLogs)[0] | null>(null);

  const historyLogs = [
    {
      id: 'tx-ftso-101',
      timestamp: '2026-07-25 01:14:22',
      action: 'Wrap & Delegate',
      strategy: 'Conservative FTSO Optimizer',
      assets: '2,500 WFLR',
      enclaveId: '0xae631ffbaee2310579ec1107c27181cef71249b63',
      codeHash: '3d8f7ca53789d4bba65a9530de7bd0709d005fe4',
      signature: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0Yl5c5L1x49...[SEAL]',
      status: 'VERIFIED',
    },
    {
      id: 'tx-ftso-102',
      timestamp: '2026-07-23 18:42:01',
      action: 'Hedging Swap',
      strategy: 'Stablecoin Hedged Accumulator',
      assets: '1,200 FLR to 36 USDT',
      enclaveId: '0xae631ffbaee2310579ec1107c27181cef71249b63',
      codeHash: '3d8f7ca53789d4bba65a9530de7bd0709d005fe4',
      signature: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0Yl5c5L1x49...[SEAL]',
      status: 'VERIFIED',
    },
    {
      id: 'tx-ftso-103',
      attestationFailed: true,
      timestamp: '2026-07-20 09:12:55',
      action: 'Delegate',
      strategy: 'FTSO Delegation Optimization',
      assets: '1,500 WFLR',
      enclaveId: '0xae631ffbaee2310579ec1107c27181cef71249b63',
      codeHash: '9fb82b3a-5b49-4144-8c9e-8ebe0d6a5834', // simulated outdated measurement code hash
      signature: 'INVALID_SIGNATURE_EXPIRED',
      status: 'FAILED',
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-100">Attestation & Transaction History</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Verification registry of previous strategy transactions and enclave attestation
          signatures.
        </p>
      </div>

      <Dialog>
        <Card className="border-glow">
          <CardHeader className="border-b border-slate-800/40">
            <CardTitle>History Logs</CardTitle>
            <CardDescription>
              Click any verified record to download or inspect its TEE attestation passport.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800/40 text-[10px] font-mono tracking-widest text-slate-500 uppercase select-none">
                    <th className="py-4 px-6">Timestamp</th>
                    <th className="py-4 px-4">Action</th>
                    <th className="py-4 px-4">Strategy</th>
                    <th className="py-4 px-4">Assets</th>
                    <th className="py-4 px-4 text-center">Attestation</th>
                    <th className="py-4 px-6 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/30">
                  {historyLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-900/25 transition-colors group">
                      <td className="py-4 px-6 text-slate-400 font-mono select-none">
                        {log.timestamp}
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-200">{log.action}</td>
                      <td className="py-4 px-4 text-slate-300">{log.strategy}</td>
                      <td className="py-4 px-4 text-slate-300 font-mono">{log.assets}</td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant={log.status === 'VERIFIED' ? 'verified' : 'error'}>
                          {log.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-850 hover:bg-slate-900"
                            onClick={() => setSelectedRecord(log)}
                          >
                            <FileText className="w-3.5 h-3.5" /> Inspect
                          </Button>
                        </DialogTrigger>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Passport dialog display */}
        <DialogContent className="max-w-2xl bg-[#0c0e14]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" /> Attestation Proof Passport
            </DialogTitle>
            <DialogDescription>
              Verification passport for transaction ID: {selectedRecord?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedRecord && (
            <div className="my-2">
              {selectedRecord.status === 'FAILED' ? (
                <div className="bg-rose-950/20 border border-rose-900/30 rounded-lg p-4 flex flex-col gap-2 text-rose-300 text-xs leading-relaxed">
                  <span className="font-bold flex items-center gap-1.5 text-rose-400 uppercase tracking-wider">
                    ❌ Cryptographic Verification Failed
                  </span>
                  <p>
                    Image measurement code hash does not match binary registry. Execution rejected
                    by executor contracts due to invalid attestation signature.
                  </p>
                  <code className="text-[10px] bg-slate-950 p-2 rounded block mt-1 font-mono break-all text-slate-400 border border-slate-900">
                    Received: {selectedRecord.signature} <br />
                    Required Match: AMD_SEV_SNP_HARDWARE_ROOT
                  </code>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-lg p-4 flex items-start gap-2.5 text-emerald-300 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block uppercase tracking-wider">
                        Verification Signature Validated
                      </span>
                      <p className="mt-1 leading-relaxed text-slate-300">
                        This rebalancing transaction was successfully compiled inside a secure
                        enclave and attestation signature was verified by on-chain registries.
                      </p>
                    </div>
                  </div>

                  <DecisionPassport
                    enclaveId={selectedRecord.enclaveId}
                    codeHash={selectedRecord.codeHash}
                    signature={selectedRecord.signature}
                    attestationReportSample="PASSED: SECURITY_ENCLAVE_CALCULATION_VERIFIED"
                  />
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="secondary" asChild>
              <DialogClose>Dismiss Passport</DialogClose>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
