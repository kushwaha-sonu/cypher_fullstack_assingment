import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        // console.log("Middleware Token:", token);

        if (!token) {
            return res.status(401).json({message: "Unauthorized access"});
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(403).json({message: "Session expired, please login again"});
                } else {
                    return res.status(403).json({message: "Please Login ", error: err.message});
                }
            }

            // console.log("User:", user);
            req.user = user;

            next();
        });
    } catch (error) {
        console.error("Unexpected error in token verification:", error);
        return res.status(500).json({message: "Internal server error", error: error.message});
    }
};