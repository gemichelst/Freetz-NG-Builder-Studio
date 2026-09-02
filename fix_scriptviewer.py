import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def replace(match):
    return """        <div className="bg-panel border border-border flex flex-col min-h-0 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
          <div className="flex items-center justify-between p-3 border-b border-border bg-surface shrink-0">
            <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">install.sh</span>
            <button className="text-zinc-500 hover:text-amber-500 transition-colors" title="Copy to clipboard">
              <FileText className="w-3 h-3" />
            </button>
          </div>
          <div className="p-4 overflow-y-auto flex-1 font-mono text-xs text-zinc-300 whitespace-pre custom-scrollbar">
            {script || '// Preview of the bash payload...'}
          </div>
        </div>"""

pattern = re.compile(r'        <div className="bg-panel border border-border flex flex-col min-h-0 rounded-xl overflow-hidden shadow-2xl shadow-black/50">\s*<div className="flex items-center justify-between p-3 border-b border-border bg-surface shrink-0">\s*<span className="text-\[10px\] uppercase font-mono tracking-widest text-zinc-400">install.sh</span>\s*<div className="p-4 overflow-y-auto flex-1 font-mono text-xs text-zinc-300 whitespace-pre">\s*\{script \|\| \'// Click "Generate Script" to preview the bash payload.\'\}\s*</div>\s*</div>')
content = pattern.sub(replace, content)

with open("src/App.tsx", "w") as f:
    f.write(content)
