import { cryptoService } from '../crypto/cryptoService';
import { sqlClient } from '../client';
class RegistrationService {
  register = async (req) => {
    try {
        const name = req.body && req.body.name;
        const firstNameIndex = name.indexOf(' ');
        let firstName, lastName = null;
        if(firstNameIndex === -1 ){
            firstName = name;
        }else {
            firstName = name.slice(0, firstNameIndex);
            lastName = name.slice(firstNameIndex+1);
        }
        const email = req.body && req.body.email;
        const password =
            req.body &&
            req.body.password &&
            cryptoService.encrypt(req.body.password);
        const title = req.body && req.body.title;
        const dept = req.body && req.body.department;
        const loc = req.body && req.body.location;
        const sal = req.body && req.body.salary;
        const age = req.body && req.body.age;

        const query = `insert into employee(firstname, lastname, jobtitle, department, location, Age, salary, email, password) values 
                                                (?,?,?,?,?,?,?,?,?)`;
        const result = await sqlClient.executeQuery(query, [
            firstName,
            lastName,
            title,
            dept,
            loc,
            age,
            sal,
            email,
            password,
        ]);
        if(result.affectedRows = 1){
            return {
                status: 200,
                msg: 'User SuccessFully Registered'
            }
        }else {
            throw result
        }
    } catch (e) {
        console.log('Error occured while inserting record', e.stack);
        if(e.code = 'ER_DUP_ENTRY'){
            return {
                status: 400,
                msg: 'Email is already registered'
            }
        }
        throw e;
    }
  };
}

export const registrationService: RegistrationService = new RegistrationService();