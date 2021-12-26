
const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();

// TO USE STATIC FILES(LOCAL FILES)
app.use(express.static("public"));

// TO PARSE DATA INPUT BY USER
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstName=req.body.fname;
  const lastName=req.body.lname;
  const email=req.body.email;

  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  }

  var jsonData=JSON.stringify(data);

  const url="https://us5.api.mailchimp.com/3.0/lists/8c19c65b55";

  const options={
    method:"POST",
    auth:"Lalit:650b0d016fa560f591ef604be3b534f8-us5"
  }
  const request=https.request(url,options,function(response){
    if(response.statusCode==200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    // response.on("data",function(data){
    //   console.log(JSON.parse(data));
    // })
  })

  request.write(jsonData);
  request.end();
})

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(req,res){
  console.log("server is running on port 3000");
});

// API 650b0d016fa560f591ef604be3b534f8-us5
// List id 8c19c65b55
