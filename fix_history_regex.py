import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Fix the duplicate div and missing button tag
content = re.sub(
    r'<div className="flex-1 flex flex-col min-h-0">\s*<div className="flex-1 flex flex-col min-h-0">\s*← Back to History\s*</button>',
    r"""<div className="flex-1 flex flex-col min-h-0">
          <button 
            onClick={() => setSelectedLogs(null)}
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors text-sm mb-4 shrink-0 self-start"
          >
            ← Back to History
          </button>""",
    content
)

# Fix the dispatch button
content = re.sub(
    r'<div className="mt-6 flex justify-end">\s*>\s*\{batching \? \'Dispatching Matrix\.\.\.\' : `Dispatch \$\{templateModels\.length\} Builds`\}\s*</button>',
    r"""<div className="mt-6 flex justify-end">
            <button 
              onClick={startMatrix}
              disabled={batching || templateModels.length === 0}
              className="bg-amber-500 rounded-md hover:bg-amber-400 disabled:opacity-50 text-black px-6 py-2 text-sm uppercase font-bold tracking-wider transition-colors flex items-center gap-2"
            >
              {batching ? 'Dispatching Matrix...' : `Dispatch ${templateModels.length} Builds`}
            </button>""",
    content
)

with open("src/App.tsx", "w") as f:
    f.write(content)
