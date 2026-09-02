import re

with open("src/App.tsx", "r") as f:
    content = f.read()

bad = """        <div className="px-6 py-4 bg-[#111114] border-t border-border flex justify-end gap-3">
            onClick={() => {
          <button 
            onClick={() => {"""

good = """        <div className="px-6 py-4 bg-[#111114] border-t border-border flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="bg-amber-500 rounded-md hover:bg-amber-400 text-black px-4 py-2 text-sm font-bold transition-colors"
          >
            {confirmText}
          </button>
        </div>"""

content = content.replace(bad, good)

with open("src/App.tsx", "w") as f:
    f.write(content)
