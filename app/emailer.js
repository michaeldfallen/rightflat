var nodemailer = require('nodemailer');

var credentials = require('./../credentials.js');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: credentials.user,
    pass: credentials.pass
  }
});

var mailOptions = function (subject, html) {
  return {
    from: 'Rightflat Scraper <rightflat@michaelallen.io>',
    to: 'Michael <michaeldfallen@gmail.com>',
    subject: subject,
    html: html
  };
};

var Emailer = module.exports = {
  send: function (subject, html) {
    var email = mailOptions(subject, html);
    transporter.sendMail(email, function (err, info) {
      if (err) console.log(err);
      else console.log('Message sent: ' + subject);
    });
  }
};
