import {createTransport} from 'nodemailer';
import { readFile } from 'fs';
import { text } from 'express';
class MailService{
    transport
    sendEmail(req, verificationLink){
        if(this.transport){
            const message = {
                from: 'admin@passive.com', // Sender address
                to: req.body && req.body.email,         // List of recipients
                subject: 'Verify Your Account', // Subject line
                html: `<div>
                    <div>Hello ${req.body.email.split('@')[0]},</div>
                    <div>
                    <p>Please click on the following Link to verify your account</p>
                    <div> <a href="${verificationLink}" target="_blank">${verificationLink}</a></div>
                    </div>
                </div>`
            };
            return new Promise((resolve,reject) => {
                this.transport.sendMail(message, function(err, info) {
                    if (err) {
                      reject(err);
                    } else {
                      resolve({status:200, msg: 'Email Sent SuccessFully'});
                    }
                });
            })
            
        }else{
            this.getTransport();
            return this.sendEmail(req, verificationLink);
        }

    }

    getTransport(){
        this.transport = createTransport({
            service: 'gmail',
            secure: false,
            auth:{
                user: 'vinaynodemailer@gmail.com',
                pass: 'Te5t@12345'
            },
            tls:{
                rejectUnauthorized: false
            }
        })
    }

}

export const mailService: MailService = new MailService();