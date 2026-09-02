import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def replace(match):
    return """          </button>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">"""

pattern = re.compile(r'          </button>\s*</div>\s*<div className="flex-1 grid grid-cols-2 gap-6 min-h-0">')
content = pattern.sub(replace, content)

with open("src/App.tsx", "w") as f:
    f.write(content)
