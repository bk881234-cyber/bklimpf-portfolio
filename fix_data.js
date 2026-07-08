const fs = require('fs');
const path = 'c:/Users/bkbk8/portfolio_리뉴얼/data.js';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/\\`/g, '`');
content = content.replace(/\\\${/g, '${');
fs.writeFileSync(path, content);
console.log('Fixed syntax errors in data.js');
