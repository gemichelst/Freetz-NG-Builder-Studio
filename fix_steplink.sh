sed -i '179,200c\
function StepLink({ step, current, onClick, label, icon }: { step: number, current: number, onClick: () => void, label: string, icon: React.ReactNode }) {\
  const active = step === current;\
  return (\
    <button \
      onClick={onClick}\
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${active ? "bg-amber-500/10 text-amber-500 font-bold" : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"}`}\
    >\
      {icon}\
      <span>{label}</span>\
    </button>\
  );\
}\
\
function StepWrapper({ children }: { children: React.ReactNode, key?: React.Key }) {\
  return (\
    <motion.div\
      initial={{ opacity: 0, y: 10 }}\
      animate={{ opacity: 1, y: 0 }}\
      exit={{ opacity: 0, y: -10 }}\
      transition={{ duration: 0.2 }}\
      className="p-6 h-full flex flex-col"' src/App.tsx
