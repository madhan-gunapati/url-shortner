const express = require('express')
const app = express()
require('dotenv').config();

const {Client} = require('pg');

const client = new Client({
    database:'url_shortner',
    username:process.env.DATABASE_USERNAME,
    password:process.env.DATABASE_PASSWORD,
    port:5432,
    host:'localhost'
})

const conncet_database = async()=>{
    try{
        await client.connect();
        console.log('client conneced')
    }
    catch(e){
        console.log(e)
    }
}


const create_tables = async()=>{
    conncet_database();
    try{
    const data = await client.query('CREATE TABLE  IF NOT EXISTS users( id INT PRIMARY KEY,name VARCHAR(50), email VARCHAR(255) NOT NULL)')
    console.log('users table created' , data.rows)
    }
    catch(e){
        console.log('error in the table 1 creation', e)
    }

    try{
    const data2 = await client.query('CREATE TABLE IF NOT EXISTS links (id INT PRIMARY KEY, original_link VARCHAR(255) , short_link VARCHAR(255) )');
    console.log('links table created', data2.rows)
    }
    catch(e){
        console.log('error in table2 creation')
    }


}

// create_tables();




const disconnect_database = ()=>{
    client.end();
    console.log('database disconnected');
}

app.get('/users', (req, res)=>{
    data_getter();
    res.send('data Fetching')
})

const data_getter = async ()=>{
    conncet_database();
    const qwery = `SELECT table_name  FROM information_schema.tables WHERE table_schema='public';`;
    try{
    const data = await  client.query(qwery);
    console.log(data.rows)
    disconnect_database();
    }
    catch(e){
        console.log(e)
    }

}

// data_getter();

app.listen(3000, ()=>{
    console.log('App is listening at 3000')
})