const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
const port = 3000;


app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");

})
app.post("/",function(req,res){

  const query = req.body.cityName;
  const apiKey = "d870041d6e913ddcd0270a54377c0b90";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";


  https.get(url , function(response){
    console.log(response.statusCode);

    response.on("data" , function(data){
      const weatherData = JSON.parse(data);
      const temp1 = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = " http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>The weather is currently "+weatherDescription+" </p>");
      res.write("<h3>the temprature in "+query+" is "+ temp1 +" degree celcius</h3>");
      res.write("<img src = " + imageURL +">");
      res.send();
    })
  })
  

})



app.listen(port , function(){
  console.log("Server is listening on port "+ port);
})
