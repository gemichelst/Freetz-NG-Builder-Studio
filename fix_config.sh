sed -i '225,229c\
        <button \
          onClick={syncPresets}\
          disabled={syncing}\
          className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-md hover:bg-white/5 disabled:opacity-50 text-xs text-zinc-300 font-medium transition-colors"\
        >' src/App.tsx
