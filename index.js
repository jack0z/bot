const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to proxy Bitquery requests
app.post('/api/bitquery', async (req, res) => {
    try {
        const response = await axios.post('https://graphql.bitquery.io', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'BQYpQlWWHOZ7H6pF32dtvReK7m4kFvVo', // Replace with your actual API key
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error in proxy server:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});