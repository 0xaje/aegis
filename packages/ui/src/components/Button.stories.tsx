import { Button } from './Button.js';
import { Shield } from 'lucide-react';

export default {
  title: 'Atomic/Button',
  component: Button,
};

export const Primary = () => <Button variant="primary">Authorize Rebalance</Button>;

export const Secondary = () => <Button variant="secondary">Cancel</Button>;

export const Outline = () => <Button variant="outline">Connect Wallet</Button>;

export const Ghost = () => <Button variant="ghost">Inspect Logs</Button>;

export const Destructive = () => <Button variant="destructive">Disable Executor</Button>;

export const WithIcon = () => (
  <Button variant="primary" className="gap-2">
    <Shield className="w-4 h-4" /> Secure Handshake
  </Button>
);

export const Sizes = () => (
  <div className="flex items-center gap-4 flex-wrap">
    <Button size="sm">Small size</Button>
    <Button size="default">Default size</Button>
    <Button size="lg">Large size</Button>
  </div>
);
