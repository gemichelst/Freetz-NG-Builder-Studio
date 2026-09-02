import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def replace(match):
    return """                  </div>
                  <button 
                    onClick={() => onApply(p)}
                    className="bg-surface border border-border px-3 py-1.5 rounded-md hover:bg-white/5 text-xs text-zinc-300 font-bold uppercase tracking-wider transition-colors"
                  >
                    Load
                  </button>
                </div>"""

pattern = re.compile(r'                  </div>\s*Load\s*</button>\s*</div>')
content = pattern.sub(replace, content)

with open("src/App.tsx", "w") as f:
    f.write(content)
