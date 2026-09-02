import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Define the clean replacement for the action bar in BuildQueueStep
# I will find the exact spot using regex
def replace_func(match):
    return """      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Build Queue & Batch</h2>
          <p className="text-xs text-zinc-500 mt-1">Monitor active pipelines and initiate batch compilations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              const blob = new Blob([JSON.stringify(viewHistory ? batchHistory : viewSchedule ? scheduledJobs : queue, null, 2)], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `freetz-queue-export-${new Date().toISOString().slice(0,10)}.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="border border-border rounded-md px-4 py-2 text-xs uppercase font-bold tracking-wider hover:bg-white/5 text-zinc-300 transition-colors flex items-center gap-2"
          >
            Bulk Export <Download className="w-4 h-4" />
          </button>
          <button 
            onClick={() => { setViewHistory(false); setViewSchedule(true); }}
            className={`border border-border rounded-md px-4 py-2 text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-2 ${viewSchedule ? 'bg-blue-500/10 text-blue-500 border-blue-500/30' : 'hover:bg-white/5 text-zinc-300'}`}
          >
            Scheduled
            <Calendar className="w-4 h-4" />
          </button>
          <button 
            onClick={() => { setViewSchedule(false); setViewHistory(!viewHistory); }}
            className={`border border-border rounded-md px-4 py-2 text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-2 ${viewHistory ? 'bg-amber-500/10 text-amber-500 border-amber-500/30' : 'hover:bg-white/5 text-zinc-300'}`}
          >
            {viewHistory ? 'Back to Queue' : 'Batch History'}
            <Archive className="w-4 h-4" />
          </button>
          {!viewHistory && !viewSchedule && (
            <button 
              onClick={() => setShowTemplater(!showTemplater)}
              className={`border border-border rounded-md px-4 py-2 text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-2 ${showTemplater ? 'bg-amber-500/10 text-amber-500 border-amber-500/30' : 'bg-surface hover:bg-white/5 text-zinc-300'}`}
            >
              Template Matrix
              <Layers className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>"""

# Find from `<div className="flex items-center justify-between mb-6 shrink-0">` after `return (` in BuildQueueStep up to the `</div>` of the action bar
pattern = re.compile(r'      <div className="flex items-center justify-between mb-6 shrink-0">\n        <div>\n          <h2 className="text-xl font-semibold text-zinc-100">Build Queue & Batch</h2>.*?</div>\n      </div>', re.DOTALL)
content = pattern.sub(replace_func, content)

with open("src/App.tsx", "w") as f:
    f.write(content)
