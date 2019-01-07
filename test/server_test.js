 process.env.NODE_ENV = 'test';

 let chai = require('chai');
 let chaiHttp = require('chai-http');
 let server = require('../server');
 let mongoose = require('mongoose');

 let should = chai.should();
 chai.use(chaiHttp);

describe('Quiz', () => {
	
	it('dumbe test', (done) => {
		let x = 2;
		//x.should.be.eql(1);
		let user = {
			email: "admin@quizbizz.com",
			password: "adminadmin"
		}
		chai.request(server)
			.post('/users/login')
			.send(user)
			.end((err, res) => {
				res.should.have.status(200);
				res.should.have.header('x-auth');
				done();
			})
	});
});
