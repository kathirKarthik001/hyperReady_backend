const express = require('express');
const userRoutes = require('./route/user');
const docRoutes = require('./route/doc');
const app = express();
const port = 3000;
const pool = require('./config/db');
const cors = require('cors');

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Allow frontend origin
    methods: ['GET', 'POST'], // Allow specific methods
    credentials: true // If you use cookies (not needed here)
  }));

app.use(express.json());

//  DB connection Check 
pool.query('SELECT NOW()')
    .then(res => console.log('DB Connected:', res.rows[0]))
    .catch(err => console.error('DB Connection Failed:', err.message));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/doc', docRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});