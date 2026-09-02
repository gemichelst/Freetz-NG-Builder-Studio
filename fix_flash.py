import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def replace_flash(match):
    return """function QuickFlashStep() {
  const [ip, setIp] = useState('192.168.178.1');
  const [file, setFile] = useState<File | null>(null);
  const [flashing, setFlashing] = useState(false);
  const [flashStatus, setFlashStatus] = useState('');

  const handleFlash = async () => {
    if (!file || !ip) return;
    setFlashing(true);
    setFlashStatus('Connecting to router...');
    
    // Simulate steps
    setTimeout(() => setFlashStatus('Uploading firmware image (this may take a few minutes)...'), 1500);
    setTimeout(() => setFlashStatus('Validating firmware signature...'), 4000);
    setTimeout(() => setFlashStatus('Writing to flash memory (DO NOT UNPLUG)...'), 6000);
    setTimeout(() => setFlashStatus('Rebooting router to apply new image...'), 10000);
    
    setTimeout(async () => {
      try {
        const res = await fetch('/api/quick-flash', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ip, filename: file.name })
        });
        const data = await res.json();
        setFlashStatus(`Success: ${data.message}`);
      } catch (e) {
        setFlashStatus('Error flashing image. Check connection.');
        console.error(e);
      }
      setFlashing(false);
    }, 12000);
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
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-background/50 flex flex-col items-center justify-center gap-4 relative overflow-hidden group hover:border-amber-500 transition-colors">
            <HardDrive className={`w-8 h-8 ${file ? 'text-amber-500' : 'text-zinc-500'} group-hover:text-amber-500 transition-colors`} />
            <input 
              type="file" 
              accept=".image"
              onChange={e => setFile(e.target.files?.[0] || null)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div>
              <p className="text-sm font-semibold text-zinc-200">{file ? file.name : 'Select or drop .image file'}</p>
              <p className="text-xs text-zinc-500 mt-1">{file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Directly upload to active partition'}</p>
            </div>
          </div>
        </div>
        
        {flashStatus && (
          <div className={`p-4 rounded-md border text-sm ${flashStatus.includes('Error') ? 'bg-red-500/10 border-red-500/30 text-red-500' : flashStatus.includes('Success') ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-blue-500/10 border-blue-500/30 text-blue-400'}`}>
            {flashStatus}
          </div>
        )}

        <div className="mt-auto">
          <button 
            onClick={handleFlash}
            disabled={!file || !ip || flashing}
            className="w-full bg-amber-500 rounded-md hover:bg-amber-400 disabled:opacity-50 text-black px-6 py-4 text-sm uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-3"
          >
            {flashing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Flashing in Progress...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Initiate Flash Sequence
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}"""

pattern = re.compile(r'function QuickFlashStep\(\) \{.*?(?=function LogsHistoryStep\(\) \{)', re.DOTALL)
content = pattern.sub(replace_flash, content)

with open("src/App.tsx", "w") as f:
    f.write(content)
