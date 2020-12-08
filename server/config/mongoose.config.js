const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/new_budget_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

    .then(res =>console.log('Established connection with the database'))
    .catch(err => console.log('There was a problem'))