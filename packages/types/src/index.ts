/**
 * Aegis Shared Types
 */

export interface SystemConfig {
  env: 'development' | 'production' | 'test';
  version: string;
  debug: boolean;
}
