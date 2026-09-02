with open("src/App.tsx", "r") as f:
    content = f.read()

bad1 = """        </select>
        >
          <Save className="w-3 h-3" /> Save Preset
        </button>"""

good1 = """        </select>
        <button 
          onClick={savePreset}
          disabled={saving || !presetName}
          className="bg-amber-500 rounded-md hover:bg-amber-400 disabled:opacity-50 text-black px-6 py-2 text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-2"
        >
          <Save className="w-3 h-3" /> Save Preset
        </button>"""

content = content.replace(bad1, good1)

bad2 = """      <div className="flex justify-center mb-8 shrink-0">
        >
          Compare Builds
          <GitCompare className="w-4 h-4" />
        </button>
      </div>"""

good2 = """      <div className="flex justify-center mb-8 shrink-0">
        <button 
          onClick={compare}
          disabled={!v1 || !v2 || v1 === v2}
          className="bg-amber-500 rounded-full hover:bg-amber-400 disabled:opacity-50 text-black px-8 py-3 text-sm uppercase font-bold tracking-wider transition-colors flex items-center gap-3 shadow-lg shadow-amber-500/20"
        >
          Compare Builds
          <GitCompare className="w-4 h-4" />
        </button>
      </div>"""

content = content.replace(bad2, good2)

with open("src/App.tsx", "w") as f:
    f.write(content)
