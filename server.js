var express = require('express');
var app = express();
var mustache = require('mustache-express');

app.engine('html',mustache());
app.set('view engine', 'html');
app.set('views', __dirname+'/views');
app.use("/public", express.static(__dirname+'/public'));

var port = 8080;

app.get('/',function(req,res)
{
  res.render("index");
});

app.listen(port, function()
{
  console.log('Server running on port: '+port);
})
