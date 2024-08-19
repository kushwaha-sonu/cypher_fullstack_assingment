import jwt from "jsonwebtoken";

export const generateJwtToken = (user, req, res) => {
    try {
        if (!user) {
            return res.status(400).json({message: "No User Found"});
        }
        const token = jwt.sign(
            {_id: user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );
        return token;
    } catch (error) {
        console.error("Error generating token:", error.message);
        return res.status(500).json({message: "Error generating token"});
    }
};