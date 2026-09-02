import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def replace_end(match):
    return """      <div className="mt-auto flex justify-between items-center shrink-0 pt-4 border-t border-border">
        <div className="flex flex-col">
          <div className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 flex items-center">
            Selected: <span className="text-amber-500 text-sm ml-1 mr-3">{config.packages.length}</span> items
            <span className="mx-2 text-border">|</span>
            Est. Time: <span className="text-zinc-300 ml-1 mr-3">{estTime} min</span>
            <span className="mx-2 text-border">|</span>
            Est. Size: <span className="text-zinc-300 ml-1 mr-3">{estSize} MB</span>
          </div>
          {config.externalTarget && (
            <div className="text-xs text-blue-400 mt-1 flex items-center gap-1 font-medium">
              <HardDrive className="w-3 h-3" /> External uStor mode active
            </div>
          )}
        </div>
        <button 
          onClick={onNext}
          className="bg-amber-500 rounded-md hover:bg-amber-400 text-black px-6 py-2 text-xs uppercase font-bold tracking-wider transition-colors"
        >
          Review & Build
        </button>
      </div>
    </div>
  );
}"""

pattern = re.compile(r'      <div className="mt-auto flex justify-between shrink-0 pt-4 border-t border-border">.*?</div>\s*</div>\s*\);\s*\}', re.DOTALL)
content = pattern.sub(replace_end, content)

with open("src/App.tsx", "w") as f:
    f.write(content)
