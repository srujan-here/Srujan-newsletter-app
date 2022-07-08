const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const https=require('https');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html")
});

app.post("/data", (req, res) => {
const fname=req.body.fname;
const sname=req.body.sname;
const ename=req.body.ename;
// console.log(fname);
// console.log(sname);
// console.log(ename);

const data={
    members:[
        { 
            email_address:ename,
            status:"subscribed",
            merge_fields:{
                FNAME:fname,
                LNAME:sname
            }

        }
    ]
}

const jsondata=JSON.stringify(data);
const url="https://us13.api.mailchimp.com/3.0/lists/e30617cefd";
const options={
    method:"POST",
    auth:"srujan:23d7ed66cc8cddf3527b90f097d7cf5c-us13"
}
const request=https.request(url,options,(resp)=>{

    if(resp.statusCode==200){
        res.sendFile(__dirname+'/success.html');
    }
    else{
        res.sendFile(__dirname+'/failure.html');
    }
resp.on("data",(data)=>{
    console.log(JSON.parse(data));
})
})


request.write(jsondata);
request.end();
});

app.post('/failure',(req,res)=>{
    res.redirect('/')
})

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on 3000");
});


// end point
// https://<dc>.api.mailchimp.com/3.0/

// Api key 
// 23d7ed66cc8cddf3527b90f097d7cf5c-us13

// Audien id
// e30617cefd