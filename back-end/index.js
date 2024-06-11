const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 8000;

app.use(bodyParser.json())

app.listen(port,()=>{
    console.log("api está rodando");
})

app.get("/hello-world",(req,res,next) =>{
    res.send({
        hello:"world"
    });
})

//userController
app.post("/user")