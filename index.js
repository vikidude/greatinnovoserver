const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');


const order = require('./api/router/orderRouter');

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Order Grab API."});
});
//app.use(express.static(path.join(__dirname,'dist/f2b')))
app.use(bodyparser.json({ limit: '5mb' }));
app.use(morgan('dev'));
app.disable('etag');
app.use('/api/order', order);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Orgin", "*");
    res.header("Access-Control-Allow-Header", "Orgin,X-Request-With, Content-Type, Accept");
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    next();
});

app.use((req, res, next) => {
    console.log('URL Called');
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
  //  logger.info('error',error.message);
    if(error.name==='ValidationError'){
        res.status(error.status || 500).json({
            error: {
                message: error.message
            }
        });        
    }else{

        
        res.status(error.status || 500).json({
            error: {
                message: error
            }
        });
    }    
});
//
//
//

module.exports = app;