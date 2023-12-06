const http = require('http')
const { authRoutes, userSession } = require('./routes/auth')
const contentRoutes = require('./routes/content')
const { handleStaticFiles } = require('./routes/content')
const fs = require('fs')
const urlModule = require('url')
const path = require('path')







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

