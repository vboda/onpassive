import express, { Router } from 'express';
import { employeeApi} from './api/employee/employeeApi';
import { checkForMandatoryParams } from './middleware';

const router: Router = express.Router();
router.get('/verify', employeeApi.verifyEmployee);
router.get('/getEmps', employeeApi.getEmployees);
router.post('/authenticate', checkForMandatoryParams, employeeApi.authentication);
router.post('/register', checkForMandatoryParams, employeeApi.register);
router.post('/sendMail',checkForMandatoryParams, employeeApi.sendEmail);

export {router};