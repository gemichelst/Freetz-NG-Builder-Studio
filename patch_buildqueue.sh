sed -i '/<button/i\          <button \
            onClick={() => {\
              const blob = new Blob([JSON.stringify(viewHistory ? batchHistory : viewSchedule ? scheduledJobs : queue, null, 2)], { type: "application/json" });\
              const url = URL.createObjectURL(blob);\
              const a = document.createElement("a");\
              a.href = url;\
              a.download = `freetz-queue-export-${new Date().toISOString().slice(0,10)}.json`;\
              a.click();\
              URL.revokeObjectURL(url);\
            }}\
            className="border border-border rounded-md px-4 py-2 text-xs uppercase font-bold tracking-wider hover:bg-white/5 text-zinc-300 transition-colors flex items-center gap-2"\
          >\
            Bulk Export <Download className="w-4 h-4" />\
          </button>' src/App.tsx
