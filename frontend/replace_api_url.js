const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace 'http://localhost:8080
    content = content.replace(/'http:\/\/localhost:8080/g, "`http://${window.location.hostname}:8080");
    
    // Replace "http://localhost:8080
    content = content.replace(/"http:\/\/localhost:8080/g, "`http://${window.location.hostname}:8080");
    
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
console.log('Replaced localhost with dynamic hostname in all src files!');
