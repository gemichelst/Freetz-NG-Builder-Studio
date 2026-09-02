with open("src/App.tsx", "r") as f:
    content = f.read()

bad1 = """            {selectedLogs ? (
        <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 flex flex-col min-h-0">
            ← Back to History
          </button>"""

good1 = """            {selectedLogs ? (
        <div className="flex-1 flex flex-col min-h-0">
          <button 
            onClick={() => setSelectedLogs(null)}
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors text-sm mb-4 shrink-0 self-start"
          >
            ← Back to History
          </button>"""

content = content.replace(bad1, good1)

bad2 = """                  </div>
                </div>
                  View Logs <FileText className="w-3 h-3" />
                </button>
              </div>"""

good2 = """                  </div>
                </div>
                <button
                  onClick={() => setSelectedLogs(item.logs)}
                  className="bg-surface border border-border px-4 py-2 rounded-md hover:bg-white/5 text-xs text-zinc-300 font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  View Logs <FileText className="w-3 h-3" />
                </button>
              </div>"""

content = content.replace(bad2, good2)

with open("src/App.tsx", "w") as f:
    f.write(content)
