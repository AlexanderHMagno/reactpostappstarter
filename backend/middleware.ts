import { NextFunction , Request, Response} from "express";
import {IDecodedUser, parseToken} from "./fakedb";
import jwt from "jsonwebtoken";


export const protectRoute = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
      const token = parseToken(authHeader, res);
      const decodedUser = jwt.verify(token, "secret");
      
      if(Date.now() >= (decodedUser as IDecodedUser).exp * 1000){
        res.status(403).json({success:false});
      } else {
        next();
      }
  }