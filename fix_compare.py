import re

with open("src/App.tsx", "r") as f:
    content = f.read()

bad = """        <button 
          onClick={compare}
          disabled={!v1 || !v2 || v1 === v2}"""

good = """        <button 
          onClick={runDiff}
          disabled={!presetAId || !presetBId || presetAId === presetBId}"""

content = content.replace(bad, good)

with open("src/App.tsx", "w") as f:
    f.write(content)
