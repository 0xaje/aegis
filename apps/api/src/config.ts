import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  HOST: z.string().default('0.0.0.0'),
  DATABASE_URL: z.string().url(),
  FLARE_RPC_URL: z.string().url().default('https://coston2-api.flare.network/ext/C/rpc'),
  FTSO_REGISTRY_ADDRESS: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/)
    .default('0x3D8F7CA53789d4BBa65a9530de7bd0709d005fE4'),
  TEE_ENCLAVE_URL: z.string().url().default('http://localhost:8080'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Invalid environment configuration:', JSON.stringify(_env.error.format(), null, 2));
  process.exit(1);
}

export const env = _env.data;
export type EnvType = z.infer<typeof envSchema>;
