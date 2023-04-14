import jwt from 'jsonwebtoken';
export const generatedAccessToken = (user) => {
    return jwt.sign(
        { userId: user?._id, isAdmin: user.isAdmin },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '5h',
        },
    );
};
export const generatedRefreshToken = (user) => {
    return jwt.sign(
        { userId: user?._id, isAdmin: user.isAdmin },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '2d',
        },
    );
};
