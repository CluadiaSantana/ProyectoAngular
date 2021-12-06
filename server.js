const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const path = require ('path');


app.use(express.static(path.join(__dirname,'dist','ProyectoAngular')));

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'dist','ProyectoAngular','index.html'));
});

app.listen(port, () => {
    console.log('app is listening in port'+ port);
});