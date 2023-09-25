const express = require('express');

//init app
const PORT = 4000;
const app = express();

app.get('/', (req, res) => res.send('<h1>Hello World</h1>'));
app.listen(PORT, ()=> console.log(`app is un and running on port : ${PORT}`));