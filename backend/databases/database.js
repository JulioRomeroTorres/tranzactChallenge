import mysql from 'mysql';

var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: 'root123',
        port:3306
    }
);


const getConnection = ()=>{
    const query = "use mydatabase;";
    connection.query(query,(err,result)=>{
        if(err){
            console.log("Error occurred", err);
            console.error(err)
        } 
        console.log('Use Database',result);
    });

    return connection;
}

export {getConnection}