const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'components', 'matching', 'KundliMatchingScreen.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Let's inspect the entire partner state and handler section
console.log('File length before:', content.length);

