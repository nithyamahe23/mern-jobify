import { BadRequestError, UnAuthenticatedError, UnAuthorizedError } from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async(req, res, next) => {
    
    //Check whether token is present in cookies
    const { token} = req.cookies;
    //console.log(token);
    if(!token){
        throw new UnAuthenticatedError('authentication error');
    }

   //If token is present, get the user id and value.
   try{
    //const user = verifyJWT(token);
    const {userId, role} = verifyJWT(token);
    console.log(userId, role);
    //check whether test user
    const testUser = userId === '68116c413b937d305fc0c2c9';

    req.user = {userId, role, testUser};
    //console.log(next());
    next();
   }catch(error){
    throw new UnAuthenticatedError('authentication error');
   }
    
}

//To ensure admins only access the app-stats
export const authorizePermissions = (...roles) => {     //roles- the paramter aray we pass
    return (req, res, next ) => {       //returned by express
        console.log(roles);
        if(!roles.includes(req.user.role)){
            throw new UnAuthorizedError('Only Admins have Access');
        }
        next();
    
    }
    
}

//check for test user
export const checkForTestUser = (req, res, next) => {
    if(req.user.testUser){
        throw new BadRequestError('Demo User! Read only!');
    }
    next();
}