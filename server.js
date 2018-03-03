var express = require('express');
var morgan = require('morgan');
var path = require('path');
const Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyparser = require('body-parser');
var app = express();
app.use(morgan('combined'));
app.use(bodyparser.json());
var counter = 0;

var config={
     user: 'u1singlaaniket',
  host: 'db.imad.hasura-app.io',
  database: 'u1singlaaniket',
  password: process.env.DB_PASSWORD,
  port: 5432,
};

var pool = new Pool(config);


function createTemplate(data){
    var title= data.title;
    var heading= data.heading;
    var date= data.date;
    var content= data.content;

    var htmlTemplate=`
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name= "viewport" content="width=device-width, initial-scale=1">
            <link href="ui/style.css" rel="stylesheet">
        </head>
        <body>
            <div class="container">
                <div>
            <a href="/">Go to Home</a>
            </div>
            <hr/>
            <div>
                <h1>
                    ${heading}
                </h1>
                <br/>Date Edited: 14-02-2018<br/>

            </div>
            <div>
                ${content}
            </div>
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}
function hash(input,salt){
  var result = crypto.pbkdf2Sync(input,salt,1000,512,'sha512')

  return [salt,1000,result.toString('hex')].join('$');

}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
  var names= [];
app.get('/submtname',(req,res)=>{
  var name = req.query.name;

  names.push(name);
  res.send(JSON.stringify(names));
});
app.get('/counter',(req,res)=>{
  counter++;
  res.send(counter.toString());
});
app.get('/dbtest',(req,resp)=>{
  pool.query('SELECT * FROM users',(err,result)=>{
    if(err){
      resp.send(err.toString());
    }
    else{
      resp.send(JSON.stringify(result));
    }
  });
})
app.get('/app/:articlename',(req,res)=>{

    pool.query("SELECT * FROM articles WHERE title = '"+req.params.articlename+"'",(err,result)=>{//not using '' will generate errors
        if(err){
            res.send(err.toString());
        }
        else{
          if(result.rows===0){
        res.send('result not found');
      }else{
        res.send(createTemplate(result.rows[0]));
      }
    }
  });

});
app.get('/password/:val',(req,res)=>{
  var pass = req.params.val;
  var passhash = hash(pass,'this is random string');
  res.send(passhash);
});
app.post('/createuser',(req,res)=>{
var salt = randomBytes(56).toString('hex');
var username = req.body.username;
var password = req.body.password;
var dbString = hash(password,salt);
pool.query('INSERT INTO "user" VALUES ($1,$2)',[username,dbString],(err,result)=>{
    if(err){
            res.send(err.toString());
        }
        else{
          res.send('User created Successfully with username ' + username);
    }
});
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
