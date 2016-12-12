import * as chai from 'chai';
import app from '../index';

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('[Auth module]', function () {

    it('Should get token and success check token', function (done) {
        chai.request(app)
            .post('/auth/get')
            .send({password: '123456', email: 'giang.nguyen.dev@gmail.com'})
            .end(function (err, resGetToken) {

                chai.expect(resGetToken.body).to.have.property('token');

                chai.request(app)
                    .post('/dev/check')
                    .set('Authorization', 'Bearer ' + resGetToken.body.token)
                    .end(function (err, res) {
                        chai.expect(res).to.have.status(200);
                        done();
                    });
            });
    });

    it('Should return 401 if credential is invalid', function (done) {
        chai.request(app)
            .post('/auth/get')
            .send({password: 'abc', email: 'bcdes'})
            .end(function (err, res) {
                chai.expect(res).to.have.status(401);
                done();
            });
    });

});



