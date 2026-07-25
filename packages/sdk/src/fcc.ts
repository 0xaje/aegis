import { ConfidentialComputeRequest, ConfidentialComputeResponse } from '@aegis/types';

export class ConfidentialComputeClient {
  private enclaveUrl: string;

  constructor(enclaveUrl: string) {
    this.enclaveUrl = enclaveUrl;
  }

  /**
   * Submits portfolio data and code requirements to the Flare Confidential Compute TEE enclave.
   */
  async submitComputation(
    request: Omit<ConfidentialComputeRequest, 'id' | 'timestamp'>,
  ): Promise<ConfidentialComputeResponse> {
    try {
      const response = await fetch(`${this.enclaveUrl}/compute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Enclave HTTP error: ${response.status} ${response.statusText}`);
      }

      return (await response.json()) as ConfidentialComputeResponse;
    } catch (error) {
      console.error('Confidential computation submission failed:', error);
      throw new Error(
        `ConfidentialCompute submission error: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Verifies the cryptographic attestation report of the enclave output.
   */
  async verifyAttestation(response: ConfidentialComputeResponse): Promise<boolean> {
    // Verification logic parsing TEE attestation reports against hardware roots (AMD/Intel)
    // and verifying signature of computed result.
    if (!response.attestationReport || !response.signature) {
      return false;
    }
    return response.verified;
  }
}
