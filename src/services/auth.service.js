import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
class AuthService {
    static async register({ firstName, lastName, email, password }) {
        const findUser = await User.findOne({ email });
        if (findUser) {
            return {
                data: {
                    message: 'User already registered',
                    statusCode: 400,
                },
            };
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
            });
            const savedUser = await newUser.save();
            return {
                data: {
                    savedUser,
                    statusCode: 201,
                },
            };
        }
    }
}

export default AuthService;
