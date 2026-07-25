import * as React from 'react';
import { Shield, ChevronDown, CheckCircle, Cpu } from 'lucide-react';
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Skeleton,
  Spinner,
  MetricCard,
  PortfolioCard,
  IntelligenceCard,
  TrustScore,
  FinancialHealth,
  DecisionPassport,
} from '@aegis/ui';

// Mock values matching @aegis/types definitions
const mockAssets = [
  {
    symbol: 'FLR',
    name: 'Flare',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    balance: '2500000000000000000000', // 2,500 FLR
    valueUSD: 75.0,
    priceUSD: 0.03,
  },
  {
    symbol: 'WFLR',
    name: 'Wrapped Flare',
    address: '0x1D8F7CA53789d4BBa65a9530de7bd0709d005fE4',
    decimals: 18,
    balance: '15000000000000000000000', // 15,000 WFLR
    valueUSD: 450.0,
    priceUSD: 0.03,
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0x9bB5e65789d4BBa65a9530de7bd0709d005fE4',
    decimals: 6,
    balance: '200000000', // 200 USDT
    valueUSD: 200.0,
    priceUSD: 1.0,
  },
];

export default function App() {
  const [activeStrategyFilter, setActiveStrategyFilter] = React.useState('All Strategies');
  const [isAttesting, setIsAttesting] = React.useState(false);
  const [attestationFinished, setAttestationFinished] = React.useState(false);

  const triggerAttestation = () => {
    setIsAttesting(true);
    setAttestationFinished(false);
    setTimeout(() => {
      setIsAttesting(false);
      setAttestationFinished(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#05060a] text-slate-100 flex flex-col font-sans">
      {/* Premium Header */}
      <header className="border-b border-border sticky top-0 bg-[#05060a]/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
                AEGIS
              </span>
              <span className="text-[9px] block text-slate-500 font-mono tracking-widest leading-none">
                SECURE INTEL PLATFORM
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Dropdown Menu Trigger */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-slate-800 text-slate-300 font-medium">
                  {activeStrategyFilter} <ChevronDown className="w-4 h-4 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>SELECT STRATEGY</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActiveStrategyFilter('All Strategies')}>
                  All Strategies
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveStrategyFilter('FTSO Optimization')}>
                  FTSO Optimization
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveStrategyFilter('Stablecoin Yield')}>
                  Stablecoin Yield
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dialog Trigger */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="primary" onClick={() => setAttestationFinished(false)}>
                  Attest Hardware TEE
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Hardware Attestation Report</DialogTitle>
                  <DialogDescription>
                    Queries the TEE hardware root certificate registry and compares image
                    measurements.
                  </DialogDescription>
                </DialogHeader>

                <div className="my-4 p-4 rounded-lg bg-slate-950 border border-slate-900 flex flex-col items-center justify-center gap-4 text-center">
                  {!isAttesting && !attestationFinished ? (
                    <div className="flex flex-col items-center gap-2">
                      <Cpu className="w-10 h-10 text-indigo-400" />
                      <p className="text-xs text-slate-300">
                        Ready to fetch AMD SEV-SNP attestation signatures.
                      </p>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={triggerAttestation}
                        className="mt-2"
                      >
                        Start Cryptographic Verification
                      </Button>
                    </div>
                  ) : isAttesting ? (
                    <div className="flex flex-col items-center gap-2.5 py-4">
                      <Spinner className="h-6 w-6 text-indigo-400" />
                      <p className="text-xs text-slate-400 font-mono">
                        Attesting enclave measurements...
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <CheckCircle className="w-10 h-10 text-emerald-400" />
                      <p className="text-xs text-slate-200 font-semibold">
                        Attestation Verification Passed
                      </p>
                      <code className="text-[10px] text-slate-500 font-mono select-all bg-slate-900/50 p-2 rounded block mt-1 break-all w-full">
                        SHA256: 3d8f7ca53789d4bba65a9530de7bd0709d005fe497c27181cef71249b631ffba
                      </code>
                    </div>
                  )}
                </div>

                <DialogFooter>
                  <Button variant="secondary" asChild>
                    <DialogClose>Close</DialogClose>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Reusable UI Showroom Showcase Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 flex flex-col gap-8">
        {/* Banner with TEE badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-border bg-gradient-to-r from-[#0c0e14] via-[#0c0e14] to-[#121422] rounded-xl p-6 relative overflow-hidden border-glow">
          <div className="flex flex-col gap-2 relative z-10">
            <div className="flex items-center gap-2">
              <Badge variant="verified">🛡️ PRODUCTION ARCHITECTURE</Badge>
              <Badge variant="success">FTSOv2 ORACLES ACTIVE</Badge>
            </div>
            <h2 className="text-2xl font-bold text-slate-100 tracking-tight mt-1">
              Design System Showroom
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xl">
              High-fidelity components configured for institutional privacy. Spacing leverages a
              clean 8-point grid hierarchy with custom glow states and Radix accessibility overlays.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 z-10">
            <div className="text-right">
              <span className="text-[10px] text-slate-500 block font-mono">ENCLAVE UPTIME</span>
              <span className="text-xs font-semibold text-slate-300 font-mono block">99.9997%</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-950/20 border border-emerald-900/40 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
          </div>
        </div>

        {/* Section 1: Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Value Protected"
            value="$1,245,690.00"
            change={8.2}
            changeLabel="vs last week"
            data={[1200000, 1210000, 1205000, 1220000, 1235000, 1245690]}
          />
          <MetricCard
            title="FTSO Live Price Feed"
            value="$0.03058"
            change={-1.4}
            changeLabel="vs 24h ago"
            data={[0.0311, 0.0309, 0.0308, 0.0306, 0.0307, 0.03058]}
          />
          <MetricCard
            title="Enclave Attestations"
            value="14,028"
            change={12.4}
            changeLabel="verified calls"
            data={[12000, 12500, 12800, 13100, 13600, 14028]}
          />
          <MetricCard
            title="Network Gas Saved"
            value="1.85 ETH"
            change={34.1}
            changeLabel="batch executions"
            data={[1.2, 1.3, 1.5, 1.6, 1.7, 1.85]}
          />
        </div>

        {/* Section 2: Core FinTech Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left panel: Portfolio and indicators (7 columns) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <PortfolioCard assets={mockAssets} totalValueUSD={725.0} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TrustScore
                score={98}
                attestationPassed={true}
                codeHashMatched={true}
                ftsoVerified={true}
              />
              <FinancialHealth healthFactor={2.1} liquidationThreshold={1.2} currentRisk="LOW" />
            </div>
          </div>

          {/* Right panel: Intelligence and Enclave (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <IntelligenceCard
              strategyName="Conservative FTSO Optimizer"
              riskTolerance="LOW"
              confidenceScore={0.98}
              simulatedReturn={0.085}
              verifiedByConfidentialCompute={true}
              rationale="Wallet contains 100% idle FLR. Delegating to selected providers yields risk-free FTSO epoch incentives of 8.5%."
              allocation={[
                { symbol: 'WFLR', percentage: 70 },
                { symbol: 'USDT', percentage: 30 },
              ]}
              onExecute={() => alert('Strategy authorized via mock enclave signature!')}
            />

            <DecisionPassport
              enclaveId="0xae631ffbaee2310579ec1107c27181cef71249b63"
              codeHash="3d8f7ca53789d4bba65a9530de7bd0709d005fe4"
              signature="MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0Yl5c5L1x49...[SEAL]"
              attestationReportSample="Attestation Passed: SECURE_ENCLAVE_ACTIVE_MEASUREMENT_VALID"
            />
          </div>
        </div>

        {/* Section 3: Skeletons & Spinner showroom */}
        <Card className="border-glow bg-slate-950/20">
          <CardHeader>
            <CardTitle>Skeleton Placeholders & Status Loaders</CardTitle>
            <CardDescription>
              Simulates UI loading states during asynchronous enclave attestation fetches.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card Loadings */}
            <div className="flex flex-col gap-4 bg-[#0c0e14] border border-border p-5 rounded-lg">
              <div className="flex items-center gap-3">
                <Skeleton className="w-9 h-9 rounded-full" />
                <div className="flex-1 flex flex-col gap-1.5">
                  <Skeleton className="w-1/3 h-3" />
                  <Skeleton className="w-1/4 h-2.5" />
                </div>
              </div>
              <Skeleton className="w-full h-8" />
              <div className="flex items-center justify-between">
                <Skeleton className="w-1/4 h-4" />
                <Skeleton className="w-12 h-4" />
              </div>
            </div>

            {/* Spinner states */}
            <div className="flex flex-col items-center justify-center p-8 bg-[#0c0e14] border border-border rounded-lg gap-4 text-center">
              <div className="flex items-center gap-3">
                <Spinner className="h-5 w-5" />
                <span className="text-xs text-slate-400 font-mono">
                  Attestation pipeline pending...
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">STAGING</Badge>
                <Badge variant="warning">MOCK DATA</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Premium Footer */}
      <footer className="border-t border-border py-6 mt-16 bg-[#05060a]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Aegis Enclaves Attested on coston2 chain.</span>
          </div>
          <div>© 2026 Aegis Confidential Compute Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
