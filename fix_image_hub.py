import re

with open("src/App.tsx", "r") as f:
    content = f.read()

bad = """        <div className="flex flex-wrap gap-2">
          {models.map(m => (
            >
              {m}
            </button>
          ))}
        </div>"""

good = """        <div className="flex flex-wrap gap-2">
          {models.map(m => (
            <button 
              key={m}
              onClick={() => setFilterModel(m === filterModel ? '' : m)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${filterModel === m ? 'bg-amber-500 text-black' : 'bg-surface border border-border text-zinc-400 hover:text-zinc-200'}`}
            >
              {m}
            </button>
          ))}
        </div>"""

content = content.replace(bad, good)

with open("src/App.tsx", "w") as f:
    f.write(content)
