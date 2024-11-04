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


const create_tables = async()=>{
    conncet_database();
    const data = await client.query('CREATE TABLE  IF NOT EXISTS users( id INT PRIMARY KEY,name VARACHAR(50), email VARCHAR(255) NOT NULL')
    console.log('table created' , data)

}


const conncet_database = async()=>{
    try{
        await client.connect();
        console.log('client conneced')
    }
    catch(e){
        console.log(e)
    }
}


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

app.listen(3000, ()=>{
    console.log('App is listening at 3000')
})