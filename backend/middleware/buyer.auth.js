import jwt from "jsonwebtoken"


export const verifyBuyer = async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: 'Authorization denied. No token provided.' });
          }

          const decoded = jwt.verify(token, process.env.JWT_SECRET);

         
          req.user = decoded;
          next();


    } catch (error) {
        console.log("error in buyer auth");
        res.status(401).json({ message: 'Token is not valid.' });
    }
}