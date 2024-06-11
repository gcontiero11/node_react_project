const express = require('express');
const app = express();
const port = 8000;

app.listen(port,()=>{
    console.log("api está rodando");
})

app.get("/hello-world",(req,res,next) =>{
    res.send({
        hello:"world"
    });
})