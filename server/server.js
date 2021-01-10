require('dotenv').config();

const express = require('express');
const cors = require('cors');
require('./config/mongoose.config')(process.env.DB_NAME);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./routes/budget.routes')(app);
app.listen(process.env.DB_PORT, ()=> console.log(`Listening on Port ${process.env.DB_PORT}`));