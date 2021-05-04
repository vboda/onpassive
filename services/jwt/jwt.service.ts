import { sign, SignOptions, verify } from 'jsonwebtoken';
class JwtService{
    loginSecretKey = 'hhQqDlk/Hp+8d...'

    jwtOptions: SignOptions = {
        algorithm: 'HS256'
    }
    generateToken(req){
        return new Promise((resolve, reject) => {
            sign(req, this.loginSecretKey, this.jwtOptions, ((error ,token) => {
                if(error) reject(error)
                else resolve(token)
            }))
        })
    }

    verifyToken(token){
        return new Promise((resolve, reject) => {
            verify(token, this.loginSecretKey, (error, response) => {
                if(error) reject(error);
                else resolve(response);
            })
        })
    }
}

export const jwtService: JwtService = new JwtService(); 