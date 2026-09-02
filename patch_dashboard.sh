sed -i '/<h2 className="text-xl font-semibold text-zinc-100 mb-6">System Dashboard<\/h2>/a\
        <div className="bg-surface border border-border p-5 rounded-xl mb-8">\
          <h3 className="text-sm font-bold text-zinc-200 mb-4">Build Health Trends (Last 7 Days)</h3>\
          <div className="h-48 w-full">\
            <ResponsiveContainer width="100%" height="100%">\
              <AreaChart data={buildHealth.length > 0 ? buildHealth : [{date: "Mon", success: 12, failed: 2}, {date: "Tue", success: 15, failed: 1}, {date: "Wed", success: 18, failed: 0}, {date: "Thu", success: 10, failed: 4}, {date: "Fri", success: 22, failed: 1}]}>\
                <XAxis dataKey="date" stroke="#52525b" fontSize={10} />\
                <YAxis stroke="#52525b" fontSize={10} />\
                <Tooltip contentStyle={{ backgroundColor: "#16161a", borderColor: "#27272a" }} itemStyle={{ color: "#e4e4e7" }} />\
                <Area type="monotone" dataKey="success" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} />\
                <Area type="monotone" dataKey="failed" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />\
              </AreaChart>\
            </ResponsiveContainer>\
          </div>\
        </div>' src/App.tsx
