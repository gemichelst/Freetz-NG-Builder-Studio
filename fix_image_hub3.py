import re

with open("src/App.tsx", "r") as f:
    content = f.read()

bad = """          />
            Submit Link
          </button>
        </div>
      </div>"""

good = """          />
          <button 
            disabled={!externalLink}
            onClick={() => { setExternalLink(''); alert('Link submitted for review'); }}
            className="bg-amber-500 rounded-md hover:bg-amber-400 disabled:opacity-50 text-black px-6 py-2 text-xs uppercase font-bold tracking-wider transition-colors"
          >
            Submit Link
          </button>
        </div>
      </div>"""

content = content.replace(bad, good)

with open("src/App.tsx", "w") as f:
    f.write(content)
