const msgModel = require('../models/mod_message.js');
const sessionModel = require('../models/session');

exports.newThread = (req, res) => {
    sessionModel.getUser(req.sessionID)
        .then(([data, metadata]) => {
            if (data.length > 0) {
                res.render('thread', { receiver_id: req.params.receiver_id });
            }
            else {
                res.redirect('/login');
            }
        });
}

exports.createThread = (req, res) => {
    sessionModel.getUser(req.sessionID)
        .then(([data, metadata]) => {
            if (data.length > 0) {
                const self_id = 1;
                let data = {
                    subject: req.body.subject,
                    message: req.body.message,
                    receiver_id: req.params.receiver_id,
                    sender_id: self_id
                }
                msgModel.createMessage(data).then(([data, metadata]) => {
                    res.redirect(301, '/conversation/')
                });
            }
            else {
                res.redirect('/login');
            }
        });
}