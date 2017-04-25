'use strict';
import chalk from 'chalk';
import uuid from 'uuid/v4';
import ses from 'node-ses';
import models from '../db/models';
import config from '../../config';

const client = ses.createClient({ key: config.aws.id, secret: config.aws.secret });

const verifyEmail = async (email) => {
  const user = await models.User.findOne({ where: { email: email }}).catch(err => err);

  if (!user.errors) {
    // Use the Users existing Metadata as a template, or set it to a blank object if it is null.
    const metadata = user.metadata || {};
    metadata.verifyEmail = { token: uuid(), expires: new Date(new Date().getTime() + 1800000).getTime() };

    // Update the user with the new verifyEmail data.
    const updated = await user.updateAttributes({ metadata: metadata });
    if (!updated.errors) {
      // Send Validation email to User.
      client.sendEmail({
        to: user.email,
        from: config.application.email,
        subject: `${config.application.name} - Verify Email Address`,
        message: `Welcome to ${config.application.name}. Please click on the link below to verify your email address.
          <br>http://${config.application.domain}/validate/${metadata.verifyEmail.token}`,
      }, (err, data, res) => {
        if (err) console.log(chalk.red(`${chalk.yellow(`>>>`)} There was an error sending the verification email.\n`), JSON.stringify(err, null, 2));
        console.log(chalk.green(`${chalk.yellow(`>>>`)}`, JSON.stringify(data, null, 2)));
        console.log(chalk.green(`${chalk.yellow(`>>>`)}`, JSON.stringify(res, null, 2)));
      });
    } else {
    console.log(chalk.red(`${chalk.yellow(`>>>`)} There was an error sending the verification email.\n`), JSON.stringify(user.errors, null, 2));
  }
  } else {
    console.log(chalk.red(`${chalk.yellow(`>>>`)} There was an error sending the verification email.\n`), JSON.stringify(user.errors, null, 2));
  }
};

const forgotPassword = (email) => {

};

export default { verifyEmail, forgotPassword };
