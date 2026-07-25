import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Table.js';
import { Badge } from './Badge.js';

export default {
  title: 'Atomic/Table',
  component: Table,
};

export const Default = () => (
  <div className="max-w-2xl w-full p-4 bg-[#0c0e14]/50 border border-slate-800 rounded-xl">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Enclave Node</TableHead>
          <TableHead>Execution Mode</TableHead>
          <TableHead>Attestation Status</TableHead>
          <TableHead className="text-right">Active Sig</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-semibold text-slate-200">coston2-node-01</TableCell>
          <TableCell className="font-mono text-slate-400">AMD_SEV_SNP</TableCell>
          <TableCell>
            <Badge variant="verified">Verified</Badge>
          </TableCell>
          <TableCell className="text-right font-mono text-slate-500">0xae63...7124</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold text-slate-200">coston2-node-02</TableCell>
          <TableCell className="font-mono text-slate-400">INTEL_SGX</TableCell>
          <TableCell>
            <Badge variant="verified">Verified</Badge>
          </TableCell>
          <TableCell className="text-right font-mono text-slate-500">0xb12c...98ef</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
);
