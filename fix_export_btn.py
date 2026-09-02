import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def replace_export_btn(match):
    return """              <span className="text-[10px] font-mono text-zinc-500 uppercase">terminal session: build-tools</span>
              <button
                className="text-zinc-500 hover:text-amber-500 transition-colors"
                title="Export Logs"
              >
                <FileText className="w-3 h-3" />
              </button>
            </div>"""

pattern = re.compile(r'              <span className="text-\[10px\] font-mono text-zinc-500 uppercase">terminal session: build-tools</span>\s*title="Export Logs"\s*>\s*<FileText className="w-3 h-3" />\s*</button>\s*</div>', re.DOTALL)
content = pattern.sub(replace_export_btn, content)

with open("src/App.tsx", "w") as f:
    f.write(content)
