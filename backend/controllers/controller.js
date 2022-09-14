import { query } from 'express';
import {getConnection} from '../databases/database.js';


const mounthsYear = [
    'January', 'Febraury','March','April',
    'May','June', 'July','August',
    'September','October','November','December'
];

const getAllPlans = (req,res)=>{
    
    const mysqlConnection = getConnection();
    const query = 'select *  from packages;';
    
    mysqlConnection.query(query,(err,result) =>{
        if(err){
            console.log('Raaaa');
            console.error(err);
        }
        console.log('result',result)
        res.json(result);
        //res.json({info:'presen test'});
    });

}

const getPlan = (req,res)=>{

    const {plan, age, state, datebirth} = req.query;
   
    const mysqlConnection = getConnection();
    const query = `select carrier, premium from packages WHERE plan like '%${plan}%' AND \
                             state = '${state}' AND \
                             mounth = '${mounthsYear[parseInt(datebirth)-1]}' AND \
                             maxRange >= ${parseInt(age)} AND minRange <= ${parseInt(age)};`;
    
    console.log('My Query', query);

    const queryAll = 'SELECT * FROM packages';

    mysqlConnection.query(query,(err,result) =>{
        if(err){
            console.log('Raaaa');
            console.error(err);
        }
        console.log('result',result)
        res.json(result);
    });

}

export const methods= {
    getAllPlans,
    getPlan
};