const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // We want to replace `http://${window.location.hostname}:8080/api...` with `/api...`
    // Depending on if the original had variables or not, we might need to convert backticks to single quotes,
    // but the safest approach is to just strip out the protocol+host part and leave the backticks if needed.

    // Specifically for exact matches:
    content = content.replace(/`http:\/\/\$\{window\.location\.hostname\}:8080\/api/g, "`/api");

    fs.writeFileSync(filePath, content, 'utf8');
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== 'dist') {
                processDirectory(fullPath);
            }
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            replaceInFile(fullPath);
        }
    }
}

processDirectory(path.join(__dirname, 'src'));
console.log('Replaced dynamic hostname with relative /api in all src files!');
