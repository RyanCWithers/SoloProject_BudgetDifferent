const mongoose = require('mongoose');

module.exports = db_name =>{
    mongoose.connect(`mongodb://localhost/${db_name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

    .then(res =>console.log('Established connection with the database'))
    .catch(err => console.log('There was a problem', err))
};