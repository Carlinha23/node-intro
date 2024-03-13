const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:`);
            console.error(`  ${err}`);
            return;
        }
        console.log(data);
    });
}

async function webCat(url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (error) {
        console.error(`Error fetching ${url}:`);
        console.error(`  ${error}`);
    }
}

// Check if a file path or URL argument is provided via command line
const arg = process.argv[2];

// Determine whether the argument is a file path or a URL
if (arg.startsWith('http')) {
    webCat(arg);
} else {
    cat(arg);
}

