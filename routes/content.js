const contentRoutes = (req, res) => {
    const url = req.url || ''
    if (url=== '/content/add') {
        if (req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.end('View Add Content Form')
        }
        else if (req.method === 'POST') {
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.end('Add Content')
        }
        else {
            res.writeHead(405, { 'Content-Type': 'text/plain', 'Allow': 'GET, POST' })
            res.end('Method Not Allowed')
        }
    }
    else if (url=== '/content/edit') {
        if (req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('View Edit Content Form');
        } else if (req.method === 'PATCH') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Edit Content');
        } else if (req.method === 'DELETE') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Delete Content');

        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain', 'Allow': 'GET, POST' });
            res.end('Method Not Allowed');
        }
    }
    else {
        res.write('Not Found')
        res.end()
    }
}


module.exports = contentRoutes