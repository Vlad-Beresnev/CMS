const http = require('http')
const { authRoutes, userSession } = require('./routes/auth')
const contentRoutes = require('./routes/content')
const fs = require('fs')
const urlModule = require('url')
const path = require('path')


const serveStaticFile = (req, res, filePath, contentType) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    })
}

const handleStaticFiles = (req, res, next) => {
    const url = req.url || '';

    // LOG OUT PAGE
    if ((url.startsWith('/home') || url === '/') && userSession.role === 'admin') {
        const homePagePath = path.join(__dirname, 'views', 'home.html');
        serveStaticFile(req, res, homePagePath, 'text/html');
        console.log(`This is the user's info : ${userSession['role']}`)

    } else if (url.startsWith('/css')) {
        const cssFilePath = path.join(__dirname, 'public', 'css', url.substring(5));
        serveStaticFile(req, res, cssFilePath, 'text/css');
    } else if (url.startsWith('/js')) {
        const jsFilePath = path.join(__dirname, 'public', 'js', url.substring(4));
        serveStaticFile(req, res, jsFilePath, 'application/javascript');
    } else if (url.startsWith('/images')) {
        const imagePath = path.join(__dirname, 'public', 'images', url.substring(7));
        serveStaticFile(req, res, imagePath, 'image/png');
    // NEXT PAGE
    
    
    } else {
        next();
    }   
};


const app = http.createServer((req, res) => {
    handleStaticFiles(req, res, () => {
        const url = req.url || ''
    
        if (url.startsWith('/auth')) {
            authRoutes(req, res);
        } else if (url.startsWith('/intranet')) {
            contentRoutes(req, res);
        }
        else if (userSession.role !== 'admin') {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            res.end('Forbidden: Only admin users can access this route');
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain'});
            res.end('Not Found')
        }

    })

})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}....`)
})

