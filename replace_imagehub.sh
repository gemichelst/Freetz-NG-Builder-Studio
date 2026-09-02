sed -i '/function ImageHubStep/,/^}/d' src/App.tsx
cat << 'INNEREOF' >> src/App.tsx

function ImageHubStep({ config }: { config: BuildPreset }) {
  const [activeModel, setActiveModel] = useState(config.model || '7590');
  const [filterText, setFilterText] = useState('');
  const [externalLink, setExternalLink] = useState('');

  const dummyImages = [
    { id: 'img-1', model: '7590', os: '07.29', date: '2023-10-01', size: '28.4 MB', pkgs: 'OpenVPN, Nano, htop', uploader: 'gemichelst' },
    { id: 'img-2', model: '7590', os: '07.50', date: '2023-11-15', size: '30.1 MB', pkgs: 'WireGuard, mc, dnsmasq', uploader: 'admin' },
    { id: 'img-3', model: '7530', os: '07.29', date: '2023-09-20', size: '25.2 MB', pkgs: 'OpenVPN', uploader: 'user2' },
    { id: 'img-4', model: '6591', os: '07.29', date: '2023-12-05', size: '32.8 MB', pkgs: 'WireGuard, Transmission', uploader: 'cable_guy' },
    { id: 'img-5', model: '7490', os: '07.29', date: '2023-08-11', size: '22.1 MB', pkgs: 'Minimal, Dropbear', uploader: 'gemichelst' },
  ];

  const models = Array.from(new Set(dummyImages.map(img => img.model))).sort();
  if (!models.includes(config.model)) models.push(config.model);

  const filteredImages = dummyImages.filter(img => {
    if (img.model !== activeModel) return false;
    if (filterText && !img.pkgs.toLowerCase().includes(filterText.toLowerCase()) && !img.os.includes(filterText)) return false;
    return true;
  });

  return (
    <div className="h-full flex flex-col max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 shrink-0 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Freetz-NG Image Hub</h2>
          <p className="text-xs text-zinc-500 mt-1">Download prebuilt images or share your own.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {models.map(m => (
            <button 
              key={m}
              onClick={() => setActiveModel(m)}
              className={`px-3 py-1.5 rounded text-xs font-mono tracking-widest uppercase transition-colors ${activeModel === m ? 'bg-amber-500 text-black font-bold' : 'bg-surface border border-border text-zinc-400 hover:text-zinc-200'}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mb-6 shrink-0">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Filter by packages or OS version..."
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
            className="w-full bg-surface border border-border rounded-md pl-9 pr-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-4 mb-6 custom-scrollbar">
        <div className="space-y-4">
          {filteredImages.length === 0 && (
            <div className="text-center py-12 border border-dashed border-border rounded-xl text-zinc-500 text-sm">
              No prebuilt images found for {activeModel} matching your filters.
            </div>
          )}
          {filteredImages.map(img => (
            <div key={img.id} className="bg-surface border border-border p-4 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-zinc-500 transition-colors">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-zinc-200">FritzOS {img.os}</span>
                  <span className="bg-panel border border-border rounded text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 text-amber-500">
                    {img.model}
                  </span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest">by {img.uploader}</span>
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
      
      <div className="shrink-0 bg-surface border border-border p-5 rounded-xl">
        <h3 className="text-sm font-bold text-zinc-200 mb-3 flex items-center gap-2">
          <Globe className="w-4 h-4 text-amber-500" /> Share External Image
        </h3>
        <p className="text-xs text-zinc-400 mb-4">
          Upload your compiled .image file to a fileshare service (e.g. Mega, Google Drive) and share the URL here for other users.
        </p>
        <div className="flex gap-3">
          <input 
            type="url" 
            placeholder="https://..."
            value={externalLink}
            onChange={e => setExternalLink(e.target.value)}
            className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500 transition-colors"
          />
          <button 
            disabled={!externalLink}
            className="bg-zinc-800 border border-zinc-600 rounded-md hover:bg-zinc-700 disabled:opacity-50 text-white px-6 py-2 text-xs uppercase font-bold tracking-wider transition-colors"
          >
            Submit Link
          </button>
        </div>
      </div>
    </div>
  );
}
INNEREOF
