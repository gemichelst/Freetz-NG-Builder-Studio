import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# 1. Update LogsHistoryStep
bad_logs = """  const rotateLogs = () => {
    if (confirm("Are you sure you want to rotate logs? Old logs will be archived.")) {
      alert("System logs have been successfully rotated and old archives compressed.");
    }
  };"""
good_logs = """  const rotateLogs = () => {
    if (confirm("Are you sure you want to rotate logs? Old logs will be archived.")) {
      fetch('/api/rotate-logs', { method: 'POST' }).then(r => r.json()).then(d => alert(d.message));
    }
  };"""
content = content.replace(bad_logs, good_logs)

# 2. Update DashboardStep quick actions
bad_dash = """function DashboardStep() {
  const [dockerStatus, setDockerStatus] = useState<any>(null);"""
good_dash = """function DashboardStep() {
  const [dockerStatus, setDockerStatus] = useState<any>(null);
  const handleCleanup = () => {
    fetch('/api/cleanup', { method: 'POST' }).then(r => r.json()).then(d => alert(d.message));
  };"""
content = content.replace(bad_dash, good_dash)

bad_dash_html = """          <div className="bg-surface border border-border p-5 rounded-xl flex items-center gap-4">
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
      </div>"""
good_dash_html = """          <div className="bg-surface border border-border p-5 rounded-xl flex flex-col justify-center">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Automated Cleanup</p>
            <button onClick={handleCleanup} className="w-full bg-amber-500/10 text-amber-500 border border-amber-500/30 py-2 rounded-md hover:bg-amber-500/20 transition-colors text-sm font-bold flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4" /> Run Cleanup
            </button>
            <p className="text-xs text-zinc-400 mt-2 text-center">Free up disk space</p>
          </div>
        </div>
      </div>"""
content = content.replace(bad_dash_html, good_dash_html)


# 3. Update WikiStep
bad_wiki = """  const updateWiki = () => {
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
      setUpdateMsg('Wiki page updated successfully.');
      setTimeout(() => setUpdateMsg(''), 3000);
    }, 1500);
  };"""
good_wiki = """  const updateWiki = () => {
    setUpdating(true);
    fetch('/api/wiki/update', { method: 'POST' })
      .then(r => r.json())
      .then(d => {
        setUpdating(false);
        setUpdateMsg(d.message);
        setTimeout(() => setUpdateMsg(''), 3000);
      }).catch(() => setUpdating(false));
  };"""
content = content.replace(bad_wiki, good_wiki)

# 4. Update BuildQueueStep startMatrix and template preview
bad_matrix = """  const startMatrix = () => {
    setBatching(true);
    setTimeout(() => {
      setBatching(false);
      setShowTemplater(false);
      alert('Batch dispatched to queue.');
    }, 1500);
  };"""
good_matrix = """  const startMatrix = () => {
    setBatching(true);
    fetch('/api/batch-process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        configs: templateModels.map(m => ({ model: m }))
      })
    })
    .then(r => r.json())
    .then(d => {
      setBatching(false);
      setShowTemplater(false);
      alert('Batch dispatched to queue. Status is syncing.');
      fetchQueue();
    }).catch(console.error);
  };"""
content = content.replace(bad_matrix, good_matrix)

# Batch preview
bad_preview = """              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">"""
good_preview = """              </div>
            </div>
          </div>
          
          {templatePreset && templateModels.length > 0 && (
            <div className="mt-6 bg-[#0a0a0c] border border-amber-500/30 p-4 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
              <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Zap className="w-3 h-3" /> Template Preview
              </h4>
              <p className="text-sm text-zinc-300">
                This will dispatch <span className="text-zinc-100 font-bold">{templateModels.length}</span> build jobs 
                simultaneously, applying the selected base preset packages to hardware models:
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {templateModels.map(m => (
                  <span key={m} className="px-2 py-1 bg-amber-500/10 text-amber-500 text-xs rounded border border-amber-500/20 font-mono">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-6 flex justify-end">"""
content = content.replace(bad_preview, good_preview)

with open("src/App.tsx", "w") as f:
    f.write(content)
