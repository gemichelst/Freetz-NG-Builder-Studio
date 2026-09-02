import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def replace_showviz(match):
    return """            <div className="p-4 border-b border-border flex justify-between items-center shrink-0">
              <h3 className="font-bold text-zinc-100 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-500" />
                Payload Dependency Visualizer
              </h3>
              <button onClick={() => setShowViz(false)} className="text-zinc-500 hover:text-zinc-300">✕</button>
            </div>"""

pattern = re.compile(r'            <div className="p-4 border-b border-border flex justify-between items-center shrink-0">\s*<h3 className="font-bold text-zinc-100 flex items-center gap-2">\s*<Layers className="w-4 h-4 text-amber-500" />\s*Payload Dependency Visualizer\s*</h3>\s*(?!<button)')
content = pattern.sub(replace_showviz, content)

with open("src/App.tsx", "w") as f:
    f.write(content)
