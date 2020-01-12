import express from 'express';

const app = express();

app.get("/", function(req, res){
    res.send("Welcome to the app ❤.");
})

app.post("/signin", function(req, res){
    res.send("signin route");
})
app.listen(4001, () =>{
    console.log("Server Running.");
    
})