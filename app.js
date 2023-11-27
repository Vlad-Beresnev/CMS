const http = require('http')
const { authRoutes } = require('./routes/auth')
const contentRoutes = require('./routes/content')
const fs = require('fs')
const path = require('path')

const app = http.createServer((req, res) => {
    const url = req.url || ''
    if (url.startsWith('/auth')) {
        authRoutes(req, res);
    } else if (url.startsWith('/intranet')) {
        contentRoutes(req, res);
    } else if (url.startsWith('/home') || url === '/') {
        const homePagePath = path.join(__dirname, 'public', 'homePage', 'home.html')
        const homePageContent = fs.readFileSync(homePagePath, 'utf-8')
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(homePageContent);
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

