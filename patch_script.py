import re

with open("server.ts", "r") as f:
    content = f.read()

bad = """  app.post("/api/generate-script", (req, res) => {
    const config = req.body;
    
    let script = `#!/bin/bash\\n\\n`;"""
good = """  app.post("/api/generate-script", (req, res) => {
    const config = req.body;
    
    let script = `#!/bin/bash\\n\\n`;
    script += `export USE_CCACHE=1\\n`;
    script += `export MAKE_JOBS=$(nproc)\\n\\n`;"""
content = content.replace(bad, good)

with open("server.ts", "w") as f:
    f.write(content)
