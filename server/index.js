const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path')

const app = express();
// Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions))
// MySQL Connection Pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'bookstore',
    waitForConnections: true,
    multipleStatements: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Initialize Database
const initializeDatabase = () => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected to MySQL...');

        const sql = `
    CREATE DATABASE IF NOT EXISTS bookstore;
    USE bookstore;

    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        url VARCHAR(255),
        rating FLOAT,
        description TEXT,
        image_url VARCHAR(255),
        categories JSON
    );

    CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NULL,
        admin_id INT NULL,
        book_id INT NOT NULL,
        comment TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE,
        FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS ratings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NULL,
        admin_id INT NULL,
        book_id INT NOT NULL,
        rating FLOAT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE,
        FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS wishlists (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NULL,
        admin_id INT NULL,
        book_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE,
        FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS feedback (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NULL,
        admin_id INT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
    );
`;

        connection.query(sql, (err, result) => {
            connection.release(); // Release the connection back to the pool
            if (err) throw err;
            console.log('Database and tables created...');
        });
    });
};

// Call the function to initialize the database
initializeDatabase();

// Port
const PORT = 5000;

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.cookies['token'];

    if (!token) {
        return res.status(403).send('Token is required');
    }

    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).send('Invalid Token');
    }
};

// Middleware to check if admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Access denied');
    }
    next();
};


app.get('/', (re,res)=> {
    
})

// Admin and User Routes

// User Signup
app.post('/user/signup', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Please provide username and password');
    }

    pool.getConnection((err, connection) => {
        if (err) throw err;

        const checkUserSql = 'SELECT * FROM users WHERE username = ?';
        connection.query(checkUserSql, [username], (err, results) => {
            if (err) {
                connection.release();
                throw err;
            }

            if (results.length > 0) {
                connection.release();
                return res.status(400).send('User already exists');
            }

            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    connection.release();
                    throw err;
                }

                const insertUserSql = 'INSERT INTO users (username, password) VALUES (?, ?)';
                connection.query(insertUserSql, [username, hashedPassword], (err, result) => {
                    connection.release();
                    if (err) throw err;
                    res.status(201).json({msg:'User registered'});
                });
            });
        });
    });
});

// Admin Signup
app.post('/admin/signup', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Please provide username and password');
    }

    pool.getConnection((err, connection) => {
        if (err) throw err;

        const checkAdminSql = 'SELECT * FROM admins WHERE username = ?';
        connection.query(checkAdminSql, [username], (err, results) => {
            if (err) {
                connection.release();
                throw err;
            }

            if (results.length > 0) {
                connection.release();
                return res.status(400).send('Admin already exists');
            }

            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    connection.release();
                    throw err;
                }

                const insertAdminSql = 'INSERT INTO admins (username, password) VALUES (?, ?)';
                connection.query(insertAdminSql, [username, hashedPassword], (err, result) => {
                    connection.release();
                    if (err) throw err;
                    res.status(201).json({ msg: 'Admin registered' });
                });
            });
        });
    });
});

// User and Admin Login
app.post('/login', (req, res) => {
    const { username, password, role } = req.body; // Role must be passed as 'user' or 'admin'

    if (!username || !password || !role) {
        return res.status(400).send('Please provide username, password, and role');
    }

    pool.getConnection((err, connection) => {
        if (err) throw err;

        const table = role === 'admin' ? 'admins' : 'users';
        const sql = `SELECT * FROM ${table} WHERE username = ?`;

        connection.query(sql, [username], (err, results) => {
            if (err) {
                connection.release();
                throw err;
            }

            if (results.length === 0) {
                connection.release();
                return res.status(400).send(`${role} not found`);
            }

            const user = results[0];

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    connection.release();
                    throw err;
                }

                if (!isMatch) {
                    connection.release();
                    return res.status(400).send('Incorrect password');
                }

                const token = jwt.sign({ id: user.id, role }, 'secretkey', { expiresIn: '1h' });
                connection.release();
                res.cookie('token', token, { httpOnly: false, secure: true, maxAge: 3600000});
                res.json({ message: 'Logged in successfully' });
            });
        });
    });
});

// Book Routes

// Get all books with comments and ratings
app.get('/books', verifyToken, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;

        const sql = `
            SELECT 
                b.id, b.title, b.author, b.price, b.url, b.rating, b.description, b.image_url, b.categories,
                c.comment, c.created_at AS comment_date,
                r.rating, r.created_at AS rating_date
            FROM books b
            LEFT JOIN comments c ON b.id = c.book_id
            LEFT JOIN ratings r ON b.id = r.book_id
        `;

        connection.query(sql, (err, results) => {
            connection.release();
            if (err) throw err;
            res.json(results);
        });
    });
});

app.post('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: false, secure: true });
    res.status(200).json({ message: 'Logged out successfully' });
});


// Add a book (Admin only)
app.post('/books', verifyToken, isAdmin, (req, res) => {
    const { title, author, price, url, rating, description, image_url, categories } = req.body;

    if (!title || !author || !price) {
        return res.status(400).send('Please provide title, author, and price');
    }

    const categoriesJson = JSON.stringify(categories);

    pool.getConnection((err, connection) => {
        if (err) throw err;

        const sql = 'INSERT INTO books (title, author, price, url, rating, description, image_url, categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(sql, [title, author, price, url, rating, description, image_url, categoriesJson], (err, result) => {
            connection.release();
            if (err) throw err;
            res.status(201).send('Book added');
        });
    });
});

// Update a book (Admin only)
app.put('/books/:id', verifyToken, isAdmin, (req, res) => {
    const { title, author, price, url, rating, description, image_url, categories } = req.body;
    const { id } = req.params;

    const categoriesJson = JSON.stringify(categories);

    pool.getConnection((err, connection) => {
        if (err) throw err;

        const sql = 'UPDATE books SET title = ?, author = ?, price = ?, url = ?, rating = ?, description = ?, image_url = ?, categories = ? WHERE id = ?';
        connection.query(sql, [title, author, price, url, rating, description, image_url, categoriesJson, id], (err, result) => {
            connection.release();
            if (err) throw err;
            res.send('Book updated');
        });
    });
});

// Delete a book (Admin only)
app.delete('/books/:id', verifyToken, isAdmin, (req, res) => {
    const { id } = req.params;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        const sql = 'DELETE FROM books WHERE id = ?';
        connection.query(sql, [id], (err, result) => {
            connection.release();
            if (err) throw err;
            res.send('Book deleted');
        });
    });
});

// Comment Routes

// Add a comment (User or Admin)
app.post('/books/:book_id/comments', verifyToken, (req, res) => {
    const { comment } = req.body;
    const { book_id } = req.params;
    const user_id = req.user.role === 'user' ? req.user.id : null;
    const admin_id = req.user.role === 'admin' ? req.user.id : null;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        const sql = 'INSERT INTO comments (user_id, admin_id, book_id, comment) VALUES (?, ?, ?, ?)';
        connection.query(sql, [user_id, admin_id, book_id, comment], (err, result) => {
            connection.release();
            if (err) throw err;
            res.status(201).send('Comment added');
        });
    });
});

// Rating Routes

// Add a rating (User or Admin)
app.post('/books/:book_id/ratings', verifyToken, (req, res) => {
    const { rating } = req.body;
    const { book_id } = req.params;
    const user_id = req.user.role === 'user' ? req.user.id : null;
    const admin_id = req.user.role === 'admin' ? req.user.id : null;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        const sql = 'INSERT INTO ratings (user_id, admin_id, book_id, rating) VALUES (?, ?, ?, ?)';
        connection.query(sql, [user_id, admin_id, book_id, rating], (err, result) => {
            connection.release();
            if (err) throw err;
            res.status(201).send('Rating added');
        });
    });
});

// Feedback Routes

// Add website feedback (User or Admin)
app.post('/feedback', verifyToken, (req, res) => {
    const { feedback } = req.body;
    const user_id = req.user.role === 'user' ? req.user.id : null;
    const admin_id = req.user.role === 'admin' ? req.user.id : null;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        const sql = 'INSERT INTO feedback (user_id, admin_id, feedback) VALUES (?, ?, ?)';
        connection.query(sql, [user_id, admin_id, feedback], (err, result) => {
            connection.release();
            if (err) throw err;
            res.status(201).send('Feedback added');
        });
    });
});

// Get feedback (Admin only)
app.get('/feedback', verifyToken, isAdmin, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;

        const sql = 'SELECT * FROM feedback';
        connection.query(sql, (err, results) => {
            connection.release();
            if (err) throw err;
            res.json(results);
        });
    });
});

// Wishlist Routes

// Add book to wishlist (User or Admin)
app.post('/wishlist', verifyToken, (req, res) => {
    const { book_id } = req.body;
    const user_id = req.user.role === 'user' ? req.user.id : null;
    const admin_id = req.user.role === 'admin' ? req.user.id : null;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        const sql = 'INSERT INTO wishlist (user_id, admin_id, book_id) VALUES (?, ?, ?)';
        connection.query(sql, [user_id, admin_id, book_id], (err, result) => {
            connection.release();
            if (err) throw err;
            res.status(201).send('Book added to wishlist');
        });
    });
});

// Get wishlist (User or Admin)
app.get('/wishlist', verifyToken, (req, res) => {
    const user_id = req.user.role === 'user' ? req.user.id : null;
    const admin_id = req.user.role === 'admin' ? req.user.id : null;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        const sql = 'SELECT b.* FROM books b JOIN wishlist w ON b.id = w.book_id WHERE w.user_id = ? OR w.admin_id = ?';
        connection.query(sql, [user_id, admin_id], (err, results) => {
            connection.release();
            if (err) throw err;
            res.json(results);
        });
    });
});

// Server Listening
app.listen(PORT, () => {
    console.log('Server running on port: 5000');
});

// Middleware to verify token
// const verifyToken = (req, res, next) => {
//     const token = req.cookie['token'];

//     if (!token) {
//         return res.status(403).send('Token is required');
//     }

//     try {
//         const decoded = jwt.verify(token, 'secretkey');
//         req.user = decoded;
//         next();
//     } catch (err) {
//         console.log(err)
//         return res.status(401).send('Invalid Token');
//     }
// };

// // Middleware to check if admin
// const isAdmin = (req, res, next) => {
//     if (req.user.role !== 'admin') {
//         return res.status(403).send('Access denied');
//     }
//     next();
// };

// app.get('/admin-login', (req, res) => {
//     // res.sendFile(path.join(__dirname, './public/index.html'));
//     res.sendFile(path.join(__dirname, './public/components/admin/LoginFormAdmin.html'));
// })
// app.get('/admin-signup', (req, res) => {
//     // res.sendFile(path.join(__dirname, './public/index.html'));
//     res.sendFile(path.join(__dirname, './public/components/admin/signupForm.html'));
// })

// // User Signup
// app.post('/user/signup', (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).send('Please provide username and password');
//     }

//     pool.getConnection((err, connection) => {
//         if (err) throw err;

//         const checkUserSql = 'SELECT * FROM users WHERE username = ?';
//         connection.query(checkUserSql, [username], (err, results) => {
//             if (err) {
//                 connection.release();
//                 throw err;
//             }

//             if (results.length > 0) {
//                 connection.release();
//                 return res.status(400).send('User already exists');
//             }

//             bcrypt.hash(password, 10, (err, hashedPassword) => {
//                 if (err) {
//                     connection.release();
//                     throw err;
//                 }

//                 const insertUserSql = 'INSERT INTO users (username, password) VALUES (?, ?)';
//                 connection.query(insertUserSql, [username, hashedPassword], (err, result) => {
//                     connection.release();
//                     if (err) throw err;
//                     res.status(201).send('User registered');
//                 });
//             });
//         });
//     });
// });

// // Admin Signup
// app.post('/admin/signup', (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).send('Please provide username and password');
//     }

//     pool.getConnection((err, connection) => {
//         if (err) throw err;

//         const checkAdminSql = 'SELECT * FROM admins WHERE username = ?';
//         connection.query(checkAdminSql, [username], (err, results) => {
//             if (err) {
//                 connection.release();
//                 throw err;
//             }

//             if (results.length > 0) {
//                 connection.release();
//                 return res.status(400).send('Admin already exists');
//             }

//             bcrypt.hash(password, 10, (err, hashedPassword) => {
//                 if (err) {
//                     connection.release();
//                     throw err;
//                 }

//                 const insertAdminSql = 'INSERT INTO admins (username, password) VALUES (?, ?)';
//                 connection.query(insertAdminSql, [username, hashedPassword], (err, result) => {
//                     connection.release();
//                     if (err) throw err;
//                     res.status(201).json({ msg: 'Admin registered' });
//                 });
//             });
//         });
//     });
// });

// // User Login
// app.post('/user/login', (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).send('Please provide username and password');
//     }

//     pool.getConnection((err, connection) => {
//         if (err) throw err;

//         const sql = 'SELECT * FROM users WHERE username = ?';
//         connection.query(sql, [username], (err, results) => {
//             if (err) {
//                 connection.release();
//                 throw err;
//             }

//             if (results.length === 0) {
//                 connection.release();
//                 return res.status(400).send('User not found');
//             }

//             const user = results[0];

//             bcrypt.compare(password, user.password, (err, isMatch) => {
//                 if (err) {
//                     connection.release();
//                     throw err;
//                 }

//                 if (!isMatch) {
//                     connection.release();
//                     return res.status(400).send('Incorrect password');
//                 }

//                 const token = jwt.sign({ id: user.id, role: 'user' }, 'secretkey', { expiresIn: '1h' });
//                 connection.release();
//                 res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 3600000 }); // Adjust options as needed
//                 res.json({ message: 'Logged in successfully' });
//             });
//         });
//     });
// });

// // Admin Login
// app.post('/admin/login', (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).send('Please provide username and password');
//     }

//     pool.getConnection((err, connection) => {
//         if (err) throw err;

//         const sql = 'SELECT * FROM admins WHERE username = ?';
//         connection.query(sql, [username], (err, results) => {
//             if (err) {
//                 connection.release();
//                 throw err;
//             }

//             if (results.length === 0) {
//                 connection.release();
//                 return res.status(400).send('Admin not found');
//             }

//             const admin = results[0];

//             bcrypt.compare(password, admin.password, (err, isMatch) => {
//                 if (err) {
//                     connection.release();
//                     throw err;
//                 }

//                 if (!isMatch) {
//                     connection.release();
//                     return res.status(400).send('Incorrect password');
//                 }

//                 const token = jwt.sign({ id: admin.id, role: 'admin' }, 'secretkey', { expiresIn: '1h' });
//                 connection.release();
//                 res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 3600000 }); // Adjust options as needed
//                 res.json({ message: 'Admin Logged in successfully' });
//             });
//         });
//     });
// });

// // Get all books
// app.get('/books', verifyToken, (req, res) => {
//     pool.getConnection((err, connection) => {
//         if (err) throw err;

//         const sql = 'SELECT * FROM books';
//         connection.query(sql, (err, results) => {
//             connection.release();
//             if (err) throw err;
//             res.json(results);
//         });
//     });
// });

// // Add a book (Admin only)
// app.post('/books', verifyToken, isAdmin, (req, res) => {
//     const { title, author, price, url, rating, description, image_url, categories } = req.body;

//     const categoriesJson = JSON.stringify(categories);
//     if (!title || !author || !price) {
//         return res.status(400).send('Please provide title, author, and price');
//     }

//     pool.getConnection((err, connection) => {
//         if (err) throw err;

//         const sql = 'INSERT INTO books (title, author, price, url, rating, description, image_url, categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
//         connection.query(sql, [title, author, price, url, rating, description, image_url, categoriesJson], (err, result) => {
//             connection.release();
//             if (err) throw err;
//             res.status(201).send('Book added');
//         });
//     });
// });

// // Update a book (Admin only)
// app.put('/books/:id', verifyToken, isAdmin, (req, res) => {
//     const { title, author, price, url, rating, description, image_url, categories } = req.body;
//     const { id } = req.params;
//     if (!title || !author || !price) {
//         return res.status(400).send('Please provide title, author, and price');
//     }

//     const categoriesJson = JSON.stringify(categories);
//     pool.getConnection((err, connection) => {
//         if (err) throw err;

//         const sql = 'UPDATE books SET title = ?, author = ?, price = ?, url = ?, rating = ?, description = ?, image_url = ?, categories = ?  WHERE id = ?';

//         connection.query(sql, [title, author, price, url, rating, description, image_url, categoriesJson, id], (err, result) => {
//             connection.release();
//             if (err) throw err;
//             res.send('Book updated');
//         });
//     });
// });

// // Delete a book (Admin only)
// app.delete('/books/:id', verifyToken, isAdmin, (req, res) => {
//     const { id } = req.params;

//     pool.getConnection((err, connection) => {
//         if (err) throw err;

//         const sql = 'DELETE FROM books WHERE id = ?';
//         connection.query(sql, [id], (err, result) => {
//             connection.release();
//             if (err) throw err;
//             res.send('Book deleted');
//         });
//     });
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
