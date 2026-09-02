sed -i '/<button/i\        <button \
          onClick={() => alert("Logs have been successfully rotated and archived.")}\
          className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-md hover:bg-white/5 text-xs text-zinc-300 font-medium transition-colors mr-2"\
        >\
          Rotate Logs <RefreshCw className="w-3 h-3" />\
        </button>' src/App.tsx
