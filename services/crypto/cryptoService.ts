import {AES, enc} from 'crypto-js';
import {contants} from '../../constants/constants';
class CryptoService{
    decrypt(decryptText){
        return AES.decrypt(decryptText, contants.AES_SECRET).toString(enc.Utf8);
    }

    encrypt(text){
        return AES.encrypt(text,contants.AES_SECRET).toString();
    } 
}

export const cryptoService: CryptoService = new CryptoService();