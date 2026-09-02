import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def replace_packages(match):
    return """      <div className="flex items-center justify-between mb-4 shrink-0">
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
            onClick={selectAll}
            className="flex items-center gap-2 px-3 py-1.5 bg-surface border border-border hover:bg-white/5 rounded-md text-xs text-zinc-300 transition-colors"
          >
            <ListChecks className="w-3 h-3" /> Select All
          </button>
          <button 
            onClick={clearAll}
            className="flex items-center gap-2 px-3 py-1.5 bg-surface border border-border hover:bg-white/5 rounded-md text-xs text-zinc-300 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>"""

pattern = re.compile(r'      <div className="flex items-center justify-between mb-4 shrink-0">.*?<div className="w-px h-6 bg-border mx-2"></div>.*?Clear All\s*</button>\s*</div>\s*</div>', re.DOTALL)
content = pattern.sub(replace_packages, content)

with open("src/App.tsx", "w") as f:
    f.write(content)
