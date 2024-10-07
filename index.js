const express = require('express');
var fs = require('fs');
const app = express();
const router = express.Router();

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  fs.readfile('home.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
    fs.readfile('user.json', 'utf8', (err, data) => {
        res.end(data);
      });
});

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.post('/login', (req,res) => {
    fs.readFile('user.json', 'utf8', (err, data) => {
             const username=req.query.N;
             const jsonData = JSON.parse(data);
             if(jsonData.username==username && jsonData.password==password){res.send(`{
        status: true,
        message: "User Is valid"
    }`);}
             else{res.send(`This Name: ${username} is not Exist`);}
    });
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req,res) => {
  res.send('This is logout router');
});

/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.use((err,req,res,next) => {
  res.send('This is error router');
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));