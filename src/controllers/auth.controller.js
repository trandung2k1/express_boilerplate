import AuthService from '../services/auth.service.js';
import User from '../models/user.model.js';
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
    static async getUsers(req, res) {
        return res.status(200).json(await User.find());
    }
}

export default AuthController;
