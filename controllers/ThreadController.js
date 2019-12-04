const msgModel = require('../models/mod_message.js');
const sessionModel = require('../models/session');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testcomp4711@gmail.com',
      pass: 'test4711'
    }
  });
  
  
exports.newThread = (req, res) => {
    sessionModel.getUser(req.sessionID)
        .then(([user_rows, metadata]) => {
            if (user_rows.length > 0) {
                if (user_rows[0].data == req.params.receiver_id) {
                    res.redirect('/home')
                } else {
                    msgModel.getPhoto(req.params.receiver_id).then(([rows, metadata]) => {
                        res.render('thread', {
                            receiver_id: req.params.receiver_id,
                            user_avatar_path: rows[0].user_avatar_path
                        });
                    })
                }
            }
            else {
                res.redirect('/login');
            }
        });
}

exports.createThread = (req, res) => {
    sessionModel.getUser(req.sessionID)
        .then(([rows, metadata]) => {
            if (rows.length > 0) {
                // const self_id = 1;
                const self_id = rows[0].data;
                let data = {
                    subject: req.body.subject,
                    message: req.body.message,
                    receiver_id: req.params.receiver_id,
                    sender_id: self_id
                }
                var mailOptions = {
                    from: 'testcomp4711@gmail.com',
                    to: 'harman_minhas@outlook.com',
                    subject: req.body.subject,
                    text: req.body.message
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
                
                msgModel.createMessage(data).then(([data, metadata]) => {
                    res.redirect(301, '/conversation/')
                });
            }
            else {
                res.redirect('/login');
            }
        });
}