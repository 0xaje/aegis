import { ExecutionStatusCard } from './ExecutionStatusCard.js';

export default {
  title: 'Fintech/ExecutionStatusCard',
  component: ExecutionStatusCard,
};

export const Idle = () => (
  <div className="max-w-4xl w-full p-4">
    <ExecutionStatusCard
      activeStep={0}
      onStartExecution={() => alert('Start secure TEE execution')}
    />
  </div>
);

export const Encrypting = () => (
  <div className="max-w-4xl w-full p-4">
    <ExecutionStatusCard activeStep={1} onStartExecution={() => {}} />
  </div>
);

export const InEnclave = () => (
  <div className="max-w-4xl w-full p-4">
    <ExecutionStatusCard activeStep={2} onStartExecution={() => {}} />
  </div>
);

export const Dispatched = () => (
  <div className="max-w-4xl w-full p-4">
    <ExecutionStatusCard activeStep={4} onStartExecution={() => alert('Restart pipeline')} />
  </div>
);
