'use strict';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.OAUTH_CLIENT_USER,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  },
});

function sendEmail(email, name, taskName, desc, dueDate) {
  // setup email data with unicode symbols
  let mailOptions = {
      from: `"Todo Fancy!" <${process.env.OAUTH_CLIENT_USER}>`, // sender address
      to: email, // list of receivers
      subject: `${name}, You've Just Added a Task!`,
      text: `Hi ${name}! You've just added a task with these details:
      Name: ${taskName}
      Description: ${desc}
      Due Date: ${dueDate}
      Thank you for using Todo Fancy!
      `, // plain text body
      html: `Hi <b>${name}</b>!<br><br>
      You've just added a task with these details:<br><br>
      Name: ${taskName}<br>
      Description: ${desc}<br>
      Due Date: ${dueDate}<br><br><br>
      Thank you for using <b>Todo Fancy!</b>
      ` // html body
  };

  // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
  }

module.exports= sendEmail;