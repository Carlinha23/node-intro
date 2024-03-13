const fs = require('fs');
const axios = require('axios');

function cat(path, outputFileName) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:`);
            console.error(`  ${err}`);
            return;
        }
        if (outputFileName) {
            fs.writeFile(outputFileName, data, (err) => {
                if (err) {
                    console.error(`Couldn't write ${outputFileName}:`);
                    console.error(`  ${err}`);
                    return;
                }
                console.log(`No output, but ${outputFileName} contains contents of ${path}`);
            });
        } else {
            console.log(data);
        }
    });
}

async function webCat(url, outputFileName) {
    try {
        const response = await axios.get(url);
        if (outputFileName) {
            fs.writeFile(outputFileName, response.data, (err) => {
                if (err) {
                    console.error(`Couldn't write ${outputFileName}:`);
                    console.error(`  ${err}`);
                    return;
                }
                console.log(`No output, but ${outputFileName} contains contents of ${url}`);
            });
        } else {
            console.log(response.data);
        }
    } catch (error) {
        console.error(`Error fetching ${url}:`);
        console.error(`  ${error}`);
    }
}

// Check if a file path or URL argument is provided via command line
const argIndex = process.argv.findIndex(arg => arg === '--out');
if (argIndex !== -1) {
    const outputFileName = process.argv[argIndex + 1];
    const arg = process.argv[argIndex + 2];
    if (arg.startsWith('http')) {
        webCat(arg, outputFileName);
    } else {
        cat(arg, outputFileName);
    }
} else {
    const arg = process.argv[2];
    if (arg.startsWith('http')) {
        webCat(arg);
    } else {
        cat(arg);
    }
}