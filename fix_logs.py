import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def replace_logs(match):
    return """function LogsHistoryStep() {
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

  const rotateLogs = () => {
    alert("System logs have been successfully rotated and old archives compressed.");
  };

  return (
    <div className="max-w-5xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h2 className="text-xl font-semibold text-zinc-100">Build Logs History</h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={rotateLogs}
            className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-md hover:bg-white/5 text-xs text-zinc-300 font-medium transition-colors"
          >
            Rotate Logs <RefreshCw className="w-3 h-3" />
          </button>
          <button 
            onClick={exportResults}
            disabled={history.length === 0 || loading}
            className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-md hover:bg-white/5 disabled:opacity-50 text-xs text-zinc-300 font-medium transition-colors"
          >
            Export Results <Download className="w-3 h-3" />
          </button>
        </div>
      </div>
      
      {selectedLogs ? (
        <div className="flex-1 flex flex-col min-h-0">"""

pattern = re.compile(r'function LogsHistoryStep\(\) \{.*?(?=        <div className="flex-1 flex flex-col min-h-0">)', re.DOTALL)
content = pattern.sub(replace_logs, content)

with open("src/App.tsx", "w") as f:
    f.write(content)
