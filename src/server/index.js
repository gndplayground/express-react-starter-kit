import express from 'express';
import jwtMiddleware from 'express-jwt';
import './db';
// We use formidable rather than body-parser because Form-data HTML5 is super easy to use, and formidable support file upload
import formidable from "express-formidable";
import {Model as User, Router as authRouter} from './auth';
import ENV from './config';
// If the route accept allow cross site request for this routes mode. Add cors middleware to allow cross site request for that route
import cors from './middlewares/cors';

const app = express();

app.use((req, res, next) => {
    // Allow Preflighted requests when client send from different domain
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Preflighted_requests
    if ('OPTIONS' === req.method) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
        res.sendStatus(200);
    }
    else {
        next();
    }
});

app.use(formidable());

if (app.get('env') === 'development') {
    app.locals.pretty = true;
}

app.use('/static', express.static('public'));

app.use('/auth', authRouter);

// @todo We should remove route dev when run production.
app.get('/dev/setup', function (req, res) {

    // Add a user for testing. If the user has been added, app will send error
    let user = new User({
        'email': 'giang.nguyen.dev@gmail.com',
        'password': '123456'
    });

    user.save()
        .then(function (e) {
            res.send('ok');
        })
        .catch(function (e) {
            res.send('Error' + e);
        });

});


app.post('/dev/check',
    // Allow cross site request for this route
    cors,
    // Checking token generate by route auth/get.
    // Need to set token in header
    // Example :  Authorization : Bearer eyJhbGciOiJIUzI1N...
    // If no token provided on header or token is invalid. express-jwt middleware will return status code 401 Unauthorized
    jwtMiddleware({secret: ENV.JWT_SECRET}),
    function (req, res) {
        res.json(req.user);
    });


// Server start
const http = require('http').Server(app);

http.listen(ENV.SERVER_PORT, () => {
    console.log('App running in port ' + ENV.SERVER_PORT);
});

export default app;