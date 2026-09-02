const fs = require('fs');
const lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

const showLines = (start, end) => {
  for(let i = start; i <= end; i++) {
    console.log(`${i+1}: ${lines[i]}`);
  }
};

showLines(640, 680);
