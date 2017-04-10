
// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

var port = 8080
// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, 'src/Client/build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src/Client/build', 'index.html'));
});

app.listen(port, function()
{
  console.log('Server running on port: '+port);
})
