
const express = require('express');
const server = express();
 const actionRoutes = require('../actions/actionRoutes'); 
const projectRoutes = require('../projects/projectRoutes');

//MIDDLEWARE DECLARATIONS
const cors = require('cors');


//MIDDLEWARE USE
server.use(cors());


server.use(express.json());

//ACTIONS
server.use('/actions', actionRoutes); 

//PROJECTS
server.use('/projects', projectRoutes);



module.exports = server;