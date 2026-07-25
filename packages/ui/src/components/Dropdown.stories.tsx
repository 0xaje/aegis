import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './Dropdown.js';
import { Button } from './Button.js';
import { ChevronDown } from 'lucide-react';

export default {
  title: 'Atomic/Dropdown',
  component: DropdownMenu,
};

export const Default = () => (
  <div className="p-8 flex justify-center">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          Select Strategy Model <ChevronDown className="w-3.5 h-3.5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Risk Models</DropdownMenuLabel>
        <DropdownMenuItem>Conservative (FTSO Yield)</DropdownMenuItem>
        <DropdownMenuItem>Balanced Hedge (USDT/WFLR)</DropdownMenuItem>
        <DropdownMenuItem>Aggressive Accumulation</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Configuration</DropdownMenuLabel>
        <DropdownMenuItem>Edit Limit Thresholds</DropdownMenuItem>
        <DropdownMenuItem className="text-red-400 focus:text-red-300">
          Disable Enclave Automated Executor
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);
