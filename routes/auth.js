const fs = require('fs')
const urlModule = require('url')
const argon2 = require('argon2')

const defaultPage = (authorPage, existingDatabase) => {
    const database = JSON.parse(JSON.stringify(existingDatabase));
    
    //ID Number
    const maxId = Math.max(...database.pages.map((page) => page.id), 0)
    const newId = (maxId + 1).toString()

    //URL formating
    const page_name = "New Page"

    const pageData = {
        page_name: "New Page",
        page_heading: "New Heading",
        text: "Here will be your text",
        image: "example-image-url.png",
        background_image: "example-background-image-url.png",
        address: "example 25 B 12",
        phone: "1234567890",
        email: "example@gmail.com"
    }
    
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
        author: authorPage
    }

    const timestampData = {
        created_at: timestamp
    }

    const mergedPageData = { ...defaultPageData, ...pageData, ...timestampData }
    
    database.pages.push(mergedPageData)
    return database
}

const registerUser = (userData) => {
    const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'));
    //database.users.push(userData)
    const updatedDatabase = defaultPage(userData.username, database)
    updatedDatabase.users.push(userData)
    fs.writeFileSync('database.json', JSON.stringify(updatedDatabase, null, 2))
}

const authenticateUser = async (username, password) => {
    const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'));
    const user = database.users.find((user) => user.username === username);

    if (user && (await argon2.verify(user.password, password))) {
        console.log('Authenticated User:', user);
        return user;
    }

    return null;
};

const deleteUser = (usernameToDelete) => {
    const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'));
    const indexToDelete = database.users.findIndex(user => user.username === usernameToDelete);

    if (indexToDelete !== -1) {
        database.users.splice(indexToDelete, 1);
        fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
        return true; // User deleted successfully
    }

    return false; // User not found
};

const existingUser = (username) => {
    const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'))
    const user = database.users.find(
        (user) => user.username === username
    )
    return user
}

const userSession = {}

var sessionId = function () {
    var rand = function() {
        return Math.random().toString(36).substr(2);
    }
    return rand() + rand();
}

// logout function
function logout(userSession)  {
    userSession['id'] = ''
    userSession['username'] = ''
    userSession['password'] = ''
    userSession['role'] = ''
    console.log(`user's session has been deleted : ${userSession}`)
}


const serveDynamicHtml = (req, res, filePath, contentType) => {
   
    fs.readFile(filePath, 'utf-8', (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Internal Server Error');
        } else {
            const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'));
            
            

            let modifiedContent = 0;
            // Inject the dynamic content into the HTML
            if (filePath === path.join('views', 'loginPage.html')) {
                modifiedContent = content.replace('<h1 id="greetingText"></h1>', `<h1>${logOutPage.page_heading}</h1>`);
            }  
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(modifiedContent);
        }
    });
};

function serveStaticFile (req, res, filePath, contentType) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(`Error reading file ${filePath}: ${err.message}`)
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

    if (url.startsWith('/css')) {
        const cssFilePath = path.join('public', 'css', url.substring(5));
        serveStaticFile(req, res, cssFilePath, 'text/css');
    } else if (url.startsWith('/js')) {
        const jsFilePath = path.join('public', 'js', url.substring(4));
        serveStaticFile(req, res, jsFilePath, 'application/javascript');
    } else if (url.startsWith('/images')) {
        const imagePath = path.join('public', 'images', url.substring(7));
        serveStaticFile(req, res, imagePath, 'image/png');
    } 
    else if (url === '/auth/login') {
        if (req.method === 'GET') {
            const loginPagePath = path.join( 'views', 'loginPage.html');
            serveDynamicHtml(req, res, loginPagePath, 'text/html');
        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain', 'Allow': 'GET' });
            res.end('Method Not Allowed');
        }
    }
}

// TRASHHHHH
const authRoutes = (req, res) => {
    const url = req.url || ''
    if (url === '/auth/login') {
        // GET METHOD
        if (req.method === 'GET') {
            res.writeHead(200, { 'Contente-Type': 'text/plain'})
            res.end('Login Form')
        }
        // POST METHOD
        else if (req.method === 'POST') {
            let data = ''
            req.on('data', (chunk) => {
                data += chunk
            })

            req.on('end', async () => {
                try {
                const { username, new_password } = JSON.parse(data)
                const user = await authenticateUser(username, new_password)
                if (user && user.password) {
                    userSession["id"] = sessionId()
                    userSession["username"] = user.username
                    userSession["password"] = user.password
                    userSession["role"] = user.role

                    res.writeHead(200, { 'Contente-Type': 'application/json'})
                    res.end(`Welcome ${userSession.username}`)
                    console.log(userSession)
                } else {
                    res.writeHead(401, { 'Contente-Type': 'text/plain'})
                    res.end('Invalid credentials')
                }
            } catch (error) {
                console.error('Error parsing request body:', error);
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Bad Request');
            }
        })
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain', 'Allow': 'GET, POST' });
        res.end('Method Not Allowed');
    }
    } else if (url === '/auth/users') {
        // GET METHOD
        if (req.method === 'GET') {
            if (userSession["role"] === 'admin') {
                res.writeHead(200, { 'Content-Type': 'text/plain', 'Allow': 'GET, POST' });
                res.end('Users Management');
            } else {
                res.writeHead(403, { 'Content-Type': 'text/plain' });
                res.end('Forbidden: Only admin users can access this route');
            }
        } 
        // POST METHOD
        else if (req.method === 'POST') {
            if (userSession["role"] === 'admin') {
                let data = '';
                req.on('data', (chunk) => {
                    data += chunk
                })

                req.on('end', async () => {
                    try {
                    const { username, new_password, role } = JSON.parse(data)

                    if (!username || !new_password || !role) {
                        res.writeHead(400, { 'Content-Type': 'text/plain' })
                        res.end('Username, password and role required')
                    } else {
                        const password = await argon2.hash(new_password)
                        const userExist = existingUser(username)

                        if (userExist) {
                            res.writeHead(409, { 'Content-Type': 'text/plain' })
                            res.end('User already exists')
                        } else {
                            registerUser({ username, password, role })
                            console.log('User created:', { username, password, role })
                            res.writeHead(201, { 'Content-Type': 'text/plain' })
                            res.end('User created successfully')
                            }
                    }
                } catch (error) {
                    console.error('Error parsing user data:', error);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                }
                })
            } else {
                res.writeHead(403, { 'Content-Type': 'text/plain' });
                res.end('Forbidden: Only admin users can access this route');
            }
            
        } 
    // DELETE METHOD
    } else if (req.method === 'DELETE') {
            if (userSession.role === 'admin') {
                const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'));
                const parsedUrl = urlModule.parse(req.url, true);
                const userId = parsedUrl.pathname.split('/').pop(); // Extract the user id from the URL
                if (!userId) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('User ID to delete is required');
                } else {
                    const userIndex = database.users.findIndex(user => user.username === userId);
            
                    if (userIndex === -1) {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('User not found');
                    } else if (userId === userSession.username) {
                        res.writeHead(400, { 'Content-Type': 'text/plain' });
                        res.end('You can not delete yourself!');
                    } else {
                        // Remove the user from the array
                        const deletedUser = database.users.splice(userIndex, 1)[0];
                        
                        // Save the updated database to the file
                        fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
                        console.log(`User ${userId} deleted successfully!`)
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(deletedUser, null, 2));
                    }
                }
            } else {
                res.writeHead(403, { 'Content-Type': 'text/plain' });
                res.end('Forbidden: Only admin users can access this route');
            }
                
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}



module.exports = {
    // authRoutes,
    userSession,
    handleStaticFiles
}