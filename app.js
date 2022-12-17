//jshint esversion:6

const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const request = require("request");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){
    const FirstName = req.body.FName;
    const LastName = req.body.LName;
    const Email = req.body.Email;

    const data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                    FNAME: FirstName,
                    LNAME: LastName,

                }
            }
        ]
    };
    const jsonData=JSON.stringify(data); 

    const URL="https://us10.api.mailchimp.com/3.0/lists/640469482c";
    const options = {
        method: "POST",
        auth: "hetvi24:053c14512380e5a0a810ddf9de054795-us10"
    }
   
    const request = https.request(URL,options,function(response){
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data){

            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000."); 
})

//API key
//053c14512380e5a0a810ddf9de054795-us10

//list id
//640469482c