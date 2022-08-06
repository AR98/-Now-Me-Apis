import jwt from 'jsonwebtoken';

export const createToken = (user) => {
    const token=jwt.sign({id: user._id, email: user.email, isAdmin: user.isAdmin},
        process.env.SECRET_KEY, 
        {expiresIn: "3h"}
        )
    return token;    
}

export const verifyAuth = (req, res, next) => {
    try {
       if(!req.headers.authorization)  res.status(401).json({ message: error });
       const token = req.headers.authorization;
       if(token){
        jwt.verify(token, process.env.SECRET_KEY, (error, user) =>{
            if(error) res.status(401).json({ message: error });
            req.user = user;
            next();
        });
       }
       
      } catch (error) {
        //   console.log(error);
        res.status(401).json({ message: error });
      }
}
