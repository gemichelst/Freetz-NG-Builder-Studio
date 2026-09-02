import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def replace(match):
    return """      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">Preset Library</h3>
      </div>
      <div className="space-y-6 mb-8">"""

pattern = re.compile(r'      <div className="flex items-center justify-between mb-4">\s*<h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">Preset Library</h3>\s*<div className="space-y-6 mb-8">')
content = pattern.sub(replace, content)

with open("src/App.tsx", "w") as f:
    f.write(content)
