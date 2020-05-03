const nodemailer = require('nodemailer');
const config = require('./config')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email,
    pass: config.password
  }
});

function restorePassword(email, token, host) {
  const url = `${host}/restore/${token}`;
  const mailOptions = {
    from: 'nodejs',
    to: email,
    subject: 'Восстановление пароля',
    html: `
      <span>Для ввостановления пароля перейдите по </span><a href=${url}>ссылке</a> 
    `
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error)
    } else {
      console.log(info)
    }
  });
}

function confirmEmail(email, token, host) {
  const url = `${host}/confirm/${token}`;
  console.log(url, '////')
  const mailOptions = {
    from: 'nodejs',
    to: email,
    subject: 'Подтверждение почты',
    html: `
      <span>Для подтверждение почты перейдите по </span><a href=${url}>ссылке</a> 
    `
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error)
    } else {
      console.log(info)
    }
  });
}

function sendText(email, text, title) {
  const mailOptions = {
    from: 'nodejs',
    to: email,
    subject: title,
    text: text
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error)
    } else {
      console.log(info)
    }
  });
}

module.exports = {restorePassword, confirmEmail, sendText};
