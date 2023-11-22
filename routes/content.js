const fs = require('fs')
const urlModule = require('url')
const { userSession } = require('../routes/auth')


const existingPage = (page_name) => {
    const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'))
    const page = database.pages.find(
        (page) => page.page_name === page_name && !page.id.startsWith('-')
    )
    return page
}

const creatingPage = (pageData) => {
    const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'));
    
    //ID Number
    const maxId = Math.max(...database.pages.map((page) => page.id), 0)
    const newId = (maxId + 1).toString()

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

    const timestamp = new Date().toISOString()

    const defaultPageData = {
        id: newId,
        url: url(page_name),
        author: userSession.username
    }

    const timestampData = {
        created_at: timestamp
    }

    const mergedPageData = { ...defaultPageData, ...pageData, ...timestampData }
    
    database.pages.push(mergedPageData)
    fs.writeFileSync('database.json', JSON.stringify(database, null, 2))
}

const updateUrl = (pageName) => {
    // Make it lowercase
    let formattedUrl = pageName.toLowerCase()
    // Replace spaces with dashes
    formattedUrl = formattedUrl.replace(/\s+/g, '-')
    // Remove symbols using a regular expression
    formattedUrl = formattedUrl.replace(/[^\w-]/g, '')

    return formattedUrl

}

const patchPage = (pageId, updatedData) => {
    const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'))

    const pageIndex = database.pages.findIndex((page) => page.id === pageId)

    if (pageIndex === -1) {
        return null
    }
    const originalPage = database.pages[pageIndex]

    const timestamp = new Date().toISOString()
    
    originalPage.modified_at = timestamp

    //ID Number
    const maxId = Math.min(...database.pages.map((page) => page.id), 0)
    const newId = (maxId - 1).toString()

    //const newVersionId = '-' + originalPage.id
    
    const newVersion = {
        id: newId,
        url: updateUrl(originalPage.page_name),
        author: originalPage.author,
        page_name: originalPage.page_name,
        page_heading: originalPage.page_heading,
        text: originalPage.text,
        image: originalPage.image,
        background_image: originalPage.background_image,
        address: originalPage.address,
        phone: originalPage.phone,
        email: originalPage.email,
        created_at: originalPage.created_at,
        modified_at: timestamp,
    };

    originalPage.url = updateUrl(originalPage.page_name)

    // Update the existing page with the new data
    database.pages[pageIndex] = {
        ...originalPage,
        ...updatedData,
    };

    database.pages.push(newVersion);

    // Save the updated database to the file
    fs.writeFileSync('database.json', JSON.stringify(database, null, 2));

    return newVersion;
} 

const deletePage = async (pageId) => {
    try {
        const database = JSON.parse(await fs.promises.readFile('database.json', 'utf-8'));

        const pageIndex = database.pages.findIndex((page) => page.id === pageId);

        if (pageIndex === -1) {
            return null;
        }

        const deletedPage = database.pages.splice(pageIndex, 1)[0];
        
        //ID Number
        const maxId = Math.min(...database.pages.map((page) => page.id), 0)
        const newId = (maxId - 1).toString()

        // Save last version
        //const newVersionId = '-' + deletedPage.id
        const timestamp = new Date().toISOString()
        const newVersion = {
            id: newId,
            url: deletedPage.url,
            author: deletedPage.author,
            page_name: deletedPage.page_name,
            page_heading: deletedPage.page_heading,
            text: deletedPage.text,
            image: deletedPage.image,
            background_image: deletedPage.background_image,
            address: deletedPage.address,
            phone: deletedPage.phone,
            email: deletedPage.email,
            created_at: deletedPage.created_at,
            deleted_at: timestamp,
        };
        
        database.pages.push(newVersion);
        
        // Save the updated database to the file
        await fs.promises.writeFile('database.json', JSON.stringify(database, null, 2));
        
        return deletedPage;
    } catch (error) {
        console.error('Error deleting page:', error);
        throw error;
    }
};


const contentRoutes = async (req, res) => {
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
                if (!page.id.startsWith('-')) {
                    res.write(`
                    <ul>
                        <li>${page.page_name} - ${page.page_heading}</li>
                    </ul>
                `)
                }
            })
            res.end('Welcome Intranet Page!')
            
        } 
        else {
            res.writeHead(405, { 'Content-Type': 'text/plain', 'Allow': 'GET' });
            res.end('Method Not Allowed');
        }
    } else if (url === "/intranet/add" && userSession.role === 'admin') {
        if (req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'text/html'})
            res.end('View Add Content Form')
        } 
        else if (req.method === 'POST') {
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
                        const expage = existingPage(page_name)
                        if (expage) {
                            res.writeHead(409, { 'Content-Type': 'text/plain' })
                            res.end("Page's name already exists")
                        } else {
                            creatingPage({ page_name, page_heading, text, image, background_image, address, phone, email })
                            console.log('Page created:', { page_name, page_heading, text, image, background_image, address, phone, email })
                            res.writeHead(201, { 'Content-Type': 'text/plain' })
                            res.end('Page created successfully')
                        }
                    }
                } catch(error) {
                    console.error('Error parsing request body:', error);
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Bad Request');
                }
            })
        } 
        
    } else if ( url.startsWith('/intranet/edit')) {
        const parsedUrl = urlModule.parse(req.url, true);
        const pageId = parsedUrl.pathname.split('/').pop();
        if (req.method === 'GET' && userSession.role === 'admin') {
            const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'));
            
            if (!pageId) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Page ID to edit is required');
            } else {
                const pageIndex = database.pages.findIndex(page => page.id === pageId);

                console.log('Page Index:', pageIndex);
                if (pageIndex === -1) {
                    console.log('No Index', pageId)
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Page not found');
                } else {
                    // Get the page details for editing
                    const pageToEdit = database.pages[pageIndex];
                    console.log('Page to Edit:', pageToEdit);
                    // Render the edit form or view, you can customize this part
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(`Edit Form for Page ID: ${pageId}, Name: ${pageToEdit.page_name}`);
                }
            }
        } else if (req.method === 'PATCH' && userSession.role === 'admin') {
        const parseUrl = urlModule.parse(req.url, true)
        const pageId = parsedUrl.pathname.split('/').pop()
        
        let data = ''

        req.on('data', (chunk) => {
            data += chunk
        })

        req.on('end', async () => {
            try {
                const updatedData = JSON.parse(data);

                const updatedPage = patchPage(pageId, updatedData);

                if (updatedPage) {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(`Page ${pageId} updated successfully!`);
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Page not found');
                }
            } catch (error) {
                console.error('Error parsing request body:', error);
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Bad Request');
            }
        })
        
    } else if (userSession.role !== 'admin') {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden: Only admin users can access this route');
    } 
    
    } else if (url.startsWith('/intranet/delete')) {
        try {
            if (req.method === 'GET' && userSession.role === 'admin') {
                res.writeHead(200, { 'Content-Type': 'text/plain' })
                res.end('Confirm the Deletion')
            }
            else if (req.method === 'DELETE' && userSession.role === 'admin') {
                const parsedUrl = urlModule.parse(req.url, true);
                const pageId = parsedUrl.pathname.split('/').pop();
    
                if (!pageId) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Page ID to delete is required');
                } else {
                    const deletedPage = await deletePage(pageId);
    
                    if (deletedPage) {
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end(`Page ${pageId} deleted successfully!`);
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('Page ID not found');
                    }
                }
            } else if (userSession.role !== 'admin') {
                res.writeHead(403, { 'Content-Type': 'text/plain' });
                res.end('Forbidden: Only admin users can access this route');
            }
        } catch(error) {
            console.error('Error parsing request body:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Bad Request');
        }
    } else if (userSession.role !== 'admin') {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden: Only admin users can access this route');
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Not Found')
        res.end()
    }
}

module.exports = contentRoutes