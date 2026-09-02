const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');

const match = content.match(/function PresetManager\([\s\S]*?^}/m);
if (match) {
  const p = match[0];
  const opens = (p.match(/<div/g) || []).length;
  const closes = (p.match(/<\/div>/g) || []).length;
  console.log(`PresetManager divs - open: ${opens}, close: ${closes}`);
}
