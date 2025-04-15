const express = require('express');
const userRoutes = require('./route/user');
const docRoutes = require('./route/doc');
const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/doc', docRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});