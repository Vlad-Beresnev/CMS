const { TIMEOUT } = require('dns');
const fs = require('fs')

const registerUser = (userData) => {
    const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'));
    database.users.push(userData)
    fs.writeFileSync('database.json', JSON.stringify(database, null, 2))
}

const authenticateUser = (username, password) => {
    const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'))
    const user = database.users.find(
        (user) => user.username === username && user.password === password
    )
    console.log('Authenticated User:', user);
    return user
}

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

            req.on('end', () => {
                try {
                const { username, password, role} = JSON.parse(data)
                const user = authenticateUser(username, password)

                if (user) {
                    userSession["id"] = sessionId()
                    userSession["username"] = user.username
                    userSession["password"] = user.password
                    userSession["role"] = user.role
                
                    res.writeHead(200, { 'Contente-Type': 'text/plain'})
                    res.end('Login Successful')
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
            let data = '';
            req.on('data', (chunk) => {
                data += chunk
            })

            req.on('end', () => {
                try {
                const { username, password, role } = JSON.parse(data)

                if (!username || !password || !role) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' })
                    res.end('Username, password and role required')
                } else {
                    const userExist = existingUser(username)

                    if (userExist) {
                        res.writeHead(409, { 'Content-Type': 'text/plain' })
                        res.end('User already exists')
                    } else {
                        registerUser({ username, password, role })
                        console.log('User registered:', { username, password })
                        res.writeHead(201, { 'Content-Type': 'text/plain' })
                        res.end('User registered successfully')
                        }
                    }
                } catch (error) {
                    console.error('Error parsing user data:', error);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                }
            })
        // DELETE METHOD
        } else if (req.method === 'DELETE') {
        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain', 'Allow': 'GET, POST' });
            res.end('Method Not Allowed');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}


module.exports = authRoutes