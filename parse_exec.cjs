const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');

const match = content.match(/function ExecutionStep\([\s\S]*?^}/m);
if (match) {
  const lines = match[0].split('\n');
  let open = 0;
  for(let i=0; i<lines.length; i++) {
    const o = (lines[i].match(/<div/g) || []).length;
    const c = (lines[i].match(/<\/div>/g) || []).length;
    open += o - c;
    if (o > 0 || c > 0) {
       console.log(i + ": " + open + " -> " + lines[i].trim());
    }
  }
}
