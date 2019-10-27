var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');
const rootDir = `/Users/qb/wx-miniprograme-framework/`;


var app = http.createServer((req, res) => {

    const filePath = path.resolve(rootDir + req.url);
    console.log('ppppppppp:', filePath);
    fs.readFile(filePath, 'utf-8', (err, content) => {
        if (err) {
            res.write('');
            res.end();
            return;
        }
        res.write(content);
        res.end();
    });
});

app.listen(9000);