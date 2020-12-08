const express = require('express');
const cors = require('cors');
const app = express();

require('./config/mongoose.config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./routes/budget.routes')(app);
app.listen(8000, ()=> console.log('Listening on Port 8000'));