const e = require('express')
const fs = require('fs')



const existingPage = (page_name) => {
    const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'))
    const page = database.pages.find(
        (page) => page.page_name === page_name
    )
    return page
}

const creatingPage = (pageData) => {
    const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'));
    
    //ID Number
    const maxId = Math.max(...database.pages.map((page) => page.id), 0)
    const newId = maxId + 1

    //URL formating
    const page_name = pageData.page_name
    
    const url = (pageName) => {
        // Make it lowercase
        let formattedUrl = pageName.toLowerCase()
        // Replace spaces with dashes
        formattedUrl = formattedUrl.replace(/\s+/g, '-')
        // Remove symbols using a regular expression
        formattedUrl = formattedUrl.replace(/[^\w-]/g, '')

        return formattedUrl

    }

    const defaultPageData = {
        id: newId,
        url: url(page_name)
    }

    const mergedPageData = { ...defaultPageData, ...pageData }
    
    database.pages.push(mergedPageData)
    fs.writeFileSync('database.json', JSON.stringify(database, null, 2))
}

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
    // INTRANET PAGE
    } else if (url === '/intranet') {
        if (req.method === 'GET') {
            const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'))
            const pages = database.pages

            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(`
                <h1>Welcome Intranet Page!</h1>
                <h2>List of Pages</h2>
                
            `)
            pages.forEach((page) => {
                res.write(`
                <ul>
                    <li>${page.name} - ${page.heading}</li>
                </ul>
            `)
            })
            res.end('Welcome Intranet Page!')
            
        } else if (req.method === 'POST') {
            let data = ''

            req.on('data', (chunk) => {
                data += chunk
            })

            req.on('end', async () =>{
                try {
                    const { page_name, page_heading, text, image, background_image, address, phone, email } = JSON.parse(data)

                    if (!page_name || !page_heading || !text) {
                        res.writeHead(400, { 'Content-Type': 'text/plain' })
                        res.end('Username, password and role required')
                    } else {
                        if (existingPage(page_name)) {
                            res.writeHead(409, { 'Content-Type': 'text/plain' })
                            res.end("Page's name already exists")
                        } else {
                            creatingPage({ page_name, page_heading, text, image, background_image, address, phone, email })
                            console.log('User created:', { page_name, page_heading, text, image, background_image, address, phone, email })
                            res.writeHead(201, { 'Content-Type': 'text/plain' })
                            res.end('User created successfully')
                        }
                    }
                } catch(error) {
                    console.error('Error parsing request body:', error);
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Bad Request');
                }
            })
        } 
        else {
            res.writeHead(405, { 'Content-Type': 'text/plain', 'Allow': 'GET' });
            res.end('Method Not Allowed');
        }
    }
    else {
        res.write('Not Found')
        res.end()
    }
}


module.exports = contentRoutes