'use strict';

import chalk from 'chalk';
import express from 'express';
import figlet from 'figlet';
import { name, description } from '../package.json';

// Begin Application
const app = express();

// Hello World Example Route
const router = express.Router();
router.get('/', (req, res) => res.send('Hello World!'));
app.use('/', router);

// Configure Server PORT
app.set('port', process.env.PORT || 3000);

// Start Server on requested PORT
app.listen(app.get('port'), function(){
  console.log(figlet.textSync(`Welcome to ${name}!`));
  console.log(chalk.blue(`${chalk.yellow(`>>>`)} Server is listening for requests on PORT ${app.get('port')}!`));
  console.log(chalk.blue(`${chalk.yellow(`>>>`)} Try navigating to 'localhost:3000' in your browser and see what happens...`));
});