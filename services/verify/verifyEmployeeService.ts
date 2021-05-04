import { jwtService } from '../jwt/jwt.service';
class VerifyEmployeeService{
    verify = async (req) => {
        try{
            const response = await jwtService.verifyToken(req.query.token);
            return response;
        } catch(e){
            console.log('Error Occured while verifing the token', e.stack);
            throw e;
        }
    }
}
export const verifyEmployeeService: VerifyEmployeeService = new VerifyEmployeeService();