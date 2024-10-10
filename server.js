const express = require('express');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    const bodyParser = require('body-parser');
    const path = require('path');
    const crypto = require('crypto');
    const nodemailer = require('nodemailer');
    const session = require('express-session');
    const passport = require('passport'); 
    const mysql = require('mysql2/promise'); // Add this line
    const router = express.Router();

    require('dotenv').config();
    require('./passport');
    console.log('Loaded JWT_SECRET:', process.env.JWT_SECRET); 

    const app = express();
    const port = 3000; // Define the port number once

    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'public')));

 
    app.use(session({
        secret: process.env.SESSION_SECRET, // Replace with a secure secret
        resave: false,
        saveUninitialized: true
    }));

    app.get('/token', (req, res) => {
        const token = jwt.sign({ id: 'exampleId' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });

    app.use(passport.initialize());
    app.use(passport.session());

    // Google OAuth Routes
    app.get('/auth/google',
        passport.authenticate('google', { scope: ['profile', 'email'] })
    );

    app.get('/auth/google/callback',
        passport.authenticate('google', { session: false }),
        (req, res) => {
            // Generate JWT token for authenticated user
            const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.redirect(`/index.html?token=${token}`);

        }
    );
    // MySQL database connection
    const db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password:'sahil',
        database: 'kisanbazaar',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    const transporter = nodemailer.createTransport({
        service: 'gmail', // For example, use 'gmail' or 'outlook'
        auth: {
            user: process.env.SMTP_USER, // e.g., 'your-email@gmail.com'
            pass: process.env.SMTP_PASS  // e.g., 'your-password'
        }
        
    });


    async function query(sql, params) {
        try {
            const [results, ] = await db.query(sql, params);
            return results;
        } catch (error) {
            console.error('Query error:', error);
            throw error;
        }
    
    }
    // Serve Second.html on root path
app.get('./index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Your existing code follows...
app.post('/checkout', (req, res) => {
    const { name, phone, email, address, totalQuantity, totalPrice,products } = req.body; // Capture email
    let productDetails = products.map(product => {
        return `${product.name} - ₹${product.price} x ${product.quantity} = ₹${(product.price * product.quantity).toFixed(2)}\n`;
    }).join('');

    const mailOptions = {
        from: '', // Your email
        to: 'unknow100ss@gmail.com',
        subject: 'New Checkout Order',
        text: `
            Name: ${name}
            Phone: ${phone}
            Email: ${email} 
            Address: ${address}
            Products:
            ${productDetails} 
            Total Quantity: ${totalQuantity}
            Total Price: ₹${totalPrice}
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Order placed successfully!');
    });
});
    // User registration endpoint

    app.post('/api/users/Signup', async (req, res) => {
        const { name,mobile_number, email, passwordSignUp, confirmPassword } = req.body;

        if ( !name || !mobile_number || !email || !passwordSignUp|| !confirmPassword) {
            return res.status(400).send('All fields are required.');
        }

        if (passwordSignUp!== confirmPassword) {
            return res.status(400).send('Passwords do not match.');
        }

        try {
            const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

            if (rows.length > 0) {
                return res.status(400).send('User already exists.');
            }

            const hashedPassword = await bcrypt.hash(passwordSignUp, 10);

            await db.query('INSERT INTO users (name,mobile_number, email, hashedPassword) VALUES (?,?, ?, ?)', [name,mobile_number, email, hashedPassword]);

            res.status(201).send('User registered successfully.');
        } catch (error) {
            res.status(500).send('Error registering user: ' + error.message);
        }
    });

    // User login endpoint
    app.post('/api/users/Login', async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        try {
            const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

            if (rows.length === 0) {
                return res.status(401).json({ message: 'Invalid email or password.' });
                                }

            const user = rows[0];

            // Debugging: Check if hashedPassword is correctly retrieved
            console.log('Password from request:', password);
            console.log('Hashed password from database:', user.hashedPassword);

            // Ensure hashedPassword is not undefined
            if (!user.hashedPassword) {
                return res.status(500).send('User record missing hashed password.');
            }
                                                                                
            const isMatch = await bcrypt.compare(password, user.hashedPassword);

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({ token });
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).send('Error logging in user: ' + error.message);
        }
    });

   // Forgot Password Endpoint
app.post('/api/users/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send('Email is required.');
    }

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user) {
            return res.status(404).send('User not found.');
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expiration = new Date(Date.now() + 3600000); // 1 hour

        await db.query('UPDATE users SET reset_token = ?, reset_token_expiration = ? WHERE email = ?', [token, expiration, email]);

        const resetUrl = `http://localhost:${port}/reset.html?token=${token}`;

        await transporter.sendMail({
            to: email,
            from: process.env.SMTP_USER,
            subject: 'Password Reset Request',
             html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 1 hour.</p>`
        });

        res.send('Password reset link sent.');
    } catch (error) {
        console.error('Error requesting password reset:', error);
        res.status(500).send('Error requesting password reset: ' + error.message);
    }
});

    // Reset Password Endpoint
    app.post('/api/users/reset-password/:token', async (req, res) => {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).send('Password is required.');
        }

        try {
            const [rows] = await db.query('SELECT * FROM users WHERE reset_token = ? AND reset_token_expiration > ?', [token, new Date()]);
            const user = rows[0];

            if (!user) {
                return res.status(400).send('Token is invalid or has expired.');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await db.query('UPDATE users SET hashedPassword = ?, reset_token = NULL, reset_token_expiration = NULL WHERE reset_token = ?', [hashedPassword, token]);

            res.send('Password updated successfully.');
        } catch (error) {
            console.error('Error resetting password:', error);
            res.status(500).send('Error resetting password: ' + error.message);
        }
    });

  // Contact form endpoint
app.post('/api/contact', async (req, res) => {
    console.log('Contact Form Data:', req.body);
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Here you can either save to a database or send an email
        // For demonstration, let's send an email

        await transporter.sendMail({
            to: 'sahilmistry444@gmail.com', // Change this to the email you want to receive messages
            from: email,
            subject: 'New Contact Form Submission',
            html:` <p>Kisan Bazaar</p> <p>Name: ${name}</p><p>Email: ${email}</p>Problem -><p>: ${message}</p>`
        });

        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending contact message:', error);
        res.status(500).json({ error: 'Error sending message. Please try again later.' });
    }
});
  
  
  

  console.log('SMTP_USER:', process.env.SMTP_USER);
    console.log('SMTP_PASS:', process.env.SMTP_PASS);
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.SESSION_SECRET || !process.env.JWT_SECRET) {
        console.error('Required environment variables are missing.');
        process.exit(1);
    }
    

     // Start the server
     app.listen(port, () => {    
        console.log(`Server running on http://localhost:${port}`);
    });