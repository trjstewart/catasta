'use strict';
import chalk from 'chalk';
import ses from 'node-ses';

const client = ses.createClient({ key: process.env.AWS_ID, secret: process.env.AWS_SECRET });

const verifyEmail = (id) => {
  client.sendEmail({
    to: 'trjstewart@gmail.com',
    from: 'demo@binaryorange.co',
    subject: 'Sports Connection - Verify Email Address',
    message: `Welcome to Sports Connection. Please click on the link below to verify your email address.<br>http://google.com`,
  }, (err) => {
    if (err) console.log(chalk.red(`${chalk.yellow(`>>>`)} There was an error sending the verification email.\n`), JSON.stringify(err, null, 2));
  });
};

const forgotPassword = (email) => {

};

export default { verifyEmail, forgotPassword };
