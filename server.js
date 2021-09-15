const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = express();

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
