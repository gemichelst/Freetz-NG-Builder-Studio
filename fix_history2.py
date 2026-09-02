import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def replace1(match):
    return """            {selectedLogs ? (
        <div className="flex-1 flex flex-col min-h-0">
          <button 
            onClick={() => setSelectedLogs(null)}
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors text-sm mb-4 shrink-0 self-start"
          >
            ← Back to History
          </button>"""

content = re.sub(r'            \{selectedLogs \? \(\s*<div className="flex-1 flex flex-col min-h-0">\s*<div className="flex-1 flex flex-col min-h-0">\s*← Back to History\s*</button>', replace1, content)


def replace2(match):
    return """            <button 
              onClick={() => {}}
              className="bg-amber-500 rounded-md hover:bg-amber-400 text-black px-6 py-2 text-xs uppercase font-bold tracking-wider transition-colors"
            >
              Start Selected
            </button>
          </div>
        </motion.div>
      </div>"""

content = re.sub(r'            <button \s*onClick=\{\(\) => \{\s*</motion\.div>\s*</div>', replace2, content)

with open("src/App.tsx", "w") as f:
    f.write(content)
