'use strict';

// Import Included
import fs from 'fs';
import path from 'path';

// Import Externals
import bodyParser from'body-parser';
import chalk from 'chalk';
import dotenv from 'dotenv';
import flash from 'connect-flash';
import cookieParser  from'cookie-parser';
import express from 'express';
import expressValidator from 'express-validator';
import session from 'express-session';
import favicon from 'favicon';
import figlet from 'figlet';
import logger from 'morgan';
import passport from 'passport';

// Import Locals
import { name } from '../package.json';
import models from './lib/db/models';
models.sequelize.sync({ force: false });

// Begin Application
const app = express();

// Application View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Application Middlewares
// app.use(favicon(path.join(__dirname, 'public', 'img/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'super-secret-string', saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(expressValidator({
	errorFormatter: (param, msg, value) => {
		var namespace = param.split('.'), root = namespace.shift(), formParam = root;
		while(namespace.length) formParam += '[' + namespace.shift() + ']';
		return { param : formParam, msg   : msg, value : value };
	}
}));
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Application Routes
const routePath = path.join(__dirname, '/routes');
fs.readdirSync(routePath).forEach((file) => {
  const route = path.join(routePath, file);
  require(route)(app);
});

// Configure Server PORT
app.set('port', process.env.PORT || 3000);

// Start Server on requested PORT
app.listen(app.get('port'), function(){
  console.log(figlet.textSync(`Welcome to ${name}!`));
  console.log(chalk.blue(`${chalk.yellow(`>>>`)} Server is listening for requests on PORT ${app.get('port')}!`));
  console.log(chalk.blue(`${chalk.yellow(`>>>`)} Try navigating to 'localhost:3000' in your browser and see what happens...`));
});
