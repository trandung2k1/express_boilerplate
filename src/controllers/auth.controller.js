const AuthService = require('../services/auth.service');
class AuthController {
    static async register(req, res) {
        const { firstName, lastName, email, password } = req.body;
        const result = await AuthService.register({
            firstName,
            lastName,
            email,
            password,
        });
        if (result?.error) {
            return res.status(500).json(result);
        }
        return res.status(result?.data?.statusCode).json(result.data);
    }
}

module.exports = AuthController;
