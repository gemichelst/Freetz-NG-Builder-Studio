import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def replace_cat(match):
    return """                <div className="flex items-center gap-2">
                  {iconMap[cat.iconName] || <Settings className="w-4 h-4" />}
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-zinc-300">{cat.cat}</h3>
                </div>
                <button
                  onClick={() => toggleCategory(cat.cat)}
                  className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded transition-colors ${isAllSelected ? 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30' : 'bg-white/5 text-zinc-400 hover:text-zinc-200'}`}
                >
                  {isAllSelected ? 'Deselect' : 'Select'}
                </button>
              </div>"""

pattern = re.compile(r'                <div className="flex items-center gap-2">\s*\{iconMap\[cat\.iconName\] \|\| <Settings className="w-4 h-4" />\}\s*<h3 className="text-\[10px\] uppercase tracking-widest font-bold text-zinc-300">\{cat\.cat\}</h3>\s*</div>\s*\{isAllSelected \? \'Deselect\' : \'Select\'\}\s*</button>\s*</div>', re.DOTALL)
content = pattern.sub(replace_cat, content)

with open("src/App.tsx", "w") as f:
    f.write(content)
