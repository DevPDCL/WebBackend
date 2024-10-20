const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactRouter = require('./routers/ContactRouter');
const complaintRouter = require('./routers/ComplaintSubmissionRouter');
const sampleCollectionRouter = require('./routers/SampleCollectionRouter');
const createError = require('http-errors');
const { errorResponse } = require('./controllers/ResponseController');


const rateLimiter = rateLimit(
    {
        windowMs: 1*60*1000,
        limit: 15,
        Message: 'Too many request from this IP, please try again later.'
    }
)


const app = express();

app.use(morgan("dev"));
app.use(rateLimiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/api/messages', contactRouter);
app.use('/api/complaints', complaintRouter);
app.use('/api/sample-collections', sampleCollectionRouter);

app.use('/api/cicd', (req,res) => {
    res.status(200).send({
        Message: "CICD is working fine"
    })
} );

app.get("/", rateLimiter, (req, res)=> {
    res.status(200).send({
        Message: "Welcome to Root of our API server"
    })
});

// client error handling
app.use((req, res, next)=> {
    next(createError(404, 'route not found'));
});

// Server error handling
app.use((err, req, res, next)=> {
    return errorResponse (res, {
        statusCode: err.status,
        message: err.message,
    })
});


module.exports = app;