import re

with open("src/App.tsx", "r") as f:
    content = f.read()

bad = """              <div className="flex gap-3">
            onClick={() => {
          <button 
            onClick={() => {
            </div>
          ))}"""

good = """              <div className="flex gap-3">
                <button
                  onClick={() => alert('Downloading ' + img.name)}
                  className="bg-amber-500 rounded-md hover:bg-amber-400 text-black px-4 py-2 text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-2"
                >
                  <Download className="w-3 h-3" />
                  Download
                </button>
              </div>
            </div>
          ))}"""

content = content.replace(bad, good)

with open("src/App.tsx", "w") as f:
    f.write(content)
