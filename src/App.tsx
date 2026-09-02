import React, { useState, useEffect } from 'react';
import { Terminal, Save, Download, Cpu, HardDrive, Wifi, Shield, Play, Settings, AlertTriangle, CheckCircle2, Activity, Server, FileText, Calendar, GitCompare, ListChecks, Layers, Search, Zap, History, Bell, ListOrdered, RefreshCw, GripVertical, Archive } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export type BuildPreset = {
  id?: string;
  name: string;
  description: string;
  model: string;
  osVersion: string;
  ipAddress: string;
  autoFlash: boolean;
  packages: string[];
  externalTarget: boolean;
  buildMethod: 'direct' | 'docker';
};

export default function App() {
  const [activeStep, setActiveStep] = useState(0); // Start at Dashboard
  
  const [config, setConfig] = useState<BuildPreset>({
    name: '',
    description: '',
    model: '7590',
    osVersion: '07.29',
    ipAddress: '192.168.178.1',
    autoFlash: false,
    packages: [],
    externalTarget: false,
    buildMethod: 'direct'
  });
  
  const handleConfigChange = (key: keyof BuildPreset, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };
  
  return (
    <div className="h-screen w-full bg-background text-zinc-300 font-sans flex flex-col overflow-hidden">
      
      {/* Header */}
      <header className="h-16 bg-panel border-b border-border flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-amber-500 font-bold text-xl tracking-tight leading-none">
            FREETZ-NG<br/>
            <span className="text-white font-light text-sm opacity-80">Builder Studio</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest text-amber-500 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-zinc-100">System Ready</span>
          </div>
          <span className="ml-4">Env: Debian/Ubuntu</span>
          <span>Target: {config.model}</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar Nav */}
        <aside className="w-64 bg-surface border-r border-border shrink-0 flex flex-col">
          <nav className="flex-1 p-4 space-y-2">
            <StepLink step={0} current={activeStep} onClick={() => setActiveStep(0)} label="Dashboard" icon={<Cpu className="w-4 h-4" />} />
            <StepLink step={1} current={activeStep} onClick={() => setActiveStep(1)} label="Hardware Config" icon={<Settings className="w-4 h-4" />} />
            <StepLink step={2} current={activeStep} onClick={() => setActiveStep(2)} label="Packages" icon={<HardDrive className="w-4 h-4" />} />
            <StepLink step={3} current={activeStep} onClick={() => setActiveStep(3)} label="Execution" icon={<Play className="w-4 h-4" />} />
            <StepLink step={4} current={activeStep} onClick={() => setActiveStep(4)} label="Build Queue" icon={<ListOrdered className="w-4 h-4" />} />
            <StepLink step={5} current={activeStep} onClick={() => setActiveStep(5)} label="Quick Flash" icon={<Zap className="w-4 h-4" />} />
            <StepLink step={6} current={activeStep} onClick={() => setActiveStep(6)} label="Logs History" icon={<History className="w-4 h-4" />} />
            <StepLink step={7} current={activeStep} onClick={() => setActiveStep(7)} label="Version Compare" icon={<GitCompare className="w-4 h-4" />} />
            <StepLink step={8} current={activeStep} onClick={() => setActiveStep(8)} label="Image Hub" icon={<Download className="w-4 h-4" />} />
          </nav>
          <div className="p-4 border-t border-border text-[10px] text-zinc-500 uppercase tracking-widest">
            v2.4.0-stable
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeStep === 0 && (
              <StepWrapper key="step0">
                <DashboardStep />
              </StepWrapper>
            )}
            {activeStep === 1 && (
              <StepWrapper key="step1">
                <ConfigStep config={config} onChange={handleConfigChange} onNext={() => setActiveStep(2)} />
              </StepWrapper>
            )}
            {activeStep === 2 && (
              <StepWrapper key="step2">
                <PackagesStep config={config} onChange={handleConfigChange} onNext={() => setActiveStep(3)} />
              </StepWrapper>
            )}
            {activeStep === 3 && (
              <StepWrapper key="step3">
                <ExecutionStep config={config} />
              </StepWrapper>
            )}
            {activeStep === 4 && (
              <StepWrapper key="step4">
                <BuildQueueStep />
              </StepWrapper>
            )}
            {activeStep === 5 && (
              <StepWrapper key="step5">
                <QuickFlashStep />
              </StepWrapper>
            )}
            {activeStep === 6 && (
              <StepWrapper key="step6">
                <LogsHistoryStep />
              </StepWrapper>
            )}
            {activeStep === 7 && (
              <StepWrapper key="step7">
                <VersionComparatorStep />
              </StepWrapper>
            )}
            {activeStep === 8 && (
              <StepWrapper key="step8">
                <ImageHubStep config={config} />
              </StepWrapper>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function StepLink({ step, current, onClick, label, icon }: { step: number, current: number, onClick: () => void, label: string, icon: React.ReactNode }) {
  const active = step === current;
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${active ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'text-zinc-400 hover:bg-[#27272a] hover:text-zinc-200'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function StepWrapper({ children }: { children: React.ReactNode, key?: React.Key }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="p-6 h-full flex flex-col"
    >
      {children}
    </motion.div>
  );
}

function ConfigStep({ config, onChange, onNext }: { config: BuildPreset, onChange: (k: keyof BuildPreset, v: any) => void, onNext: () => void }) {
  const [syncing, setSyncing] = useState(false);

  const syncPresets = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/sync-presets', { method: 'POST' });
      const data = await res.json();
      alert(data.message);
    } catch (e) {
      console.error(e);
    }
    setSyncing(false);
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h2 className="text-xl font-semibold text-zinc-100">Router Configuration</h2>
        <button 
          onClick={syncPresets} 
          disabled={syncing}
          className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-md hover:bg-white/5 disabled:opacity-50 text-xs text-zinc-300 font-medium transition-colors"
        >
          <RefreshCw className={`w-3 h-3 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing...' : 'Sync Presets'}
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500">Fritz!Box Model</label>
          <select 
            value={config.model} 
            onChange={e => onChange('model', e.target.value)}
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500 transition-colors"
          >
            <option value="7590">FRITZ!Box 7590</option>
            <option value="7560">FRITZ!Box 7560</option>
            <option value="7530">FRITZ!Box 7530</option>
            <option value="7520">FRITZ!Box 7520</option>
            <option value="7490">FRITZ!Box 7490</option>
            <option value="6591">FRITZ!Box 6591 Cable</option>
            <option value="3390">FRITZ!Box 3390</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500">FritzOS Version</label>
          <input 
            type="text" 
            value={config.osVersion}
            onChange={e => onChange('osVersion', e.target.value)}
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500">Target IP Address (LAN)</label>
          <input 
            type="text" 
            value={config.ipAddress}
            onChange={e => onChange('ipAddress', e.target.value)}
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500">Build Method</label>
          <select 
            value={config.buildMethod} 
            onChange={e => onChange('buildMethod', e.target.value)}
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500 transition-colors"
          >
            <option value="direct">Direct Build (Host)</option>
            <option value="docker">Docker Container</option>
          </select>
        </div>
        <div className="space-y-2 col-span-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-colors ${config.autoFlash ? 'bg-amber-500 border-amber-500' : 'border-border group-hover:border-zinc-500'}`}>
              {config.autoFlash && <CheckIcon />}
            </div>
            <span className="text-sm font-medium text-zinc-200">Auto-flash firmware via LAN upon completion</span>
          </label>
        </div>
      </div>

      <PresetManager currentConfig={config} onApply={(c) => {
        onChange('model', c.model);
        onChange('osVersion', c.osVersion);
        onChange('ipAddress', c.ipAddress);
        onChange('autoFlash', c.autoFlash);
        onChange('packages', c.packages);
      }} />

      <div className="mt-8 flex justify-end">
        <button onClick={onNext} className="bg-amber-500 rounded-md hover:bg-amber-400 text-black px-6 py-2 text-xs uppercase font-bold tracking-wider transition-colors">
          Next: Packages
        </button>
      </div>
    </div>
  );
}

const PACKAGES_DB = [
  { cat: 'Patches', icon: <Layers className="w-4 h-4" />, items: [
    { id: 'Remove brandings', req: [], conf: [] },
    { id: 'Replace kernel', req: [], conf: [] },
    { id: 'Freetzmount', req: [], conf: [] },
    { id: 'Maxdev', req: [], conf: [] }
  ]},
  { cat: 'Themes', icon: <Play className="w-4 h-4" />, items: [
    { id: 'Cuma', req: [], conf: [] },
    { id: 'Legacy', req: [], conf: [] },
    { id: 'Newfreetz', req: [], conf: [] },
    { id: 'Phoenix', req: [], conf: [] }
  ]},
  { cat: 'Network', icon: <Wifi className="w-4 h-4" />, items: [
    { id: 'Dnsmasq', req: [], conf: ['dnsd'] },
    { id: 'dnsd', req: [], conf: ['Dnsmasq'] },
    { id: 'Downloader', req: [], conf: [] },
    { id: 'Mosquitto', req: ['libssl', 'libcrypto'], conf: [] },
    { id: 'NFS-Server', req: [], conf: [] },
    { id: 'Wake-on-LAN', req: [], conf: [] },
    { id: 'OpenVPN', req: ['libssl', 'liblzo2'], conf: [] },
    { id: 'WireGuard', req: ['Replace kernel'], conf: [] }
  ]},
  { cat: 'System', icon: <Settings className="w-4 h-4" />, items: [
    { id: 'Dropbear', req: [], conf: [] },
    { id: 'Inetd', req: [], conf: [] },
    { id: 'Syslogd', req: [], conf: [] },
    { id: 'Swap', req: [], conf: [] },
    { id: 'cronD', req: [], conf: [] },
    { id: 'onlinechanged', req: [], conf: [] },
    { id: 'Screen', req: [], conf: [] },
    { id: 'SSH authorized-keys', req: [], conf: [] },
    { id: 'Addhole', req: [], conf: [] }
  ]},
  { cat: 'Misc / Tools', icon: <Terminal className="w-4 h-4" />, items: [
    { id: 'LCD4linux', req: [], conf: [] },
    { id: 'tcpdump', req: [], conf: [] },
    { id: 'strace', req: [], conf: [] },
    { id: 'nano', req: [], conf: [] },
    { id: 'htop', req: [], conf: [] },
    { id: 'mc', req: [], conf: [] }
  ]},
  { cat: 'Libraries', icon: <Archive className="w-4 h-4" />, items: [
    { id: 'libcrypto', req: [], conf: [] },
    { id: 'libssl', req: [], conf: [] },
    { id: 'liblzo2', req: [], conf: [] },
    { id: 'zlib', req: [], conf: [] }
  ]}
];

function PackagesStep({ config, onChange, onNext }: { config: BuildPreset, onChange: (k: keyof BuildPreset, v: any) => void, onNext: () => void }) {
  const [alertMsg, setAlertMsg] = useState<{ type: 'error' | 'info', text: string } | null>(null);
  const [search, setSearch] = useState('');

  const flatDb = PACKAGES_DB.flatMap(c => c.items);
  const allIds = flatDb.map(i => i.id);

  const filteredDB = PACKAGES_DB.map(cat => ({
    ...cat,
    items: cat.items.filter(pkg => pkg.id.toLowerCase().includes(search.toLowerCase()))
  })).filter(cat => cat.items.length > 0);

  const togglePackage = (pkgId: string) => {
    const isSelected = config.packages.includes(pkgId);
    let newPkgs = [...config.packages];

    const pkgNode = flatDb.find(p => p.id === pkgId);
    if (!pkgNode) return;

    if (isSelected) {
      newPkgs = newPkgs.filter(p => p !== pkgId);
      setAlertMsg(null);
    } else {
      // Check conflicts
      const conflict = pkgNode.conf.find(c => config.packages.includes(c));
      if (conflict) {
        setAlertMsg({ type: 'error', text: `Cannot select ${pkgId}. It conflicts with ${conflict}.` });
        setTimeout(() => setAlertMsg(null), 3000);
        return;
      }
      
      newPkgs.push(pkgId);

      // Auto-resolve dependencies
      const addedDeps: string[] = [];
      pkgNode.req.forEach(reqPkg => {
        if (!newPkgs.includes(reqPkg)) {
          newPkgs.push(reqPkg);
          addedDeps.push(reqPkg);
        }
      });
      
      if (addedDeps.length > 0) {
        setAlertMsg({ type: 'info', text: `Auto-selected dependencies for ${pkgId}: ${addedDeps.join(', ')}` });
        setTimeout(() => setAlertMsg(null), 3000);
      } else {
        setAlertMsg(null);
      }
    }
    onChange('packages', newPkgs);
  };

  const handleExternalToggle = () => {
    const nextExt = !config.externalTarget;
    onChange('externalTarget', nextExt);
    if (nextExt && !config.packages.includes('Freetzmount')) {
      onChange('packages', [...config.packages, 'Freetzmount']);
      setAlertMsg({ type: 'info', text: 'Auto-selected Freetzmount patch required for .external (uStor) offloading.' });
      setTimeout(() => setAlertMsg(null), 3000);
    }
  };

  const toggleCategory = (items: {id: string}[]) => {
    const itemIds = items.map(i => i.id);
    const allSelected = itemIds.every(item => config.packages.includes(item));
    if (allSelected) {
      onChange('packages', config.packages.filter(p => !itemIds.includes(p)));
    } else {
      let newPkgs = [...config.packages];
      itemIds.forEach(item => {
        if (!newPkgs.includes(item)) newPkgs.push(item); // Simple selection, no deep auto-resolve on category select to avoid mass chaos
      });
      onChange('packages', newPkgs);
    }
  };

  return (
    <div className="max-w-6xl flex flex-col h-full relative">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h2 className="text-xl font-semibold text-zinc-100">Package & Patch Selection</h2>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search packages..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-background border border-border rounded-md pl-8 pr-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 transition-colors w-48"
            />
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2 pointer-events-none" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer bg-surface border border-border px-3 py-1.5 rounded-md hover:border-amber-500/50 transition-colors">
            <div className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${config.externalTarget ? 'bg-amber-500 border-amber-500' : 'border-zinc-600'}`}>
              {config.externalTarget && <CheckIcon />}
            </div>
            <span className="text-xs font-bold text-zinc-200">Enable .external (uStor)</span>
          </label>
          <div className="w-px h-6 bg-border mx-2"></div>
          <button 
            onClick={() => onChange('packages', allIds)}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-md hover:bg-white/5 text-xs text-zinc-300 font-medium transition-colors"
          >
            <ListChecks className="w-3 h-3" /> Select All
          </button>
          <button 
            onClick={() => onChange('packages', [])}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-md hover:bg-white/5 text-xs text-zinc-300 font-medium transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
      
      {/* Alert Banner */}
      <AnimatePresence>
        {alertMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className={`absolute top-16 left-0 right-0 z-10 px-4 py-2 rounded-md text-xs font-bold shadow-lg flex items-center gap-2 ${alertMsg.type === 'error' ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}
          >
            <AlertTriangle className="w-4 h-4" />
            {alertMsg.text}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 overflow-y-auto pr-2 pb-8 mt-2">
        {filteredDB.map(cat => {
          const catSelectedCount = cat.items.filter(item => config.packages.includes(item.id)).length;
          const isAllSelected = catSelectedCount === cat.items.length;
          
          return (
            <div key={cat.cat} className="bg-surface border border-border p-4 rounded-xl flex flex-col max-h-80">
              <div className="flex items-center justify-between text-amber-500 mb-3 border-b border-border pb-2 shrink-0">
                <div className="flex items-center gap-2">
                  {cat.icon}
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-zinc-300">{cat.cat}</h3>
                </div>
                <button 
                  onClick={() => toggleCategory(cat.items)}
                  className="text-[10px] text-zinc-500 hover:text-amber-500 uppercase tracking-widest font-mono transition-colors"
                >
                  {isAllSelected ? 'Deselect' : 'Select'}
                </button>
              </div>
              <div className="space-y-1 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                {cat.items.map(pkg => (
                  <div key={pkg.id} className="flex items-center justify-between py-1 hover:bg-white/5 px-2 -mx-2 rounded-md transition-colors cursor-pointer" onClick={() => togglePackage(pkg.id)}>
                    <label className="flex items-center gap-3 cursor-pointer group pointer-events-none">
                      <div className={`w-3.5 h-3.5 border rounded-sm flex items-center justify-center shrink-0 transition-colors ${config.packages.includes(pkg.id) ? 'bg-amber-500 border-amber-500' : 'border-zinc-600 group-hover:border-zinc-400'}`}>
                        {config.packages.includes(pkg.id) && <CheckIcon />}
                      </div>
                      <span className={`text-sm transition-colors ${config.packages.includes(pkg.id) ? 'text-zinc-100 font-medium' : 'text-zinc-400'}`}>{pkg.id}</span>
                    </label>
                    {(pkg.req.length > 0 || pkg.conf.length > 0) && (
                      <div className="flex gap-1">
                        {pkg.req.length > 0 && <span className="text-[8px] uppercase tracking-widest bg-blue-500/10 text-blue-500 px-1 py-0.5 rounded" title={`Requires: ${pkg.req.join(', ')}`}>REQ</span>}
                        {pkg.conf.length > 0 && <span className="text-[8px] uppercase tracking-widest bg-red-500/10 text-red-500 px-1 py-0.5 rounded" title={`Conflicts: ${pkg.conf.join(', ')}`}>CONF</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto flex justify-between shrink-0 pt-4 border-t border-border">
        <div className="flex flex-col">
          <div className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 flex items-center">
            Selected: <span className="text-amber-500 text-sm ml-1 mr-3">{config.packages.length}</span> items
            <span className="mx-2 text-border">|</span>
            Est. Time: <span className="text-zinc-300 ml-1 mr-3">{5 + Math.ceil(config.packages.length * 0.8)} min</span>
            <span className="mx-2 text-border">|</span>
            Est. Size: <span className="text-zinc-300 ml-1">{24 + (config.packages.length * 1.2)} MB</span>
          </div>
          {config.externalTarget && (
            <div className="text-xs text-blue-400 mt-1 flex items-center gap-1 font-medium">
              <HardDrive className="w-3 h-3" /> External uStor mode active
            </div>
          )}
        </div>
        <button onClick={onNext} className="bg-amber-500 rounded-md hover:bg-amber-400 text-black px-6 py-2 text-xs uppercase font-bold tracking-wider transition-colors shadow-lg shadow-amber-500/20">
          Next: Execution
        </button>
      </div>
    </div>
  );
}

function LogLine({ text }: { text: string }) {
  let color = 'text-zinc-300';
  let isPrefix = false;

  const tLow = text.toLowerCase();
  if (tLow.includes('error:') || tLow.includes('failed')) {
    color = 'text-red-400 font-bold';
  } else if (tLow.includes('warning:')) {
    color = 'text-amber-400 font-medium';
  } else if (tLow.includes('success') || tLow.includes('done')) {
    color = 'text-green-400 font-bold';
  } else if (text.startsWith('>')) {
    color = 'text-blue-400';
    isPrefix = true;
  } else if (text.includes('make[')) {
    color = 'text-purple-400';
  } else if (text.includes('/usr/') || text.includes('/opt/')) {
    color = 'text-cyan-400';
  }

  const timestampMatch = text.match(/^(\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\])/);
  if (timestampMatch) {
    const ts = timestampMatch[1];
    const rest = text.substring(ts.length);
    return (
      <div>
        <span className="text-zinc-600 mr-2">{ts}</span>
        <span className={color}>{rest}</span>
      </div>
    );
  }

  return (
    <div>
      <span className="text-zinc-500 mr-2">{isPrefix ? '' : '$'}</span>
      <span className={color}>{text}</span>
    </div>
  );
}

function ExecutionStep({ config }: { config: BuildPreset }) {
  const [script, setScript] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleTime, setScheduleTime] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const generateScript = async () => {
    try {
      const res = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      const data = await res.json();
      setScript(data.script);
    } catch (e) {
      console.error(e);
    }
  };

  const scheduleBuild = async () => {
    if (!scheduleTime) return;
    try {
      await fetch('/api/schedule-build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scheduleTime, config })
      });
      setShowSchedule(false);
      alert(`Build successfully scheduled for ${scheduleTime}`);
    } catch (e) {
      console.error(e);
    }
  };

  const startBuild = () => {
    if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }

    setIsRunning(true);
    setLogs([]);
    setProgress(0);
    
    const es = new EventSource('/api/build-stream');
    es.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.done) {
        es.close();
        setIsRunning(false);
        setProgress(100);
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("Build Complete", { body: `Firmware for ${config.model} has been successfully compiled.` });
        }
      } else {
        setLogs(prev => [...prev, data.log]);
        setProgress(data.progress);
      }
    };
    es.onerror = () => {
      es.close();
      setIsRunning(false);
    };
  };

  const exportLogs = () => {
    if (logs.length === 0) return;
    const blob = new Blob([logs.join('\\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `build-logs-${config.model}-${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col relative">
      <ConfirmModal 
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={startBuild}
        title="Initiate Build Process"
        message="Are you sure you want to execute the build scripts on your host environment? This will download packages, run compilations, and potentially flash your hardware."
        confirmText="Start Build"
      />

      {showSchedule && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface border border-border rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 text-blue-500 mb-4">
                <Calendar className="w-6 h-6" />
                <h3 className="text-lg font-bold text-zinc-100">Schedule Build</h3>
              </div>
              <p className="text-sm text-zinc-300 mb-4">Set a cron expression or a specific time to schedule this build pipeline.</p>
              <input 
                type="text" 
                placeholder="e.g. 0 2 * * * (Daily at 2 AM)"
                value={scheduleTime}
                onChange={e => setScheduleTime(e.target.value)}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="px-6 py-4 bg-[#111114] border-t border-border flex justify-end gap-3">
              <button onClick={() => setShowSchedule(false)} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors">
                Cancel
              </button>
              <button onClick={scheduleBuild} disabled={!scheduleTime} className="px-4 py-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors">
                Schedule
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h2 className="text-xl font-semibold text-zinc-100">Build Execution</h2>
        <div className="flex gap-3">
          <button onClick={generateScript} className="border border-border rounded-md hover:bg-white/5 text-zinc-300 px-4 py-1.5 text-xs uppercase font-bold tracking-wider transition-colors">
            Generate Script
          </button>
          <button 
            onClick={() => setShowSchedule(true)} 
            disabled={isRunning}
            className="border border-border rounded-md hover:bg-white/5 disabled:opacity-50 text-zinc-300 px-4 py-1.5 text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-2"
          >
            Schedule
            <Calendar className="w-3 h-3" />
          </button>
          <button 
            onClick={() => setShowConfirm(true)} 
            disabled={isRunning}
            className="bg-amber-500 rounded-md hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black px-6 py-1.5 text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-2"
          >
            {isRunning ? 'Building...' : 'Start Build'}
            <Play className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
        
        {/* Script Viewer */}
        <div className="bg-panel border border-border flex flex-col min-h-0 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
          <div className="flex items-center justify-between p-3 border-b border-border bg-surface shrink-0">
            <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">install.sh</span>
            <button className="text-zinc-400 hover:text-amber-500 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 overflow-y-auto flex-1 font-mono text-xs text-zinc-300 whitespace-pre">
            {script || '// Click "Generate Script" to preview the bash payload.'}
          </div>
        </div>

        {/* Console Output */}
        <div className="bg-[#0d0d0f] border border-border flex flex-col min-h-0 relative rounded-xl overflow-hidden shadow-2xl shadow-black/50">
          <div className="bg-[#1c1c21] px-4 py-2 flex items-center justify-between border-b border-border shrink-0">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search logs..." 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="bg-background border border-border rounded text-[10px] px-2 py-1 text-zinc-300 w-32 focus:outline-none focus:border-amber-500 transition-colors"
                />
                <Search className="w-3 h-3 text-zinc-500 absolute right-2 top-1.5 pointer-events-none" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">terminal session: build-tools</span>
              <button 
                onClick={exportLogs} 
                disabled={logs.length === 0}
                className="text-zinc-400 hover:text-amber-500 disabled:opacity-50 transition-colors flex items-center gap-1"
                title="Export Logs"
              >
                <FileText className="w-3 h-3" />
              </button>
            </div>
          </div>
          
          <div className="p-6 overflow-y-auto flex-1 font-mono text-xs text-zinc-300 space-y-1.5 custom-scrollbar">
            {logs.length === 0 && !isRunning && <div className="text-zinc-500">Waiting for build to start...</div>}
            {logs.filter(log => log.toLowerCase().includes(searchTerm.toLowerCase())).map((log, i) => (
              <div key={i}><LogLine text={log} /></div>
            ))}
            {isRunning && <div className="animate-pulse text-amber-400">_</div>}
          </div>

          {(isRunning || progress > 0) && (
            <div className="absolute bottom-0 left-0 right-0 bg-[#1c1c21] border-t border-border p-3 flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-zinc-400">
                <span className={progress >= 20 ? 'text-amber-500' : ''}>Setup</span>
                <span className={progress >= 50 ? 'text-amber-500' : ''}>Compile</span>
                <span className={progress >= 100 ? 'text-amber-500' : ''}>Complete</span>
              </div>
              <div className="h-1.5 bg-background rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 transition-all duration-300 ease-out" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function PresetManager({ currentConfig, onApply }: { currentConfig: BuildPreset, onApply: (c: BuildPreset) => void }) {
  const [presets, setPresets] = useState<BuildPreset[]>([]);
  const [saving, setSaving] = useState(false);
  const [presetName, setPresetName] = useState('');

  const PREDEFINED_PRESETS = [
    { cat: 'Starter / Minimal', items: [
      { id: 'pre-1', name: 'Stock + Patches', description: 'Base firmware with branding removal and Freetzmount.', model: '7590', osVersion: '07.29', ipAddress: '192.168.178.1', autoFlash: false, externalTarget: false, buildMethod: 'direct' as const, packages: ['Remove brandings', 'Freetzmount'] },
    ]},
    { cat: 'Network & Security', items: [
      { id: 'pre-2', name: 'VPN Hub', description: 'Secure tunneling with OpenVPN and Dropbear.', model: '7530', osVersion: '07.29', ipAddress: '192.168.178.1', autoFlash: false, externalTarget: false, buildMethod: 'direct' as const, packages: ['Remove brandings', 'OpenVPN', 'Dropbear', 'libssl', 'liblzo2'] },
      { id: 'pre-3', name: 'Ad-Blocker', description: 'DNS level blocking with Addhole and Dnsmasq.', model: '7490', osVersion: '07.29', ipAddress: '192.168.178.1', autoFlash: false, externalTarget: false, buildMethod: 'direct' as const, packages: ['Remove brandings', 'Dnsmasq', 'Addhole'] },
    ]},
    { cat: 'Advanced Sandbox', items: [
      { id: 'pre-4', name: 'Maxdev Environment', description: 'Full compilation suite with kernel replace.', model: '6591', osVersion: '07.29', ipAddress: '192.168.178.1', autoFlash: false, externalTarget: true, buildMethod: 'docker' as const, packages: ['Maxdev', 'Replace kernel', 'Freetzmount', 'strace', 'tcpdump'] },
    ]}
  ];

  const fetchPresets = async () => {
    try {
      const res = await fetch('/api/presets');
      const data = await res.json();
      setPresets(data);
    } catch (e) {
      console.error(e);
    }
  };

  const savePreset = async () => {
    if (!presetName.trim()) return;
    setSaving(true);
    try {
      await fetch('/api/presets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...currentConfig,
          name: presetName,
          id: undefined
        })
      });
      setPresetName('');
      fetchPresets();
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  return (
    <div className="mt-8 border-t border-border pt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">Preset Library</h3>
        <button onClick={fetchPresets} className="text-[10px] uppercase font-mono tracking-widest text-amber-500 hover:text-amber-400">
          Refresh Custom List
        </button>
      </div>

      <div className="space-y-6 mb-8">
        {PREDEFINED_PRESETS.map(category => (
          <div key={category.cat}>
            <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">{category.cat}</h4>
            <div className="grid grid-cols-2 gap-4">
              {category.items.map(p => (
                <div key={p.id} className="bg-surface border border-border p-4 rounded-xl flex justify-between items-center group hover:border-amber-500/30 transition-colors">
                  <div>
                    <div className="font-semibold text-sm text-zinc-200">{p.name}</div>
                    <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mt-1">
                      {p.model} | {p.packages.length} PKGS
                    </div>
                  </div>
                  <button 
                    onClick={() => onApply(p)}
                    className="text-xs uppercase tracking-wider font-bold text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 bg-amber-500/10 rounded"
                  >
                    Load
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Custom Presets</h4>
      <div className="flex gap-4 mb-6">
        <input 
          type="text" 
          placeholder="New preset name..." 
          value={presetName}
          onChange={e => setPresetName(e.target.value)}
          className="flex-1 bg-surface border border-border px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500 transition-colors"
        />
        <button 
          onClick={savePreset}
          disabled={saving || !presetName.trim()}
          className="bg-panel border border-border hover:border-amber-500 disabled:opacity-50 text-zinc-200 px-4 py-2 text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-2"
        >
          <Save className="w-3 h-3" /> Save Preset
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {presets.map(p => (
          <div key={p.id} className="bg-surface border border-border p-4 rounded-xl flex justify-between items-center group">
            <div>
              <div className="font-semibold text-sm text-zinc-200">{p.name}</div>
              <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mt-1">
                {p.model} | {p.packages.length} PKGS
              </div>
            </div>
            <button 
              onClick={() => onApply(p)}
              className="text-xs uppercase tracking-wider font-bold text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Load
            </button>
          </div>
        ))}
        {presets.length === 0 && (
          <div className="col-span-2 text-center py-6 border border-dashed border-border text-zinc-500 text-sm">
            No custom global presets saved yet.
          </div>
        )}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-black" stroke="currentColor" strokeWidth={3}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function VersionComparatorStep() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const compareVersions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/compare-versions');
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h2 className="text-xl font-semibold text-zinc-100">Version Comparator</h2>
        <button 
          onClick={compareVersions} 
          disabled={loading}
          className="bg-amber-500 rounded-md hover:bg-amber-400 disabled:opacity-50 text-black px-6 py-2 text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-2"
        >
          {loading ? 'Comparing...' : 'Run Comparison'}
          <GitCompare className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-4 pb-12">
        {!data ? (
          <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-xl">
            <span className="text-sm text-zinc-500">Click "Run Comparison" to analyze package changes between Freetz-NG versions.</span>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl justify-center">
              <span className="text-lg font-bold text-zinc-300">{data.baseVersion}</span>
              <span className="text-zinc-500">→</span>
              <span className="text-lg font-bold text-amber-500">{data.targetVersion}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#111114] border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="bg-[#1c1c21] px-4 py-2 border-b border-border flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <h3 className="text-xs uppercase font-bold text-zinc-200 tracking-wider">Added Packages</h3>
                </div>
                <div className="p-4 space-y-2">
                  {data.added.map((pkg: string, i: number) => (
                    <div key={i} className="text-sm text-green-400 font-mono">+ {pkg}</div>
                  ))}
                  {data.added.length === 0 && <div className="text-sm text-zinc-500">None</div>}
                </div>
              </div>

              <div className="bg-[#111114] border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="bg-[#1c1c21] px-4 py-2 border-b border-border flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <h3 className="text-xs uppercase font-bold text-zinc-200 tracking-wider">Removed Packages</h3>
                </div>
                <div className="p-4 space-y-2">
                  {data.removed.map((pkg: string, i: number) => (
                    <div key={i} className="text-sm text-red-400 font-mono">- {pkg}</div>
                  ))}
                  {data.removed.length === 0 && <div className="text-sm text-zinc-500">None</div>}
                </div>
              </div>

              <div className="bg-[#111114] border border-border rounded-xl overflow-hidden shadow-sm md:col-span-2">
                <div className="bg-[#1c1c21] px-4 py-2 border-b border-border flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <h3 className="text-xs uppercase font-bold text-zinc-200 tracking-wider">Updated Packages</h3>
                </div>
                <div className="p-4 space-y-2">
                  {data.updated.map((pkg: string, i: number) => (
                    <div key={i} className="text-sm text-blue-400 font-mono">~ {pkg}</div>
                  ))}
                  {data.updated.length === 0 && <div className="text-sm text-zinc-500">None</div>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ImageHubStep({ config }: { config: BuildPreset }) {
  const dummyImages = [
    { id: 'img-1', model: '7590', os: '07.29', date: '2023-10-01', size: '28.4 MB', pkgs: 'OpenVPN, Nano, htop' },
    { id: 'img-2', model: '7590', os: '07.50', date: '2023-11-15', size: '30.1 MB', pkgs: 'WireGuard, mc, dnsmasq' },
    { id: 'img-3', model: '7530', os: '07.29', date: '2023-09-20', size: '25.2 MB', pkgs: 'OpenVPN' },
    { id: 'img-4', model: '6591', os: '07.29', date: '2023-12-05', size: '32.8 MB', pkgs: 'WireGuard, Transmission' }
  ];

  const filteredImages = dummyImages.filter(img => img.model === config.model);

  return (
    <div className="h-full flex flex-col max-w-4xl">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h2 className="text-xl font-semibold text-zinc-100">Freetz-NG Image Hub</h2>
        <div className="text-[10px] font-mono tracking-widest text-amber-500 uppercase">
          Filtered for {config.model}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-4">
        <div className="space-y-4">
          {filteredImages.length === 0 && (
            <div className="text-center py-12 border border-dashed border-border text-zinc-500">
              No prebuilt images found for {config.model}. Try another model or build from source.
            </div>
          )}
          {filteredImages.map(img => (
            <div key={img.id} className="bg-surface border border-border p-4 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-zinc-500 transition-colors">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-zinc-200">FritzOS {img.os}</span>
                  <span className="bg-panel border border-border text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 text-amber-500">
                    {img.model}
                  </span>
                </div>
                <div className="text-xs text-zinc-400 mb-2">Packages: {img.pkgs}</div>
                <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  Built: {img.date} | Size: {img.size}
                </div>
              </div>
              <div className="flex gap-3">
                <button className="border border-border rounded-md hover:bg-white/5 text-zinc-300 px-4 py-2 text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" /> Download
                </button>
                <button className="bg-amber-500 rounded-md hover:bg-amber-400 text-black px-4 py-2 text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-2">
                  <Play className="w-4 h-4" /> Flash
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t border-border flex justify-between items-center shrink-0">
         <span className="text-xs text-zinc-500">Images are community-provided. Use at your own risk.</span>
      </div>
    </div>
  );
}

function DashboardStep() {
  const [dockerStatus, setDockerStatus] = useState<any>(null);
  const [buildHealth, setBuildHealth] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/docker-status').then(r => r.json()).then(setDockerStatus).catch(() => {});
    fetch('/api/build-health').then(r => r.json()).then(setBuildHealth).catch(() => {});
    fetch('/api/system-alerts').then(r => r.json()).then(setAlerts).catch(() => {});
    
    // Poll resources
    const fetchResources = () => {
      fetch('/api/system-resources').then(r => r.json()).then(setResources).catch(() => {});
    };
    fetchResources();
    const interval = setInterval(fetchResources, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-5xl flex flex-col gap-8 pb-12">
      <div>
        <h2 className="text-xl font-semibold text-zinc-100 mb-6">System Dashboard</h2>
        
        {alerts.length > 0 && (
          <div className="mb-8 space-y-3">
            {alerts.map((alert: any) => (
              <div key={alert.id} className={`p-4 rounded-xl border flex items-start gap-3 ${alert.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-amber-500/10 border-amber-500/30 text-amber-500'}`}>
                <Bell className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">{alert.type === 'error' ? 'System Error' : 'System Warning'}</h4>
                  <p className="text-xs opacity-90 mt-1">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface border border-border p-5 rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Docker Daemon</p>
              <p className="text-lg font-bold text-zinc-100">
                {dockerStatus ? (dockerStatus.running ? 'RUNNING' : 'STOPPED') : 'LOADING...'}
              </p>
              {dockerStatus && dockerStatus.running && (
                <p className="text-xs text-zinc-400 mt-1">{dockerStatus.activeContainers} Containers • v{dockerStatus.version}</p>
              )}
            </div>
          </div>

          <div className="bg-surface border border-border p-5 rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">System Load</p>
              <p className="text-lg font-bold text-zinc-100">
                {dockerStatus ? dockerStatus.memoryUsage : 'LOADING...'}
              </p>
              <p className="text-xs text-zinc-400 mt-1">Memory Allocation</p>
            </div>
          </div>

          <div className="bg-surface border border-border p-5 rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Environment</p>
              <p className="text-lg font-bold text-zinc-100">READY</p>
              <p className="text-xs text-zinc-400 mt-1">Debian Build Host</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300 mb-6">Build Health (7 Days)</h3>
          <div className="h-64 w-full">
            {buildHealth.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={buildHealth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111114', borderColor: '#27272a', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="success" stroke="#10b981" fillOpacity={1} fill="url(#colorSuccess)" name="Successful Builds" />
                  <Area type="monotone" dataKey="failed" stroke="#ef4444" fillOpacity={1} fill="url(#colorFailed)" name="Failed Builds" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500">Loading chart data...</div>
            )}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 shadow-sm flex flex-col">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300 mb-6">Resource Monitoring (Live)</h3>
          <div className="h-64 w-full flex-1">
            {resources.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={resources} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111114', borderColor: '#27272a', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="cpu" stroke="#f59e0b" fillOpacity={1} fill="url(#colorCpu)" name="CPU Usage %" />
                  <Area type="monotone" dataKey="memory" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMem)" name="Memory Usage %" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500">Loading resources...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickFlashStep() {
  const [ip, setIp] = useState('192.168.178.1');
  const [file, setFile] = useState<File | null>(null);
  const [flashing, setFlashing] = useState(false);

  const handleFlash = async () => {
    if (!file || !ip) return;
    setFlashing(true);
    try {
      const res = await fetch('/api/quick-flash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip, filename: file.name })
      });
      const data = await res.json();
      alert(data.message);
    } catch (e) {
      console.error(e);
    }
    setFlashing(false);
  };

  return (
    <div className="max-w-2xl h-full flex flex-col">
      <h2 className="text-xl font-semibold text-zinc-100 mb-6 shrink-0">Quick Flash Tool</h2>
      <div className="bg-surface border border-border p-6 rounded-xl flex-1 flex flex-col gap-6">
        <div>
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">Target Router IP Address</label>
          <input 
            type="text" 
            value={ip}
            onChange={e => setIp(e.target.value)}
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">Firmware Image (.image)</label>
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-background/50 flex flex-col items-center justify-center gap-4">
            <HardDrive className="w-8 h-8 text-zinc-500" />
            <input 
              type="file" 
              accept=".image" 
              onChange={e => setFile(e.target.files?.[0] || null)}
              className="text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-amber-500/10 file:text-amber-500 hover:file:bg-amber-500/20"
            />
            {file && <span className="text-xs text-amber-500 font-mono mt-2">{file.name}</span>}
          </div>
        </div>
        <div className="mt-auto flex justify-end">
          <button 
            onClick={handleFlash}
            disabled={!file || !ip || flashing}
            className="bg-amber-500 rounded-md hover:bg-amber-400 disabled:opacity-50 text-black px-8 py-2.5 text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            {flashing ? 'Flashing...' : 'Initiate Flash'}
            <Zap className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function LogsHistoryStep() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLogs, setSelectedLogs] = useState<string[] | null>(null);

  useEffect(() => {
    fetch('/api/logs-history')
      .then(r => r.json())
      .then(data => {
        setHistory(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const exportResults = () => {
    if (history.length === 0) return;
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `build-history-export-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h2 className="text-xl font-semibold text-zinc-100">Build Logs History</h2>
        <button 
          onClick={exportResults}
          disabled={history.length === 0 || loading}
          className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-md hover:bg-white/5 disabled:opacity-50 text-xs text-zinc-300 font-medium transition-colors"
        >
          Export Results <Download className="w-3 h-3" />
        </button>
      </div>
      
      {selectedLogs ? (
        <div className="flex-1 flex flex-col min-h-0">
          <button 
            onClick={() => setSelectedLogs(null)}
            className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-200 self-start flex items-center gap-2"
          >
            ← Back to History
          </button>
          <div className="bg-[#0d0d0f] border border-border flex flex-col min-h-0 relative rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-[#1c1c21] px-4 py-2 border-b border-border shrink-0">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">terminal session: historical-log</span>
            </div>
            <div className="p-6 overflow-y-auto flex-1 font-mono text-xs text-zinc-300 space-y-1.5 custom-scrollbar">
              {selectedLogs.map((log, i) => (
                <div key={i}><LogLine text={log} /></div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-4 space-y-4">
          {loading ? (
            <div className="text-zinc-500 text-sm">Loading history...</div>
          ) : history.length === 0 ? (
            <div className="text-zinc-500 text-sm">No historical builds found.</div>
          ) : (
            history.map(item => (
              <div key={item.id} className="bg-surface border border-border p-4 rounded-xl flex items-center justify-between hover:border-zinc-500 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.status === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {item.status === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="font-bold text-zinc-200 text-sm">{item.id} <span className="text-zinc-500 font-mono font-normal ml-2">{item.model}</span></div>
                    <div className="text-xs text-zinc-400 mt-1">{item.date}</div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedLogs(item.logs)}
                  className="px-4 py-2 border border-border rounded-md hover:bg-white/5 text-xs text-zinc-300 font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  View Logs <FileText className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText }: { isOpen: boolean, onClose: () => void, onConfirm: () => void, title: string, message: string, confirmText: string }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface border border-border rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 text-amber-500 mb-4">
            <AlertTriangle className="w-6 h-6" />
            <h3 className="text-lg font-bold text-zinc-100">{title}</h3>
          </div>
          <p className="text-sm text-zinc-300">{message}</p>
        </div>
        <div className="px-6 py-4 bg-[#111114] border-t border-border flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors">
            Cancel
          </button>
          <button onClick={() => { onConfirm(); onClose(); }} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider rounded-md transition-colors">
            {confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function BuildQueueStep() {
  const [queue, setQueue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [batching, setBatching] = useState(false);
  
  const [dragItem, setDragItem] = useState<number | null>(null);
  const [dragOverItem, setDragOverItem] = useState<number | null>(null);
  
  const [viewHistory, setViewHistory] = useState(false);
  const [batchHistory, setBatchHistory] = useState<any[]>([]);

  const fetchQueue = () => {
    if (viewHistory) return;
    fetch('/api/build-queue')
      .then(r => r.json())
      .then(data => {
        setQueue(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 3000);
    return () => clearInterval(interval);
  }, [viewHistory]);

  useEffect(() => {
    if (viewHistory && batchHistory.length === 0) {
      fetch('/api/batch-history')
        .then(r => r.json())
        .then(setBatchHistory)
        .catch(console.error);
    }
  }, [viewHistory]);

  const triggerBatch = async () => {
    setBatching(true);
    try {
      await fetch('/api/batch-process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          configs: [
            { model: '7530', packages: ['OpenVPN'] },
            { model: '7490', packages: ['WireGuard', 'nano'] }
          ]
        })
      });
      fetchQueue();
    } catch (e) {
      console.error(e);
    }
    setBatching(false);
  };

  const handleSort = async () => {
    if (dragItem !== null && dragOverItem !== null && dragItem !== dragOverItem) {
      const newQueue = [...queue];
      const draggedItemContent = newQueue.splice(dragItem, 1)[0];
      newQueue.splice(dragOverItem, 0, draggedItemContent);
      setQueue(newQueue);
      
      try {
        await fetch('/api/reorder-queue', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ queue: newQueue })
        });
      } catch(e) {
        console.error(e);
      }
    }
    setDragItem(null);
    setDragOverItem(null);
  };

  return (
    <div className="max-w-5xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Build Queue & Batch</h2>
          <p className="text-xs text-zinc-500 mt-1">Monitor active pipelines and initiate batch compilations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setViewHistory(!viewHistory)}
            className={`border border-border rounded-md px-4 py-2 text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-2 ${viewHistory ? 'bg-amber-500/10 text-amber-500 border-amber-500/30' : 'hover:bg-white/5 text-zinc-300'}`}
          >
            {viewHistory ? 'Back to Queue' : 'Batch History'}
            <Archive className="w-4 h-4" />
          </button>
          {!viewHistory && (
            <button 
              onClick={triggerBatch}
              disabled={batching}
              className="bg-amber-500 rounded-md hover:bg-amber-400 disabled:opacity-50 text-black px-6 py-2 text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-2"
            >
              {batching ? 'Dispatching...' : 'Batch Process Standards'}
              <Layers className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-4 space-y-4">
        {viewHistory ? (
          batchHistory.length === 0 ? (
            <div className="text-zinc-500 text-sm">Loading history...</div>
          ) : (
            batchHistory.map(batch => (
              <div key={batch.batchId} className="bg-surface border border-border p-5 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-zinc-200 text-sm">{batch.batchId}</div>
                  <div className="text-xs text-zinc-400 mt-1">{batch.date} • {batch.models.join(', ')}</div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-xl font-bold text-zinc-200">{batch.total}</div>
                    <div className="text-[10px] uppercase tracking-widest text-zinc-500">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-500">{batch.successful}</div>
                    <div className="text-[10px] uppercase tracking-widest text-green-500/70">Success</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-red-500">{batch.failed}</div>
                    <div className="text-[10px] uppercase tracking-widest text-red-500/70">Failed</div>
                  </div>
                </div>
              </div>
            ))
          )
        ) : (
          loading && queue.length === 0 ? (
            <div className="text-zinc-500 text-sm">Loading queue...</div>
          ) : queue.length === 0 ? (
            <div className="text-zinc-500 text-sm">Queue is currently empty.</div>
          ) : (
            queue.map((item, index) => (
              <div 
                key={item.id} 
                draggable
                onDragStart={() => setDragItem(index)}
                onDragEnter={() => setDragOverItem(index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                className={`bg-surface border p-5 rounded-xl flex items-center justify-between transition-colors ${dragOverItem === index ? 'border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'border-border'}`}
              >
                <div className="flex items-center gap-4">
                  <GripVertical className="w-5 h-5 text-zinc-700 cursor-move shrink-0 hover:text-zinc-500 transition-colors" />
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.status === 'building' ? 'bg-amber-500/10 text-amber-500 animate-pulse' : 'bg-zinc-800 text-zinc-500'}`}>
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-zinc-200 text-sm">{item.id} <span className="text-zinc-500 font-mono font-normal ml-2">{item.model}</span></div>
                    <div className="text-xs mt-1 capitalize flex items-center gap-2">
                      <span className={item.status === 'building' ? 'text-amber-500 font-bold' : 'text-zinc-500'}>{item.status}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-400">{item.packages} packages</span>
                    </div>
                  </div>
                </div>
                
                {item.status === 'building' ? (
                  <div className="w-64">
                    <div className="flex justify-between text-[10px] text-zinc-400 mb-1.5 font-mono">
                      <span>Compiling...</span>
                      <span>{item.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${item.progress}%` }}></div>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-zinc-500 font-mono">Waiting for runner...</div>
                )}
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
}