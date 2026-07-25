import * as React from 'react';
import { Drawer } from './Drawer.js';
import { Button } from './Button.js';

export default {
  title: 'Atomic/Drawer',
  component: Drawer,
};

export const Default = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="p-8 flex justify-center">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open Strategy Panel
      </Button>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        title="FTSO Pricing Thresholds"
        description="Verify active risk limits and delegation rewards calculations."
      >
        <div className="flex flex-col gap-4 mt-2">
          <p className="text-slate-400">
            The Flare Time Series Oracle (FTSOv2) queries feeds every epoch. If volatility
            boundaries are exceeded, reallocation triggers run inside TEE memory guards.
          </p>
          <div className="flex flex-col gap-1.5 bg-[#05060a] p-3 rounded-lg border border-slate-900 font-mono text-[10px] text-slate-500 mt-2">
            <div>Target Feed: FLR/USD</div>
            <div>Liquidation Floor: $0.012</div>
            <div>Safety Margin: 150%</div>
          </div>
          <div className="flex justify-end gap-3 mt-4 border-t border-slate-900 pt-4">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => setOpen(false)}>
              Save Targets
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
