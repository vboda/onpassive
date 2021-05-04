export const contants = {
    MYSQL_DB_CONFIGURATION:{
        connectionLimit : 10,
        host            : 'localhost',
        user            : 'root',
        password        : 'password',
        database        : 'onpassive'
    },
    AES_SECRET: 'Do not try to steal the secret',
}
export const  MANDATORY_PARAMS ={
    authenticate: ['email', 'password'],
    register: ['name', 'email', 'password', 'title', 'department', 'location', 'salary', 'age'],
    sendMail: ['email']
}