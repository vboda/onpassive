import { employeeService } from '../../services/employee/employeeService';
import { authenticationService } from '../../services/authentication/authenticationService';
import { registrationService } from '../../services/registration/registrationService';
import { sendEmailService } from '../../services/sendEmail/sendEmailService';
import { verifyEmployeeService } from '../../services/verify/verifyEmployeeService';
class EmployeeApi {
  getEmployees = async (req, res) => {
    try {
      const response = await employeeService.getAllEmployees(req);
      res.status(200).send(response);
    } catch (e) {
      res.status(400).send("Error while fetching Employees");
    }
  };

  authentication = async (req, res) =>{
    try{
        const response = await authenticationService.authenticate(req);
        if(response.status === 200) {
          res.status(200).send(response);
        }else {
          res.status(400).send(response);
        }
    }catch(e){
      res.status(400).send("Error while doing login");
    }
  }

  register= async (req,res) => {
    try{
      const response = await registrationService.register(req);
      if(response.status === 400) {
        res.status(400).send(response);
      }else {
        res.status(200).send(response);
      }
    }catch(e){
      res.status(400).send("Error while registering the employee");
    }
  }

  sendEmail = async(req,res) => {
    try{
      const response = await sendEmailService.sendEmail(req);
      res.status(200).send(response);
    }catch(e){
      res.status(400).send('Error Occured while sending verification Link');
    }
  }
  verifyEmployee = async (req,res) => {
    try{
      const response = await verifyEmployeeService.verify(req);
      res.status(200).send('Email Verifies SuccessFully, set your new Password')
    }catch(e){
      res.status(400).send('Error Occured while verifying the account');
    }
  }
}


export const employeeApi: EmployeeApi = new EmployeeApi();