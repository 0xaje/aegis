import { Badge } from './Badge.js';

export default {
  title: 'Atomic/Badge',
  component: Badge,
};

export const Default = () => <Badge variant="default">Active</Badge>;

export const Success = () => <Badge variant="success">Completed</Badge>;

export const Warning = () => <Badge variant="warning">Low Collateral</Badge>;

export const Error = () => <Badge variant="error">Signature Invalid</Badge>;

export const Verified = () => <Badge variant="verified">TEE Secure</Badge>;
