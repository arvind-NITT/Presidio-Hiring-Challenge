import jwt from "jsonwebtoken"


export const verifySeller = async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: 'Authorization denied. No token provided.' });
          }

          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          //console.log(decoded);
          if(decoded.role !== "seller"){
            return res.status(401).json({ message: 'Authorization denied. No token provided.' });
          }
         
          req.user = decoded;
          next();


    } catch (error) {
        console.log("error in seeller auth",error);
        res.status(401).json({ message: 'Token is not valid.' });
    }
}
