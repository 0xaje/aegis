/**
 * Aegis Client SDK
 * Standard entry point for confidential computations and oracle interactions.
 */

export class AegisSDK {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getEndpoint(): string {
    return this.endpoint;
  }
}

export * from './portfolio.js';
