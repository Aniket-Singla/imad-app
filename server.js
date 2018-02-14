var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var infoone ={
    title:"Description",
    heading:"Description of My webapp",
    date:14-02-2017,
    content:`<p>
                Hello friends welcome to my webapp. This page is made to describe my webapp. This is the first webapp I made using Hasaura's Console.
            </p>
            <p>
                These are the very good lectures given by Tanmai sir. These lectures provide very good introduction to the web-applications.
            </p>`
};
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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/description',(req,res)=>{
    res.send(createTemplate(infoone));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
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
