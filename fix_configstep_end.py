import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def replace_end(match):
    return """      <div className="mt-8 flex justify-end">
        <button 
          onClick={onNext}
          className="bg-amber-500 rounded-md hover:bg-amber-400 text-black px-6 py-2 text-xs uppercase font-bold tracking-wider transition-colors"
        >
          Proceed to Packages
        </button>
      </div>
    </div>
  );
}"""

pattern = re.compile(r'      <div className="mt-8 flex justify-end">\s*</div>\s*\);\s*\}', re.DOTALL)
content = pattern.sub(replace_end, content)

with open("src/App.tsx", "w") as f:
    f.write(content)
