const express = require('express')
require('dotenv').config()
const app = express()
 

app.listen(process.env.PORT,(req: any,res: any)=>{
    console.log("Hello World")
})
