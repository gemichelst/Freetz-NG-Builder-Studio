import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def replace_save(match):
    return """          </select>
          <button 
            onClick={savePreset}
            disabled={saving || !presetName}
            className="bg-amber-500 rounded-md hover:bg-amber-400 disabled:opacity-50 text-black px-6 py-2 text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-2"
          >
            <Save className="w-3 h-3" /> Save Preset
          </button>"""

pattern = re.compile(r'          </select>\s*>\s*<Save className="w-3 h-3" /> Save Preset\s*</button>')
content = pattern.sub(replace_save, content)

def replace_compare(match):
    return """        <div className="flex justify-center mb-8 shrink-0">
          <button 
            onClick={compare}
            disabled={!v1 || !v2 || v1 === v2}
            className="bg-amber-500 rounded-full hover:bg-amber-400 disabled:opacity-50 text-black px-8 py-3 text-sm uppercase font-bold tracking-wider transition-colors flex items-center gap-3 shadow-lg shadow-amber-500/20"
          >
            Compare Builds
            <GitCompare className="w-4 h-4" />
          </button>
        </div>"""

pattern2 = re.compile(r'        <div className="flex justify-center mb-8 shrink-0">\s*>\s*Compare Builds\s*<GitCompare className="w-4 h-4" />\s*</button>\s*</div>')
content = pattern2.sub(replace_compare, content)


with open("src/App.tsx", "w") as f:
    f.write(content)
