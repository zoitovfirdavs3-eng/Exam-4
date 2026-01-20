require('dotenv').config();
const express = require('express');
const mainRouter = require('./router/main.routes');

const app = express();
app.use(express.json());

app.use("/api", mainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}-port`));