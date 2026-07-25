import { PublicClient, parseAbi } from 'viem';
import { FtsoPriceFeed } from '@aegis/types';

const FTSO_V2_REGISTRY_ABI = parseAbi([
  'function getFeedByName(string calldata name) external view returns (uint256 value, int32 decimals, uint64 timestamp)',
]);

export class FtsoClient {
  private client: PublicClient;
  private registryAddress: `0x${string}`;

  constructor(client: PublicClient, registryAddress: `0x${string}`) {
    this.client = client;
    this.registryAddress = registryAddress;
  }

  /**
   * Fetches the current price and metadata for a specific token symbol via Flare FTSOv2.
   */
  async getPriceFeed(symbol: string): Promise<FtsoPriceFeed> {
    try {
      const result = (await this.client.readContract({
        address: this.registryAddress,
        abi: FTSO_V2_REGISTRY_ABI,
        functionName: 'getFeedByName',
        args: [symbol],
      })) as [bigint, number, bigint];

      return {
        symbol,
        price: result[0].toString(),
        decimals: result[1],
        timestamp: Number(result[2]),
      };
    } catch (error) {
      console.error(`Failed to fetch FTSO feed for ${symbol}:`, error);
      throw new Error(
        `FTSO fetch error: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}
