import {MANDATORY_PARAMS} from './constants/constants';
export const checkForMandatoryParams = (req,res,next) => {
    try{
        if(req.url === '/authenticate'){
            const params = checkForParams(req.body, MANDATORY_PARAMS.authenticate);
            if(params.length > 0){
                throw {
                    status: 400,
                    msg: `request is missing mandatory params --> ${params.join(' ')}`
                }
            }else {
                next();
            }
        }else if(req.url === '/register'){
            const params = checkForParams(req.body, MANDATORY_PARAMS.register);
            if(params.length > 0){
                throw {
                    status: 400,
                    msg: `request is missing mandatory params ${params.join(' ')}`
                }
            }else {
                next();
            }
        }else if(req.url === '/sendEmail'){
            const params = checkForParams(req.body, MANDATORY_PARAMS.sendMail);
            if(params.length > 0){
                throw {
                    status: 400,
                    msg: `request is missing mandatory params ${params.join(' ')}`
                }
            }else {
                next();
            }
        }else{
            next();
        }
    }catch(e){
        res.status(400).send(e);
    }
    
}

const checkForParams = (reqBody, mandatoryParams) => {
    return mandatoryParams.filter((param) => {
        return !(param in reqBody)
    })
}