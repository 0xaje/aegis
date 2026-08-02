import { createPublicClient, http, getContract, getAddress } from 'viem';
import { flareTestnet } from 'viem/chains';

export interface FTSOPrice {
  symbol: string;
  value: bigint;
  decimals: number;
  timestamp: bigint;
  priceUSD: number;
}

export class FlareFtsoClient {
  private client;
  private registryAddress: string;
  private ftsoAddress: string | null = null;

  // In-memory price cache TTL parameters
  private priceCache: Record<string, { data: FTSOPrice; expiresAt: number }> = {};
  private cacheTTLMs: number;

  constructor(
    rpcUrl: string = 'https://coston2-api.flare.network/ext/C/rpc',
    cacheTTLMs: number = 30000, // Cache values for 30 seconds by default
  ) {
    this.client = createPublicClient({
      chain: flareTestnet,
      transport: http(rpcUrl, {
        timeout: 10000, // Strict 10-second timeout to prevent connection hangs
      }),
    });
    // Checksum Flare Contract Registry address
    this.registryAddress = getAddress('0xaD67f33e0255a7bf53c1516503c000f2B8E1857f');
    this.cacheTTLMs = cacheTTLMs;
  }

  /**
   * Resolves the FtsoV2 contract address dynamically from the Flare Contract Registry.
   * Caches the resolved address permanently to avoid duplicate lookup overhead.
   */
  async getFtsoV2Address(): Promise<string> {
    if (this.ftsoAddress) return this.ftsoAddress;

    const registryAbi = [
      {
        type: 'function',
        name: 'getContractAddressByName',
        inputs: [{ name: 'name', type: 'string' }],
        outputs: [{ name: '', type: 'address' }],
        stateMutability: 'view',
      },
    ] as const;

    try {
      const registry = getContract({
        address: this.registryAddress as `0x${string}`,
        abi: registryAbi,
        client: this.client,
      });

      const address = await registry.read.getContractAddressByName(['FtsoV2']);
      this.ftsoAddress = getAddress(address);
      return this.ftsoAddress;
    } catch (err) {
      console.error('Failed to query Flare Contract Registry:', err);
      throw new Error('FTSOv2 contract address resolution failed.');
    }
  }

  /**
   * Fetches the current price feed value for a token symbol.
   * Integrates caching limits and fallback variables if query requests fail.
   */
  async getPrice(symbol: string): Promise<FTSOPrice> {
    const normalizedSymbol = symbol.toUpperCase();

    // 1. Check pricing cache
    const cached = this.priceCache[normalizedSymbol];
    if (cached && Date.now() < cached.expiresAt) {
      return cached.data;
    }

    // 2. Fetch price from FTSOv2 contract
    try {
      const ftsoAddress = await this.getFtsoV2Address();

      const ftsoAbi = [
        {
          type: 'function',
          name: 'getFeedByName',
          inputs: [{ name: 'name', type: 'string' }],
          outputs: [
            { name: 'value', type: 'int256' },
            { name: 'decimals', type: 'int8' },
            { name: 'timestamp', type: 'uint64' },
          ],
          stateMutability: 'view',
        },
      ] as const;

      const ftso = getContract({
        address: ftsoAddress as `0x${string}`,
        abi: ftsoAbi,
        client: this.client,
      });

      const [value, decimals, timestamp] = await ftso.read.getFeedByName([normalizedSymbol]);
      const priceUSD = Number(value) / Math.pow(10, Number(decimals));

      const priceResult: FTSOPrice = {
        symbol: normalizedSymbol,
        value,
        decimals: Number(decimals),
        timestamp,
        priceUSD,
      };

      // Store results in pricing cache
      this.priceCache[normalizedSymbol] = {
        data: priceResult,
        expiresAt: Date.now() + this.cacheTTLMs,
      };

      return priceResult;
    } catch (err) {
      console.error(`Failed to query FTSOv2 price feed for ${normalizedSymbol}:`, err);

      // Return cached value if available
      if (cached) {
        console.warn(`Returning cached pricing for ${normalizedSymbol}.`);
        return cached.data;
      }

      // Throw explicit error rather than silently fabricating mock fallback prices
      throw new Error(
        `FTSOv2 price feed for ${normalizedSymbol} is unavailable: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  /**
   * Fetches multiple price feeds concurrently.
   */
  async getPrices(symbols: string[]): Promise<Record<string, FTSOPrice>> {
    const results: Record<string, FTSOPrice> = {};
    await Promise.all(
      symbols.map(async (symbol) => {
        results[symbol] = await this.getPrice(symbol);
      }),
    );
    return results;
  }
}
