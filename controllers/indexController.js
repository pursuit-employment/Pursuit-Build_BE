const express = require('express');
const router = express.Router();

// Basic route to confirm server is live
router.get('/', (req, res) => {
    res.json({ message: 'Server is live and running' });
});

module.exports = router;
