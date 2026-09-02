import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def replace_steplink(match):
    return """function StepLink({ step, current, onClick, label, icon }: { step: number, current: number, onClick: () => void, label: string, icon: React.ReactNode }) {
  const active = step === current;
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${active ? 'bg-amber-500/10 text-amber-500 font-bold' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}"""

pattern = re.compile(r'function StepLink\(\{ step, current, onClick, label, icon \}: \{ step: number, current: number, onClick: \(\) => void, label: string, icon: React\.ReactNode \}\) \{.*?\n  \);(?:\\n)?\}(?:\\n)?', re.DOTALL)
content = pattern.sub(replace_steplink, content)

with open("src/App.tsx", "w") as f:
    f.write(content)
