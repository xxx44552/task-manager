const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'webinme.ru@gmail.com',
    pass: '1234567vV'
  }
});

function restorePassword(email, token) {
  const url = `http://localhost:5000/restore/${token}`;
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

function confirmEmail(email, token) {
  const url = `http://localhost:5000/confirm/${token}`;
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
