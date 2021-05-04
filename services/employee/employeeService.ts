import {sqlClient} from '../client';
class EmployeeService{
    public async getAllEmployees(req) {
        try{
            const query = `select * from onpassive.employee`;
            const employees = await sqlClient.executeQuery(query);
            const filteredData = employees.map((emp) => {
                const {password, ...data} = emp
                return data;
            })
            return this.filterRecords(req, filteredData);
        }catch(e){
            console.log(`Error Occured while fetching employees`, e);
            throw {status: 400}
        }
    }
    private filterRecords(req, records){
        const page: number = parseInt(req.query.page);
        const limit: number = parseInt(req.query.limit);
        const startIndex: number = (page-1) * limit;
        const endIndex: number = (page * limit);
        const nextPage = endIndex >= records.length ? null : page + 1;
        const recordsOnNextPage = (records.length - endIndex) < limit ? (records.length - endIndex) < 0 ? 0 : (records.length - endIndex) : limit;
        
        const sortedRes = records.slice(startIndex, endIndex);
        return {
            next:{
                page: nextPage,
                limit: Math.floor(recordsOnNextPage)
            },
            results: sortedRes
        }
    }
}

export const employeeService: EmployeeService = new EmployeeService();