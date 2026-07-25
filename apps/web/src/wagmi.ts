import { createConfig, http, type Config } from 'wagmi';
import { flareTestnet } from 'viem/chains';
import { injected, metaMask, coinbaseWallet, walletConnect } from 'wagmi/connectors';

// Fallback project ID for WalletConnect verification
const walletConnectProjectId = 'aegis-dummy-walletconnect-project-id-12345';

export const config: Config = createConfig({
  chains: [flareTestnet],
  connectors: [
    injected(), // Standard injected connector supporting Rabby and general browser wallet tools
    metaMask(),
    coinbaseWallet({ appName: 'Aegis Platform' }),
    walletConnect({ projectId: walletConnectProjectId }),
  ],
  transports: {
    [flareTestnet.id]: http(),
  },
});
