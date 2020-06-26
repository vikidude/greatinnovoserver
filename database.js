const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb://localhost:27017/orders');
// mongoose.connect('mongodb+srv://http://54.191.235.179:27017/',{ useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {  
    // define Schema
    console.log('Connected To the DataBase');
})


mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
autoIncrement.initialize(mongoose);