const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');

const packagesMatch = content.match(/function PackagesStep\([\s\S]*?^}/m);
if (packagesMatch) {
  let p = packagesMatch[0];
  let opens = (p.match(/<div/g) || []).length;
  let closes = (p.match(/<\/div>/g) || []).length;
  console.log(`PackagesStep divs - open: ${opens}, close: ${closes}`);
}
