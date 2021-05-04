import {jwtService} from '../jwt/jwt.service';
import { mailService } from '../mail/mailService';
class SendEmailService{
    sendEmail = async (req) => {
        try{
            const tokenBody = {
                email: req.body.email,
                expiresIn:Math.round(new Date().setMinutes(new Date().getMinutes() + 5)/1000),
              };
            const token = await jwtService.generateToken(tokenBody);
            const url = `http://localhost:8000/verify?token=${token}`;
            const result =  await mailService.sendEmail(req, url);
            if(result.status === 200){
                return result;
            }else {
                throw result;
            }
        }catch(e){
            console.log('Error Occured While sending Email', e.stack);
            throw e;
        }
    }
}

export const sendEmailService: SendEmailService = new SendEmailService();