import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def replace_exec(match):
    return """  const exportLogs = () => {
    if (logs.length === 0) return;
    const blob = new Blob([logs.join('\\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `build-logs-${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    generateScript();
  }, [config]);

  return (
    <div className="h-full flex flex-col relative">"""

pattern = re.compile(r'  const exportLogs = \(\) => \{\s*if \(logs\.length === 0\) return;\s*<div className="h-full flex flex-col relative">', re.DOTALL)
content = pattern.sub(replace_exec, content)

with open("src/App.tsx", "w") as f:
    f.write(content)
