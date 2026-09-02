import re

with open("src/App.tsx", "r") as f:
    content = f.read()

bad = """  const { size: estSize, time: estTime } = calcEstimates();"""

good = """  const { size: estSize, time: estTime } = calcEstimates();
  const selectAll = () => onChange('packages', flatDb.map(p => p.id));
  const clearAll = () => onChange('packages', []);"""

content = content.replace(bad, good)
content = content.replace("import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from \"recharts\";\n", "")

with open("src/App.tsx", "w") as f:
    f.write(content)
