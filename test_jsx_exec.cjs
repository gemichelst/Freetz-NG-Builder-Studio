const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');

const buildMatch = content.match(/function ExecutionStep\([\s\S]*?^}/m);
if (buildMatch) {
  let p = buildMatch[0];
  let opens = (p.match(/<div/g) || []).length;
  let closes = (p.match(/<\/div>/g) || []).length;
  console.log(`ExecutionStep divs - open: ${opens}, close: ${closes}`);
}
