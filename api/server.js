
const express = require('express');
const server = express();
const actionRoutes = require('../actions/actionRoutes');
const projectRoutes = require('../projects/projectRoutes');

//MIDDLEWARE DECLARATIONS
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

//MIDDLEWARE USE
server.use(cors());
server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

//USERS
server.use('/actions', actionRoutes);

//POSTS
server.use('/projects', projectRoutes);



module.exports = server;