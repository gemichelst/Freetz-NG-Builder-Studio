import React, { useState, useEffect } from 'react';
import { Terminal, Save, Download, Cpu, HardDrive, Wifi, Shield, Play, Settings, AlertTriangle, CheckCircle2, Activity, Server, FileText } from 'lucide-react';
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
            <StepLink step={4} current={activeStep} onClick={() => setActiveStep(4)} label="Image Hub" icon={<Download className="w-4 h-4" />} />
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
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-zinc-100 mb-6">Router Configuration</h2>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500">Fritz!Box Model</label>
          <select 
            value={config.model} 
            onChange={e => onChange('model', e.target.value)}
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500 transition-colors"
          >
            <option value="7590">FRITZ!Box 7590</option>
            <option value="7530">FRITZ!Box 7530</option>
            <option value="7490">FRITZ!Box 7490</option>
            <option value="6591">FRITZ!Box 6591 Cable</option>
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

function PackagesStep({ config, onChange, onNext }: { config: BuildPreset, onChange: (k: keyof BuildPreset, v: any) => void, onNext: () => void }) {
  const togglePackage = (pkg: string) => {
    if (config.packages.includes(pkg)) {
      onChange('packages', config.packages.filter(p => p !== pkg));
    } else {
      onChange('packages', [...config.packages, pkg]);
    }
  };

  const categories = [
    {
      title: 'Security',
      icon: <Shield className="w-4 h-4" />,
      items: ['OpenVPN', 'WireGuard', 'Dropbear (SSH)', 'iptables', 'stunnel']
    },
    {
      title: 'Network',
      icon: <Wifi className="w-4 h-4" />,
      items: ['dnsmasq', 'curl', 'wget', 'tcpdump', 'nmap']
    },
    {
      title: 'System',
      icon: <Settings className="w-4 h-4" />,
      items: ['htop', 'mc (Midnight Commander)', 'nano', 'cron', 'syslogd']
    },
    {
      title: 'Media',
      icon: <Play className="w-4 h-4" />,
      items: ['minidlna', 'samba', 'transmission', 'vsftpd']
    }
  ];

  return (
    <div className="max-w-4xl flex flex-col h-full">
      <h2 className="text-xl font-semibold text-zinc-100 mb-6 shrink-0">Package Selection</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 overflow-y-auto">
        {categories.map(cat => (
          <div key={cat.title} className="bg-surface border border-border p-5 rounded-xl">
            <div className="flex items-center gap-2 text-amber-500 mb-4 border-b border-border pb-2">
              {cat.icon}
              <h3 className="text-xs uppercase tracking-wider font-semibold">{cat.title}</h3>
            </div>
            <div className="space-y-3">
              {cat.items.map(pkg => (
                <label key={pkg} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${config.packages.includes(pkg) ? 'bg-amber-500 border-amber-500' : 'border-border group-hover:border-zinc-500'}`}>
                    {config.packages.includes(pkg) && <CheckIcon />}
                  </div>
                  <span className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors">{pkg}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex justify-between shrink-0">
        <div className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 self-center">
          Selected: {config.packages.length} packages
        </div>
        <button onClick={onNext} className="bg-amber-500 rounded-md hover:bg-amber-400 text-black px-6 py-2 text-xs uppercase font-bold tracking-wider transition-colors">
          Next: Execution
        </button>
      </div>
    </div>
  );
}

function ExecutionStep({ config }: { config: BuildPreset }) {
  const [script, setScript] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

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

  const startBuild = () => {
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
      
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h2 className="text-xl font-semibold text-zinc-100">Build Execution</h2>
        <div className="flex gap-3">
          <button onClick={generateScript} className="border border-border rounded-md hover:bg-white/5 text-zinc-300 px-4 py-1.5 text-xs uppercase font-bold tracking-wider transition-colors">
            Generate Script
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
          
          <div className="p-6 overflow-y-auto flex-1 font-mono text-xs text-zinc-300 space-y-1.5">
            {logs.length === 0 && !isRunning && <div className="text-zinc-500">Waiting for build to start...</div>}
            {logs.map((log, i) => (
              <div key={i}><span className="text-amber-500 mr-2">$</span>{log}</div>
            ))}
            {isRunning && <div className="animate-pulse text-amber-400">_</div>}
          </div>

          {(isRunning || progress > 0) && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-surface">
              <div 
                className="h-full bg-amber-500 transition-all duration-300 ease-out" 
                style={{ width: `${progress}%` }}
              />
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
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">Advanced Presets</h3>
        <button onClick={fetchPresets} className="text-[10px] uppercase font-mono tracking-widest text-amber-500 hover:text-amber-400">
          Refresh List
        </button>
      </div>
      
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
            No global presets saved yet.
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

  useEffect(() => {
    fetch('/api/docker-status').then(r => r.json()).then(setDockerStatus).catch(() => {});
    fetch('/api/build-health').then(r => r.json()).then(setBuildHealth).catch(() => {});
  }, []);

  return (
    <div className="max-w-5xl">
      <h2 className="text-xl font-semibold text-zinc-100 mb-6">System Dashboard</h2>
      
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
