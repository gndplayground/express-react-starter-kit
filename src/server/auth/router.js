import express from 'express';
import User from './model';
import jwt from 'jsonwebtoken';
import ENV from '../config';
import cors from '../middlewares/cors';
import _pick from 'lodash/pick';

let router = express.Router();

router.post('/get', cors);

// Get token route. Need submit email and password
router.post('/get', function (req, res) {

    let fields = req.fields;

    User.findOne({email: fields.email}).exec().then(function (user) {

        if (!user) {
            res.status(401);
            res.send('Unauthorized')
        }
        else {
            user.checkPassword(fields.password, function (err, match) {

                if (err) {
                    throw err;
                }
                else {

                    if (match) {
                        let token = jwt.sign({user: user}, ENV.JWT_SECRET, {expiresIn: ENV.JWT_EXPIRE});
                        res.json({
                            data: _pick(user, 'email'),
                            token: token,
                        })
                    }
                    else {
                        res.status(401);
                        res.send('Unauthorized')
                    }
                }
            });

        }

    }).catch(function (e) {
        res.status(500);
        res.send('Error' + e);
    });

});

export default router;