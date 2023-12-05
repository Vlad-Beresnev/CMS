const http = require('http')
const { authRoutes } = require('./routes/auth')
const contentRoutes = require('./routes/content')
const fs = require('fs')
const path = require('path')


const app = http.createServer((req, res) => {
    const url = req.url || ''

    const serveStaticFile = (filePath) => {
        fs.readFile(filePath, (err, fileContent) => {
            if (err) {
                console.error(`Error reading file: ${err}`);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
    
            const fileExtension = path.extname(filePath).toLowerCase();
    
            const contentTypes = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'application/javascript',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                // Add more content types as needed
            };
    
            const selectedContentType = contentTypes[fileExtension] || 'application/octet-stream';
    
            res.writeHead(200, { 'Content-Type': selectedContentType });
            res.end(fileContent);
        });
    };

    if (url.startsWith('/auth')) {
        authRoutes(req, res);
    } else if (url.startsWith('/intranet')) {
        contentRoutes(req, res);
    } else if (url.startsWith('/home') || url === '/') {
        const homePagePath = path.join(__dirname, 'views', 'home.html');
        serveStaticFile(homePagePath);
    } else if (url.startsWith('/css')) {
        const cssFilePath = path.join(__dirname, 'public', 'home.css', url.substring(5));
        serveStaticFile(cssFilePath);
    } else if (url.startsWith('/js')) {
        const jsFilePath = path.join(__dirname, 'public', 'js', url.substring(4));
        serveStaticFile(jsFilePath);
    } else if (url.startsWith('/images')) {
        const imagePath = path.join(__dirname, 'public', 'images', url.substring(7));
        serveStaticFile(imagePath);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain'});
        res.end('Not Found')
    }

})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}....`)
})

