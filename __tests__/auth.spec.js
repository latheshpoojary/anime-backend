const { authRegister } = require('../controller/auth');
const user = require('../database/schemas/User');

jest.mock('../database/schemas/User')

const request = {
	body: {
		email: 'fake_email',
		password:'fake_password'
	}
}

const response = {
	status: jest.fn((x) => x),
	send: jest.fn((x) => x)
};
it('should send the status code 400 when the user not exist', () => {
	// user.findOne().mockImplementationOnce(() => ({
	// 	id: 1,
	// 	email: 'email',
	// 	password:'password'
	// }))
	user.findOne.mockReturnValueOnce(() => ({
		id: 1,
		email: 'email',
		password:'password'
	}));
	authRegister(request,response);
	expect(response.status).toHaveBeenCalledWith(400);
	expect(response.send).toHaveBeenCalledTimes(1);
	user.findOne.mockClear();
})