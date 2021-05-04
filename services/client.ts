import {contants} from '../constants/constants';
import mysql from 'mysql';
import util from 'util';
class SQLClient{
    pool: any;
    query: any;
    createPool(){
       try{
            const dbConfig = contants.MYSQL_DB_CONFIGURATION;
            this.pool = mysql.createPool(dbConfig);
            this.pool.query = util.promisify(this.pool.query);
       }catch(e){
            console.log('Error creating pool connection', e.stack);
            throw `Error while creating the pool connection`
       }
    }
    
    public async executeQuery(query: string, params?:any) {
        try{
            if(this.pool && !!this.pool.query){
                let result;
                if(!!params && params.length <= 0){
                    result = await this.pool.query(query);
                }else {
                     result = await this.pool.query(query, params);
                }
                return result;
            }else{
                this.createPool();
                return await this.executeQuery(query, params);
            }
        }catch(e){
            console.log('Error while executing query');
            throw e;
        }
    }
}
export const sqlClient: SQLClient = new SQLClient();