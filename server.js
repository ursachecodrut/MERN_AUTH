require('dotenv').config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error.middleware');

// Connect DB
connectDB();

const app = express();

app.use(cors({ credentials: true, origin: '*' }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/private', require('./routes/private.route'));

// Error Handler (Should be the last piece of middleware)
app.use(errorHandler);

// Server settings
const PORT = process.env.PORT;

// Server start
const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
	console.log(`Logged Error: ${err}`);
	server.close(() => process.exit(1));
});
