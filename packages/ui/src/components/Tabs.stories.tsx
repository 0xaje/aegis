import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs.js';

export default {
  title: 'Atomic/Tabs',
  component: Tabs,
};

export const Default = () => (
  <div className="max-w-md w-full p-4">
    <Tabs defaultValue="all">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="all">All Strategies</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="paused">Paused</TabsTrigger>
      </TabsList>

      <TabsContent
        value="all"
        className="bg-[#0c0e14]/30 border border-slate-900 rounded-lg p-4 text-xs text-slate-400 font-sans"
      >
        Displaying all 14 confidential models registered on Flare.
      </TabsContent>
      <TabsContent
        value="active"
        className="bg-[#0c0e14]/30 border border-slate-900 rounded-lg p-4 text-xs text-slate-400 font-sans"
      >
        Displaying 2 actively delegated models.
      </TabsContent>
      <TabsContent
        value="paused"
        className="bg-[#0c0e14]/30 border border-slate-900 rounded-lg p-4 text-xs text-slate-400 font-sans"
      >
        No paused strategies found.
      </TabsContent>
    </Tabs>
  </div>
);
