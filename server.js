const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.route'));

// Server settings
const PORT = process.env.PORT;

// Server start
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
