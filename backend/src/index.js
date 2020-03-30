const express = require('express');
const routes = require('./routes');
const cors = require('cors');


const app = express();
app.use(cors()); //Segurança, apenas inicialmente em desenvolvimento, deixaremos qualquer aplicação acessar nossa API.
app.use(express.json());
app.use(routes);

//Ultima linha do codigo.
app.listen(3333);