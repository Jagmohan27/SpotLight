require('dotenv').config({ debug: false });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

/* ---------- SECURITY HARDENING HEADERS ---------- */
app.disable('x-powered-by');
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});


/* ---------- SERVERLESS-READY MONGODB CONNECTION ---------- */
mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;

let isConnected = false;

const connectDB = async () => {
    if (isConnected || mongoose.connection.readyState >= 1) {
        return;
    }
    if (!process.env.MONGO_URI) {
        console.warn('⚠️ MONGO_URI is missing in environment variables');
        throw new Error('MONGO_URI environment variable is missing');
    }
    await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log('✅ MongoDB connected');
};

// Database Connection Middleware for Vercel Serverless
app.use(async (req, res, next) => {
    // Skip DB connection for basic root health check
    if (req.path === '/') {
        return next();
    }
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error('❌ DB Middleware Error:', err.message);
        return res.status(500).json({ error: 'Database connection failed: ' + err.message });
    }
});

app.use(cors({ origin: '*', credentials: true }));
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 8000;

// Root route — health check
app.get('/', (req, res) => {
    res.json({ message: 'Spotlight Backend API is running 🚀', status: 'online' });
});

// Auth API
app.use('/auth', require('./routes/auth.js'));

// Posts API
app.use('/posts', require('./routes/post.js'));

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
});

if (process.env.NODE_ENV !== 'production' || require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running → http://localhost:${PORT}`);
    });
}

module.exports = app;