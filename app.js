const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "suscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us9.api.mailchimp.com/3.0/lists/b0b686fd83";
  const options = {
    method: "POST",
    auth: "miraclezito:1382bb185742d74974d0ece586d1ab64-us9"
  }

  const request = https.request(url, options, funtion(response) {

    if (response.statusCode === 200) {
      res.send("successfully suscribed");
    } else {
      res.send("there was an error with signing up, please try again");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});


app.listen(3000, function() {
  console.log("server is running on port 3000");
});

// apikey
// 1382bb185742d74974d0ece586d1ab64-us9

// audience id or list id
// b0b686fd83
