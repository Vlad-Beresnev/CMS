const http = require('http')
const { authRoutes } = require('./routes/auth')
const contentRoutes = require('./routes/content')
const fs = require('fs')
const path = require('path')

const app = http.createServer((req, res) => {
    const url = req.url || ''

    const serveStaticFile = (filePath, contentType) => {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(fileContent);
    }


    if (url.startsWith('/auth')) {
        authRoutes(req, res);
    } else if (url.startsWith('/intranet')) {
        contentRoutes(req, res);
    } else if (url.startsWith('/home') || url === '/') {
        const homePagePath = path.join(__dirname, 'views', 'home.html');
        serveStaticFile(homePagePath, 'text/html');
    } else if (url.startsWith('/css')) {
        const cssFilePath = path.join(__dirname, 'public', 'css', url.substring(5));
        serveStaticFile(cssFilePath, 'text/css');
    } else if (url.startsWith('/js')) {
        const jsFilePath = path.join(__dirname, 'public', 'js', url.substring(4));
        serveStaticFile(jsFilePath, 'application/javascript');
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

