import re

with open("src/App.tsx", "r") as f:
    content = f.read()

bad = """          <div className="mt-6 flex justify-end">
              Apply Custom Theme
            </button>
          </div>"""

good = """          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => alert('Theme applied! (Simulated)')}
              className="bg-amber-500 rounded-md hover:bg-amber-400 text-black px-6 py-2 text-sm uppercase font-bold tracking-wider transition-colors"
            >
              Apply Custom Theme
            </button>
          </div>"""

content = content.replace(bad, good)

with open("src/App.tsx", "w") as f:
    f.write(content)
