const express = require('express');
const app = express();
const PORT = 3000;

// Middleware - must come before routes
app.use(express.json()); // replaces body-parser

// Add this for debugging
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// POST endpoint
app.post('/arrest', (req, res) => {
  try {
    // Validate body exists
    if (!req.body) {
      return res.status(400).json({ error: 'Request body is missing' });
    }

    const { numbers, userId } = req.body;

    // Validate numbers exists and is an array
    if (!numbers) {
      return res.status(400).json({ error: 'Missing numbers array' });
    }
    if (!Array.isArray(numbers)) {
      return res.status(400).json({ error: 'Numbers must be an array' });
    }

    // Process numbers
    const oddNumbers = numbers.filter(n => n % 2 !== 0);
    const evenNumbers = numbers.filter(n => n % 2 === 0);

    // Send response
    res.json({
      status: 'success',
      userId: userId || 'default-user',
      oddNumbers,
      evenNumbers
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});