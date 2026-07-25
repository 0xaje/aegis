import { useAccount } from 'wagmi';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@aegis/ui';
import { Lock } from 'lucide-react';

export default function History() {
  const { isConnected } = useAccount();

  return (
    <div className="flex flex-col gap-6 w-full">
      {isConnected ? (
        <Card className="border-glow w-full animate-in fade-in duration-200">
          <CardHeader className="border-b border-slate-900/60">
            <CardTitle>Attestation History Log</CardTitle>
            <CardDescription>
              Verification registry of previous strategy transactions and enclave execution seals.
            </CardDescription>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Strategy Model</TableHead>
                <TableHead>Attestation Status</TableHead>
                <TableHead className="text-right">Hardware Check</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono text-slate-400">2026-07-25 01:14:22</TableCell>
                <TableCell className="font-semibold text-slate-200">Wrap & Delegate</TableCell>
                <TableCell className="text-slate-300">FTSO Yield Optimizer</TableCell>
                <TableCell>
                  <Badge variant="verified">VERIFIED</Badge>
                </TableCell>
                <TableCell className="text-right font-semibold text-emerald-400 font-mono">
                  AMD SEV-SNP
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-slate-400">2026-07-23 18:42:01</TableCell>
                <TableCell className="font-semibold text-slate-200">Hedging Swap</TableCell>
                <TableCell className="text-slate-300">Stablecoin Hedger</TableCell>
                <TableCell>
                  <Badge variant="verified">VERIFIED</Badge>
                </TableCell>
                <TableCell className="text-right font-semibold text-emerald-400 font-mono">
                  INTEL SGX
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      ) : (
        <Card className="border-glow p-8 text-center flex flex-col items-center gap-4 bg-[#0c0e14]/50 border-dashed">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <Lock className="w-5 h-5 text-indigo-400" />
          </div>
          <CardHeader className="p-0 flex flex-col gap-0.5">
            <CardTitle>History Log Locked</CardTitle>
            <CardDescription className="max-w-xs mx-auto">
              Please connect your credentials wallet to query the attestation registry records.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
