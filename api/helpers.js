import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json("Please log in");
    }

    try {
        const decoded = jwt.verify(token, 'secretKey');
        console.log(decoded)
        // Attach the decoded user information to the request for further processing
        req.user = decoded 
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json("Invalid token");
    }
};
