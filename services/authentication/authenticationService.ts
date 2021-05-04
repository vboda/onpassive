import {sqlClient} from '../client';
import { jwtService } from '../jwt/jwt.service';
import { cryptoService } from '../crypto/cryptoService';
class AuthenticationService {
  authenticate = async (req) => {
    try {
      const email = req.body.email;
      const query = `select password from employee where email=?`;
      const result = await sqlClient.executeQuery(query, [email]);
      if (cryptoService.decrypt(result[0].password) === req.body.password) {
        // populate session
        const tokenBody = {
          email,
          expiresIn:Math.round(new Date().setMinutes(new Date().getMinutes() + 5)/1000),
        };
        const session = await jwtService.generateToken(tokenBody);
        return {
          status: 200,
          session,
        };
      } else {
        return {
          status: 400,
          error: "invalid password",
        };
      }
    } catch (e) {
      throw e;
    }
  };
}

export const authenticationService: AuthenticationService = new AuthenticationService();