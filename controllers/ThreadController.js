const msgModel = require('../models/mod_message.js');

exports.newThread = (req, res) => {
    res.render('thread', {receiver_id: req.params.receiver_id})
}

exports.createThread = (req, res) => {
    const self_id = 1;
    let data = {
        subject: req.body.subject,
        message: req.body.message,
        receiver_id: req.params.receiver_id,
        sender_id: self_id
    }
    msgModel.createMessage(data).then(([data,metadata]) => {
        res.redirect(301, '/conversation/')
    })
}