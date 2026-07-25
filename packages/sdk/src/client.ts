import { Portfolio, InvestmentStrategy, AIRecommendation } from '@aegis/types';

export class AegisApiClient {
  private baseUrl: string;
  private token?: string;

  constructor(baseUrl: string, token?: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  setToken(token: string) {
    this.token = token;
  }

  private get headers(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  /**
   * Fetches user portfolio breakdown.
   */
  async getPortfolio(address: string): Promise<Portfolio> {
    const response = await fetch(`${this.baseUrl}/api/portfolio/${address}`, {
      headers: this.headers,
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<Portfolio>;
  }

  /**
   * Fetches supported investment strategies.
   */
  async getStrategies(): Promise<InvestmentStrategy[]> {
    const response = await fetch(`${this.baseUrl}/api/strategies`, {
      headers: this.headers,
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<InvestmentStrategy[]>;
  }

  /**
   * Fetches verification and recommendation info for a specific portfolio.
   */
  async getRecommendation(portfolioAddress: string): Promise<AIRecommendation> {
    const response = await fetch(`${this.baseUrl}/api/recommendations/${portfolioAddress}`, {
      headers: this.headers,
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<AIRecommendation>;
  }
}
