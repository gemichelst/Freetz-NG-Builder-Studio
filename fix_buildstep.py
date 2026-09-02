import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def replace_modal(match):
    return """            <div className="px-6 py-4 bg-[#111114] border-t border-border flex justify-end gap-3">
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="bg-blue-500 rounded-md hover:bg-blue-600 text-white px-4 py-2 text-sm font-bold transition-colors"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h2 className="text-xl font-semibold text-zinc-100">Build Execution</h2>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-blue-500/30 rounded-md text-blue-500 hover:bg-blue-500/10 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Schedule
            <Calendar className="w-3 h-3" />
          </button>
          <button 
            onClick={() => {
              if (isRunning) return;
              setIsRunning(true);
            }}
            disabled={isRunning}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${isRunning ? 'bg-amber-500/50 text-black/50 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-400 text-black'}`}
          >
            {isRunning ? 'Building...' : 'Start Build'}
            <Play className="w-3 h-3" />
          </button>
        </div>"""

pattern = re.compile(r'            <div className="px-6 py-4 bg-\[#111114\] border-t border-border flex justify-end gap-3">.*?<Play className="w-3 h-3" />\s*</button>\s*</div>', re.DOTALL)
content = pattern.sub(replace_modal, content)

with open("src/App.tsx", "w") as f:
    f.write(content)
